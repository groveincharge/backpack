const express = require('express');
const router = express.Router();
const db = require('./../../_helpers/db');
const AppointmentInfo = db.Appointment;

const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {

  console.log(req.body)
    

     const {user, phone, street, city, state, zipcode, appointment} = req.body;

     const myAppointment = new AppointmentInfo({
                                       user_id: user,
                                       phone,
                                       street,
                                       city,
                                       state,
                                       zipcode,
                                       appointment
                                          });

                      myAppointment.save().then(result => {
                      console.log(result);
                      res.status(201).json(result);
                      })
                 .catch(err => {
                   console.log(err);
                   res.status(500).json({ 
                               error: err,
                                msg: "Appointment not saved."
                             })
                         });

  
        }) //end post route


 router.get('/', (req, res, next) => {
    Appointment.find()
        .then(result => {
         console.log(result);
           res.status(200).json({
               message: 'appointment List.',
               count: result.length,
               Appointments: result.map(doc => {
           return{
         firstName: doc.firstName,
           lastName: doc.lastName,
             email: doc.email,
               _id: doc._id,
                  request: {
                      type: 'GET',
                      url: 'https://bossdetail-api.onrender.com/makeAppointment/' + doc._id
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
});


   module.exports = router;