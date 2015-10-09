var express = require('express');
var router = express.Router();
var models  = require('../models');


router.route('/ping')
  //Test rest api, return pong
  .get(function(req, res) {
    if(req.query.format == 'jsonp'){
      res.jsonp({"pong": true})
    }else if (req.query.format == 'json' || req.query.format == undefined) {
          res.json({"pong": true});
    }else {
      res.status(400)
      res.json( {
            "code": 400,
            "message": "Unsupported format"
        });
    };

  })

router.route('/notes')
  .get(function(req, res) {
    //return all nodes with count
  	models.Note.findAll({})
    .then(function(notes) {
      var data = {count: notes.length,results: notes}; //Data to return
      if(req.query.format == 'jsonp'){ //Checks if return in JSONP format
        res.jsonp(data)
      }else if (req.query.format == 'json' || req.query.format == undefined) {
        res.json(data);
      }else {
        res.status(400)
        res.json( {
              "code": 400,
              "message": "Unsupported format"
          });
      };
	  });
  })
  .post(function(req, res) {
    //create new note
    models.Note.create(req.body)
    .then(function(note) {
      if(req.query.format == 'jsonp'){ //Checks if return in JSONP format
        res.jsonp(note) //return new note
      }else if (req.query.format == 'json' || req.query.format == undefined) {
        res.json(note); //return new note
      }else {
        res.status(400)
        res.json( {
              "code": 400,
              "message": "Unsupported format"
          });
      };
    })
    .catch(function(error) { //if is not valid 
      res.json({errors: error.errors});
    });
  });

router.route('/notes/:id')
  //Update note
  .put(function(req,res){
    models.Note.find({ where: {id: req.params.id}}).then(function(note) {
      if (note) { // if the record exists in the db
        note.update(req.body)
        .then(function() {
          if(req.query.format == 'jsonp'){ //Checks if return in JSONP format
            res.jsonp(note); //return updated note
          }else if (req.query.format == 'json' || req.query.format == undefined) {
            res.json(note); //return updated note
          }else {
            res.status(400)
            res.json( {
                  "code": 400,
                  "message": "Unsupported format"
              });
          };
        })
        .catch(function(error) {  //if is not valid 
          res.json(error.errors);
        });
      }else {
        res.status(404)
        res.json({"code": 404,"message": "Element does not exist"});
      }
    });
  })
  //give Note
  .get(function(req, res) {
  models.Note.find({ where: {id: req.params.id}}).then(function(note) {
      if (note) { // if the record exists in the db
          if(req.query.format == 'jsonp'){ //Checks if return in JSONP format
            res.jsonp(note) //return Note
          }else if (req.query.format == 'json' || req.query.format == undefined) {
            res.json(note); //return Note
          }else {
            res.status(400)
            res.json( {
                  "code": 400,
                  "message": "Unsupported format"
              });
          };
      }else {
        res.status(404)
        res.json({"code": 404,"message": "Element does not exist"});
      }
    });
})
//Delete note
.delete(function(req, res) {
  models.Note.find({ where: {id: req.params.id}}).then(function(note) {
      if (note) { // if the record exists in the db
        note.destroy()
        .then(function() {
          var data = {"success": true}; //The return information
          if(req.query.format == 'jsonp'){ //Checks if return in JSONP format
            res.jsonp(data)
          }else if (req.query.format == 'json' || req.query.format == undefined) {
            res.json(data);
          }else {
            res.status(400)
            res.json( {
                  "code": 400,
                  "message": "Unsupported format"
              });
          };
        });
      }else {
        res.status(404)
        res.json({"code": 404,"message": "Element does not exist"});
      }
    });
})
;

module.exports = router;