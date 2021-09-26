const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('GET request to sort database tables', () => {

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
     * Test the GET route with empty request body
     */

    describe('Empty request body', () => {
        it('Should return error', (done) => {
            chai.request(server)
                .get('/api/sortTables')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.eql({});
                    response.text.should.be.eq('Error: empty database model.');
                    done();
                })
        })
    })

    /**
     * Test the GET route with local json files as request body
     */

    describe('Database model from database.json', () => {
        it('Should return array of sorted table names', (done) => {

            chai.request(server)
                .get('/api/sortTables')
                .send(testDB1)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.should.include(testDB1[0].name)
                    console.log(`Sorted tables: ${response.body}`)
                    done();
                })
        })
    })

    describe('Database model from database2.json', () => {
        it('Should return array of sorted table names', (done) => {

            chai.request(server)
                .get('/api/sortTables')
                .send(testDB2)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.should.include(testDB2[0].name)
                    console.log(`Sorted tables: ${response.body}`)
                    done();
                })
        })
    })
});