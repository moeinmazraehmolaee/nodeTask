const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    enum: ['Account', 'Product', 'Role']  
  },
  action: {
    type: String,
    required: true,
    enum: ['Create', 'Edit', 'View', 'Assign'] 
  }
}, {
  timestamps: true
});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;