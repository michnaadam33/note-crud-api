'use strict';

var should = require('should'); 
var request = require('supertest');  
var config    = require(__dirname + '/../config/configServer.json');


describe('Routing', function() {
  var url = 'http://localhost:' + config.port;
  before(function(done) {						
    done();
  });
  describe('Account', function() {
    it('should return pong true', function(done) {
    request(url)
  	.get('/v1/ping')
  	.send()
    .expect('Content-Type', /json/)
    .expect(200)
  	.end(function(err,res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property('pong');
        res.body.pong.should.be.true();
        done();
      });
    });

    it('should return jsonp', function(done) {
    request(url)
    .get('/v1/ping?format=jsonp&callback=cb')
    .send()
    .expect('Content-Type', /text\/javascript/)
    .expect(200)
    .end(function(err,res) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should return not valid title error', function(done) {
    var body = {
      message: 'test',
    };
    request(url)
    .post('/v1/notes')
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err,res) {
        if (err) {
          throw err;
        }
        res.body.errors[0].message.should.equal('title cannot be null')

        done();
      });
    });

    it('should return all notes', function(done) {
    request(url)
    .get('/v1/notes')
    .send()
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err,res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property('count');
        res.body.should.have.property('results');
        done();
      });
    });
  });
});