const express = require('express');;
const router = express.Router();

router.post('/signup' , (req, res)=>{
    console.log(req.body);
    res.status(200).json({
        message: 'User created successfully'
    })
});
module.exports = router;