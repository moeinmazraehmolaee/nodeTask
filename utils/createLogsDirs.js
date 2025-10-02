const fs = require('fs');
const path = require('path');

const createLogsDirs = () => {
  const logsDir = path.join(__dirname, '../logs');
  const infoLogDir = path.join(logsDir, 'infoLog');
  const errorLogDir = path.join(logsDir, 'errorLog');

  const dirs = [logsDir, infoLogDir, errorLogDir];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  });
};

module.exports = { createLogsDirs };