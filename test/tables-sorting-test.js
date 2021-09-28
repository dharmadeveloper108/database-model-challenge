const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Test API endpoints to sort database tables', () => {

    /**
     * Read JSON files from data/ 
     */

    let testDB1 = null;
    let testDB2 = null;

    before(function (done) {

        fs.readFile('./data/database.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log('Error reading file: ', err);
                return;
            }
            testDB1 = JSON.parse(jsonString);
        });

        fs.readFile('./data/database2.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log('Error reading file: ', err);
                return;
            }
            testDB2 = JSON.parse(jsonString);
        });
        done();
    });

    /**
     * Test the GET route 
     */

    describe('GET /sortTablesFromFile', () => {
        it('Should have a status 200', (done) => {

            chai.request(server)
                .get('/sortTablesFromFile')
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })

        it('Should return an array', (done) => {

            chai.request(server)
                .get('/sortTablesFromFile')
                .end((err, response) => {
                    response.body.should.be.a('array');
                    done();
                })
        })

        it('Should return sorted table names', (done) => {

            chai.request(server)
                .get('/sortTablesFromFile')
                .end((err, response) => {
                    response.body.should.include(testDB1[0].name)
                    console.log(`Sorted tables: ${response.body}`)
                    done();
                })
        })
    })

    /**
     * Test the POST route with empty request body
     */

    describe('POST /sortTables: Empty request body', () => {
        it('Should return error', (done) => {
            chai.request(server)
                .post('/sortTables')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.eql({});
                    response.text.should.be.eq('Error: empty database model.');
                    done();
                })
        })
    })

    /**
     * Test the POST route with local json files as request body
     */

    describe('POST /sortTables with database.json as body', () => {
        it('Should have a status 200', (done) => {

            chai.request(server)
                .post('/sortTables')
                .send(testDB1)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })

        it('Should return an array', (done) => {

            chai.request(server)
                .post('/sortTables')
                .send(testDB1)
                .end((err, response) => {
                    response.body.should.be.a('array');
                    done();
                })
        })

        it('Should return sorted table names', (done) => {

            chai.request(server)
                .post('/sortTables')
                .send(testDB1)
                .end((err, response) => {
                    response.body.should.include(testDB1[0].name)
                    console.log(`Sorted tables: ${response.body}`)
                    done();
                })
        })
    })

    describe('POST /sortTables with database2.json as body', () => {
        it('Should have a status 200', (done) => {

            chai.request(server)
                .post('/sortTables')
                .send(testDB2)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })

        it('Should return an array', (done) => {

            chai.request(server)
                .post('/sortTables')
                .send(testDB2)
                .end((err, response) => {
                    response.body.should.be.a('array');
                    done();
                })
        })

        it('Should return sorted table names', (done) => {

            chai.request(server)
                .post('/sortTables')
                .send(testDB2)
                .end((err, response) => {
                    response.body.should.include(testDB2[0].name)
                    console.log(`Sorted tables: ${response.body}`)
                    done();
                })
        })
    })
});