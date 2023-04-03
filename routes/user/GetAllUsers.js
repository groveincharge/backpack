const express = require('express')
const router = express.Router()
const db = require('./../../_helpers/db');
const User = db.User

router.get('/', function(req, res, next){

    User.find()
    .then(result => {
                console.log(result);
               res.status(200).json({
                 session_id: req.session.id,
                 message: 'user List.',
                  count: result.length,
                  users: result.map(doc => {
                            return{
                                firstName: doc.firstName,
                                lastName: doc.lastName,
                                email: doc.email,
                                 _id: doc._id,
                                 request: {
                                    type: 'GET',
                                    url: 'http://localhost:3001/register  ' + doc._id
                                          }
                                      }
                                    })
                               })
             })
             .catch(err => {
                        res.status(500).json({
                                         message: 'List failed to load.',
                                           error: err
                                            })
                       })

  })

module.exports = router;