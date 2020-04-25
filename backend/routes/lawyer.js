var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
 
// Require our controllers.
var lawyer_controller = require('../controllers/lawyerController');
 
 
 
/// All ROUTES ///
 
// GET all lawyers.
router.get('/', lawyer_controller.lawyer_list); 

// GET lawyer listing based on type
router.get('/type/:id',lawyer_controller.lawyer_type);
 
// GET request for logged in information
router.get('/logged/:id', lawyer_controller.lawyer_logged); 
 
// GET request for logout
router.get('/logout/:id', lawyer_controller.lawyer_logout); 

// GET lawyer listing
router.get("/select/:id",lawyer_controller.lawyer_case_list );

 //Post to add new lawyer in Court database
router.post('/', lawyer_controller.lawyer_add);

// POST to check lawyer
router.post('/login', lawyer_controller.lawyer_login); 
 
//POST to select a client case and update
router.post('/select/:id', lawyer_controller.lawyer_case_select);

//PUT to generate OTP
router.put('/login',lawyer_controller.opt_validation);
 









module.exports = router;