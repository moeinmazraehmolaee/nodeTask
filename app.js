const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./router');
const setupSwagger = require('./config/swagger.config');
const { logger, setupConsoleLogging } = require('./config/logger');
const dotenv = require("dotenv");

dotenv.config();

setupConsoleLogging();

const app = express();

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

// routes
app.use('/api', routes);
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Chitra API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});
setupSwagger(app);

app.get('/', (req, res) => {
  res.json({
    message: 'node task API Server',
    version: '1.0.0',
    status: 'Running',
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;
