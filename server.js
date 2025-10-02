const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const routes = require('./router');
const setupSwagger = require('./config/swagger.config');
require('dotenv').config();

const { logger, setupConsoleLogging } = require('./config/logger');
const { createLogsDirs } = require('./utils/createLogsDirs');
const { connectDatabase } = require('./models');


setupConsoleLogging();

const app = express();
const server = http.createServer(app);

const allowedOrigins = ['http://localhost:3000','http://localhost:5000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);

app.use('/api', routes);

app.get('/health', (req, res) => {
  const response = {
    status: 'OK',
    message: 'Chitra API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };
  logger.info('Health check requested', { ip: req.ip, userAgent: req.get('User-Agent') });
  res.json(response);
});

// Swagger Docs
setupSwagger(app);

app.get('/', (req, res) => {
  const response = {
    message: 'node task API Server',
    version: '1.0.0',
    status: 'Running',
  };
  logger.info('Root endpoint accessed', { ip: req.ip, userAgent: req.get('User-Agent') });
  res.json(response);
});

app.use('/{*any}', (req, res) => {
  logger.warn('404 Route not found', { path: req.originalUrl, ip: req.ip });
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  logger.error('Server Error', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    ip: req.ip,
  });

  let status = err.status || 500;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation error';
  } else if (err.code === 11000) {
    status = 400;
    message = 'Duplicate data exists';
  } else if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});




const startServer = async () => {
  try {
    createLogsDirs();
    logger.info('Logs directories created/initialized');

    await connectDatabase();

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
      logger.info(`API Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server', { message: error.message });
    process.exit(1);
  }
};

startServer();