const http = require('http');
const app = require('./app');
const { logger } = require('./config/logger');
const { createLogsDirs } = require('./utils/createLogsDirs');
const { connectDatabase } = require('./models');

const server = http.createServer(app);

const startServer = async () => {
  try {
    createLogsDirs();
    await connectDatabase();

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`\nSwagger: ${process.env.BASE_URL_SERVER}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server', { message: error.message });
    process.exit(1);
  }
};

startServer();
