const express = require('express')
const router = express.Router();

const database = require('./config');

// localhost:3001/firebase/save 호출
router.get('/save', function(req, res){
    database.ref('customer').set({name : "test_customer"}, function(error) {
        if(error)
            console.error(error)
        else
            console.log("success save !!");
    });
    return res.json({firebase : true});
});

module.exports = router;