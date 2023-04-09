const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const session = require('express-session')
const cors = require('cors')
const MongoBDStore = require('connect-mongodb-session')(session)
const passport = require('passport')
require('dotenv').config()
const LocalStrategy = require('passport-local').Strategy
const errorHandler = require('./_helpers/error-handler');
const db = require('./_helpers/db');
//const { check, validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcrypt');
const User = db.User;

// user routes
const homeRoute = require('./routes/user/Home')
const appointmentRoute = require('./routes/appointment/MakeAppointment')
const registerRoute = require('./routes/user/Register')
const loginRoute = require('./routes/user/Login')
const dashBoardRoute = require('./routes/user/DashBoard')
const getAllUsersRoute = require('./routes/user/GetAllUsers')
const logoutRoute = require('./routes/user/Logout')

//comment routes
const addCommentRoute = require('./routes/comment/AddComment')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "https://bossdetail.onrender.com",
  credentials: true
}));

 // connect to session store
const store = new MongoBDStore({
   uri: process.env.MONGODB_KEY,
   collection: 'mySession'
  })

  //catch errors
  store.on('error', function(error){
    console.log(error)
  })

//Middleware
app.use(session({
     // Set the session ID
  genid: (req) => {
    console.log(`Inside the server.js session middleware req.sessionID ${req.sessionID}`);
    console.log(`Inside the server.js session middleware req.session ${JSON.stringify(req.session)}`);
    return uuidv4() //use UUIDs for session IDs
  },
    store: store,
    secret: process.env.SECRET_KEY,
    resave: false ,
    saveUninitialized: false ,
}))

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"

   function authUser(email, password, done) {
    console.log(`email from new strategy ${email}\n`)
    console.log(`password from new strategy ${password}\n`)
    console.log('password from new strategy '+JSON.stringify(password))

        User.findOne({ email: email}, (err, user) => {

       console.log(`user from new strategy ${user}\n`);

      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      console.log(`user from new strategy ${user}\n`)
      // Load hash from your password DB.

  bcrypt.compare(password, user.password, function(err, res) {
    if (err) return done(null, false);
     if (!res) return done(null, false)
    if (res) return done(null, user)
      });
    });
  } 

passport.use(new LocalStrategy({usernameField: 'email'}, authUser));

passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
         console.log(`user from inside deserialize ${JSON.stringify(user)}`);
         done(err, user)
       });
     });

//Middleware to see how the params are populated by Passport
let count = 1

printData = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.email -------> ${req.body.email}`) 
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

app.use('/', homeRoute)
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/dashboard', dashBoardRoute)
app.use('/users', getAllUsersRoute)
app.use('/logout', logoutRoute)
app.use('/comment', addCommentRoute)
app.use('/appointment', appointmentRoute)

app.use(printData) //user printData function as middleware to print populated variables
app.use(errorHandler)

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); 