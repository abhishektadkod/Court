var express = require('express');
var router = express.Router();
let Lawyer = require('../models/lawyer.model');


// GET lawyer listing.
router.get('/', function(req, res, next) {
    Lawyer.find(function(err, response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response);
        }
    });
});


// GET lawyer listing based on type
router.get('/type/:id', function(req, res, next) {
 
  Lawyer.find({type:req.params.id},function(err, response) {
      if (err) {
          console.log(err);
      } else {
          res.json(response);
      }
  });
});

//Add new lawyer in Court database
router.post('/', function(req, res) {
	console.log(req.method,req.url);
    let client = new Lawyer(req.body);

        client.logged=1;
		client.save()
        .then(resp=> {
            user=client._id;
            res.status(200).json(resp);
            console.log(resp);
        })
        .catch(err => {
            res.status(400).send('adding new client failed');
        });
});

module.exports = router;
