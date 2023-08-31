const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const transportsList = [
  new transports.Console(),  // saída para o console
  new DailyRotateFile({
    filename: 'logs/%DATE%-%HH%-%mm%.log',
    datePattern: 'YYYY-MM-DD',  // padrão da data nos nomes dos arquivos
    zippedArchive: true,  // arquivos antigos(+20 dias) serão compactados
    maxSize: '20m',  
    maxFiles: '20d'  // manter no máximo 20 dias de arquivos de log
  })
];

const logger = createLogger({
  level: 'info', //apenas logs dos níveis info e acima são registrados
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: transportsList
});

module.exports = logger;
