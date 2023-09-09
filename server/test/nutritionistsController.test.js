const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');

chai.use(chaiHttp);

describe('Nutritionists Controller', () => {
    let nutritionistId;

    //create test cases
    it('should return an error when creating a new nutritionist with empty data', (done) => {
        chai
            .request(request)
            .post('/nutritionists')
            .send({
                crnSigla: '',
                crnNumero: '',
                nomeCompleto: '',
                telefone: '',
                email: '',
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Erro ao criar nutricionista.');
                done();
            });
    });

    it('should create a new nutritionist', (done) => {
        chai
            .request(request)
            .post('/nutritionists')
            .send({
                crnSigla: 'ABC',
                crnNumero: '12345',
                nomeCompleto: 'Nutricionista Teste',
                telefone: '1234567890',
                email: 'nutricionista@teste.com',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nutricionista criado com sucesso.');
                res.body.should.have.property('nutritionist');
                res.body.nutritionist.should.be.a('object');
                nutritionistId = res.body.nutritionist.idNutricionista;
                done();
            });
    });

    //read test cases
    it('should not get a nutritionist with an invalid ID', (done) => {
        const invalidId = '';
        chai
            .request(request)
            .get(`/nutritionists/${invalidId}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nutricionista não encontrado.');
                done();
            });
    });

    it('should get a nutritionist by ID', (done) => {
        chai
            .request(request)
            .get(`/nutritionists/${nutritionistId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('nutritionist');
                res.body.nutritionist.should.be.a('object');
                done();
            });
    });

    //update test cases
    it('should not update a nutritionist with an invalid ID', (done) => {
        chai
            .request(request)
            .put(`/nutritionists/${nutritionistId}`)
            .send({
                crnSigla: 'XYZ',
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nutricionista não encontrado.');
                done();
            });
    });

    it('should update a nutritionist by ID', (done) => {
        chai
            .request(request)
            .put(`/nutritionists/${nutritionistId}`)
            .send({
                crnSigla: 'XYZ',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nutricionista atualizado com sucesso.');
                res.body.should.have.property('nutritionist');
                res.body.nutritionist.should.be.a('object');
                done();
            });
    });

    // Delete Test Cases
    it('should not delete a nutritionist with an invalid ID', (done) => {
        const invalidId = '';
        chai
            .request(request)
            .delete(`/nutritionists/${invalidId}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nutricionista não encontrado.');
                done();
            });
    });

    it('should delete a nutritionist by ID', (done) => {
        chai
            .request(request)
            .delete(`/nutritionists/${nutritionistId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nutricionista removido com sucesso.');
                done();
            });
        });
        
    });