var express = require('express');
var router = express.Router();
var nano = require('nano')('http://localhost:5984');
var tallerapp = nano.db.use('taller-app');

router.get('/', function(req, res, next) {
  tallerapp.list({ include_docs: true },function(err, body) {
    if (!err) {
      res.send(body.rows);
    }
    if (err) {
      console.log("erro: ", err);
    }
  })

});

router.get('/:name', function(req, res, next) {
  tallerapp.get(req.params.name, {  }, function(err, body) {
    if (!err) {
      res.send(body);
    } else {
      console.log("erro: ", err);
    }
  });
});

router.post('/', function(req, res, next) {
  tallerapp.insert(req.body, null, function(error, body) {
    if (!error) {
      tallerapp.get(body.id, { revs_info: true }, function(err, body) {
        if (!err) {
          res.send(body);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(error);
    }
  });
});

router.put('/', function(req, res, next) {
  tallerapp.insert(req.body, null, function(error, body) {
    if (!error) {
      tallerapp.get(body.id, { revs_info: true }, function(err, body) {
        if (!err) {
          res.send(body);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(error);
    }
  });
});

module.exports = router;
