const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');

chai.use(chaiHttp);

describe('Appointments Controller', () => {
    let appointmentId;

    //create test cases    
    it('should return an error when creating a new appointment with empty data', (done) => {
        chai
            .request(request)
            .post('/appointments')
            .send({
                data: '2023-09-01',
                hora: '10:00:00',
                peso: '',
                diagnosticoNutri: '',
                inapetencia: '',
                riscoNutricional: 'Não',
                statusTno: 'Não',
                planoTerapeutico: 'Dieta equilibrada',
                tratamento: 'Acompanhamento nutricional',
            })
            .end((err, res) => {
                res.should.have.status(500); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Erro ao criar consulta.');
                done();
            });
    });

    it('should create a new appointment', (done) => {
        chai
            .request(request)
            .post('/appointments')
            .send({
                data: '2023-09-01',
                hora: '10:00:00',
                peso: 70.5,
                diagnosticoNutri: 'Sobrepeso',
                inapetencia: 'Não',
                riscoNutricional: 'Não',
                statusTno: 'Não',
                planoTerapeutico: 'Dieta equilibrada',
                tratamento: 'Acompanhamento nutricional',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Consulta criada com sucesso.');
                res.body.should.have.property('appointment');
                res.body.appointment.should.be.a('object');
                appointmentId = res.body.appointment.idConsulta;
                done();
            });
    });
    
    //read test cases
    it('should return an error when getting an appointment by an invalid ID', (done) => {
        const invalidId = ''; 
        chai
            .request(request)
            .get(`/appointments/${invalidId}`)
            .end((err, res) => {
                res.should.have.status(404); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Consulta não encontrada.');
                done();
            });
    });

    it('should get an appointment by ID', (done) => {
        chai
            .request(request)
            .get(`/appointments/${appointmentId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('appointment');
                res.body.appointment.should.be.a('object');
                done();
            });
    }); 

    //read all test cases
    it('should return an error when getting appointments by an invalid patient ID', (done) => {
        const invalidPatientId = ''; 
        chai
            .request(request)
            .get(`/appointments/${invalidPatientId}`)
            .end((err, res) => {
                res.should.have.status(404); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Nenhuma consulta encontrada para este paciente.');
                done();
            });
    });

    it('should get appointments by patient ID', (done) => {
        chai
            .request(request)
            .get(`/appointments/${appointmentId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('consultas');
                res.body.consultas.should.be.a('array');
                done();
            });
    });    

    //update test cases
    it('should return an error when updating an appointment with invalid data', (done) => {
        chai
            .request(request)
            .put(`/appointments/${appointmentId}`)
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
    
    it('should update an appointment by ID', (done) => {
        chai
            .request(request)
            .put(`/appointments/${appointmentId}`)
            .send({
                data: '2023-09-02',
                hora: '11:00:00',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Consulta atualizada com sucesso.');
                res.body.should.have.property('appointment');
                res.body.appointment.should.be.a('object');
                done();
            });
    });

    //delete test cases
    it('should return an error when deleting an appointment with an invalid ID', (done) => {
        const invalidId = ''; 
        chai
            .request(request)
            .delete(`/appointments/${invalidId}`)
            .end((err, res) => {
                res.should.have.status(404); 
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Consulta não encontrada.');
                done();
            });
    });

    it('should delete an appointment by ID', (done) => {
        chai
            .request(request)
            .delete(`/appointments/${appointmentId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Consulta removida com sucesso.');
                done();
            });
    });    
});
