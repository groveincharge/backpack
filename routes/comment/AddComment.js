const express = require('express');
const router = express.Router();
const db = require('./../../_helpers/db');
const mongoose = require('mongoose');
const User = db.User;
const Comment = db.Comment;

 router.post('/', function(req, res, next){

  
    console.log('Inside POST /comments for AddComments callback\n')
    console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
    console.log(`req.session ${JSON.stringify(req.session)}\n`);
    console.log(`req.isAuthenticated from POST /comments for comment route ${JSON.stringify(req.isAuthenticated())}\n`);
   console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
   console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
   console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
   console.log(`req.user from app.post route ${req.user}\n`);
 
   const {email, comment} = req.body;
 
             User.findOne({email})
                               .exec((err, user) => {
                                                   if(err){
                                                return  res.json({error :  err});
                                                      }
                                                    else
                                                  if (!user) return {msg: "You must be a registered to leave comments"}
                                                   else
                                                    {
                            const customerComment = new Comment({
                                           _id: new mongoose.Types.ObjectId(),
                                          user_id: user._id,
                                         comment
                                            });
                        customerComment.save().then(result => {
                        console.log(result);
                        res.status(201).json(result);
                        })
                   .catch(err => {
                     console.log(err);
                     res.status(500).json({ 
                                 error: err,
                                  msg: "user comments not saved."
                               })
                           });
                 };
 
               }); //end User.find

})

module.exports = router;