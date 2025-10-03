const mongoose = require('mongoose');
const User = require("../models/User.model")
const Role = require("../models/Role.model")
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const roles = await Role.find({}).lean();
  if (roles.length === 0) {
    console.log('No roles found. Run seedRoles.js first!');
    await mongoose.disconnect();
    return;
  }

  const roleMap = {};
  roles.forEach(r => {
    roleMap[r.name] = r._id;
  });

  const users = [
    { 
      username: 'moein', 
      name: 'mazrehmolaee', 
      phone: '09120000001', 
      password: 'pass1234', 
      is_super_admin: true,
      role: roleMap['Super Admin']  
    },
    { 
      username: 'sara', 
      name: 'sara ghorbany', 
      phone: '09120000002', 
      password: 'password', 
      is_super_admin: false,
      role: roleMap['Editor'] 
    },
    { 
      username: 'hossein', 
      name: 'hossein mohammady', 
      phone: '09120000003', 
      password: '12345678', 
      is_super_admin: false,
      role: roleMap['Viewer']  
    },
  ];

  for (const u of users) {
    const exists = await User.findOne({ $or: [{ username: u.username }, { phone: u.phone }] });
    if (exists) {
      console.log(`User ${u.username} already exists, skipping.`);
      continue;
    }
    const user = new User(u);
    await user.save();
    console.log('Created user:', user.username, 'id:', user.id, 'role:', user.role);
  }

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

module.exports = { seed };