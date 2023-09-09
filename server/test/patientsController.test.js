const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');

chai.use(chaiHttp);

describe('Patients Controller', () => {
    let patientId;
    
    //create test cases 
    it('should return an error when creating a new patient with empty data', (done) => {
        chai
            .request(request)
            .post('/patients')
            .send({
                nomeCompleto: '',
                dtNascimento: '2000-01-01',
                numeroProntuario: '123456',
                sexo: 'M',
                telefone: '',
                email: 'novo@example.com',
                diagnosticoOnco: 'Câncer de teste',
            })
            .end((err, res) => {
                res.should.have.status(500); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Erro ao criar paciente.');
                done();
            });
    });

    it('should create a new patient', (done) => {
        chai
            .request(request)
            .post('/patients')
            .send({
                nomeCompleto: 'Novo Paciente',
                dtNascimento: '2000-01-01',
                numeroProntuario: '123456',
                sexo: 'M',
                telefone: '1234567890',
                email: 'novo@example.com',
                diagnosticoOnco: 'Câncer de teste',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Paciente criado com sucesso.');
                res.body.should.have.property('patient');
                res.body.patient.should.be.a('object');
                patientId = res.body.patient.idPaciente;
                done();
            });
    });

    //read test cases
    it('should not get a patient with an invalid ID', (done) => {
        const invalidId = '';
        chai
            .request(request)
            .get(`/patients/${invalidId}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Paciente não encontrado.');
                done();
            });
    });

    it('should get a patient by ID', (done) => {
        chai
            .request(request)
            .get(`/patients/${patientId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('patient');
                res.body.patient.should.be.a('object');
                done();
            });
    });

    //read all test cases
    it('should not get patients by an invalid nutritionist ID', (done) => {
        const invalidNutritionistId = '';
        chai
            .request(request)
            .get(`/patients/${invalidNutritionistId}`)
            .end((err, res) => {
                res.should.have.status(404); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nenhum paciente encontrado para este nutricionista.');
                done();
            });
    });

    it('should get patients by nutritionist ID', (done) => {
        chai
            .request(request)
            .get(`/patients/${nutritionistId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('patients');
                res.body.patients.should.be.a('array');
                done();
            });
    });

    //update test cases
    it('should not update a patient with an invalid ID', (done) => {
        chai
            .request(request)
            .put('/patients/invalid_id')
            .send({
                data: '09-02-2023', //formato errado
            })
            .end((err, res) => {
                res.should.have.status(500); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Erro ao atualizar consulta.');
                done();
            });
    });

    it('should update a patient by ID', (done) => {
        chai
            .request(request)
            .put(`/patients/${patientId}`)
            .send({
                nomeCompleto: 'Paciente Atualizado',
                dtNascimento: '1995-01-01',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Paciente atualizado com sucesso.');
                res.body.should.have.property('patient');
                res.body.patient.should.be.a('object');
                done();
            });
    });

    //delete test cases
    it('should not delete a patient with an invalid ID', (done) => {
        const invalidId = '';
        chai
            .request(request)
            .delete(`/patients/${invalidId}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Paciente não encontrado.');
                done();
            });
    });

    it('should delete a patient by ID', (done) => {
        chai
            .request(request)
            .delete(`/patients/${patientId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Paciente removido com sucesso.');
                done();
            });
    });
    
});
