//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let expect = chai.expect;
let should = chai.should();

let app = require('../server');
let hash = require('./hash');

describe('GET /api/people', function() {   
    it('Should return a list of members with valid nonce', function(done) {
        chai.request(app)
        .get('/api/people')
        .end(function(err, res) {
            should.not.exist(err);           
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.body.should.be.a('array');
            
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('url');
            res.body[0].should.have.property('nonce');

            // verify the chain of all members
            hash.verifyHash(res.body).should.be.true;
            
            done();
        });
    });
});
 
