const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const log = require('./util/logger');
const db = require('./util/db');
const patientRoutes = require('./routes/patients');
const nutritionistRoutes = require('./routes/nutritionists');
const appointmentRoutes = require('./routes/appointments');
const treatmentRoutes = require('./routes/treatments');

require('dotenv').config();

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// routes
app.use(patientRoutes);
app.use(nutritionistRoutes);
app.use(appointmentRoutes);
app.use(treatmentRoutes);

// sync database and start server
db.sync()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            log.info(`Servidor rodando na porta ${port}`);
        });
    })
    .catch(err => {
        log.error('Erro ao sincronizar o banco de dados:', err);
    });
