const express = require('express')
const router = express.Router();

    router.get('/', function(req, res, next){

    if(req.user){
        return res.status(200).json({
                              msg: "This is dashboard route.",
                                id: req.user._id,
                                auth: req.isAuthenticated(),
                                session_id: req.session.id
                              })
        } 
        else
         {
        return  res.send({msg:"Dashboard cannot be displayed"})
         }

})

module.exports = router;