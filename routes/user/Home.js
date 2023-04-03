const express = require('express')
const router = express.Router();

router.get('/', function(req, res, next){
if(req.user){
    console.log('home route -->')
    console.log('req.session.id ' +JSON.stringify(req.session.id))
    console.log('req.user ' +JSON.stringify(req.user))
    console.log('req.isAuthenticated '+JSON.stringify(req.isAuthenticated()))

    return  res.send(req.user)
               } 
             else
              {
             return res.send("User not logged in")
              }
     })
   
     module.exports = router;