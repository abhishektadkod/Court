var express = require('express');
var router = express.Router();


// Require our controllers.
var client_controller = require('../controllers/clientController'); 



/// All ROUTES ///

// GET all clients.
router.get('/', client_controller.client_list);  

// GET request for logged in information
router.get('/logged/:id', client_controller.client_logged);  

// GET request for logout
router.get('/logout/:id', client_controller.client_logout);  

// POST to add client
router.post('/add', client_controller.client_register);  

// POST to add client
router.post('/login', client_controller.client_login);  

//POST to add a case
router.post('/case', client_controller.add_case);

//POST to add a case
router.get('/case/:id', client_controller.get_case);

//GET selected clients
router.get('/select/:id', client_controller.get_selected_clients);

//POST to add a lawyer to a case
router.post('/advocate', client_controller.add_lawyer);

module.exports = router;
