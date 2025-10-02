// scripts/seedUsers.js
const mongoose = require('mongoose');
const { User } = require('../models/user.model');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = [
    { username: 'moein', name: 'mazrehmolaee ', phone: '09120000001', password: 'pass1234', is_super_admin: true },
    { username: 'sara', name: 'sara ghorbany', phone: '09120000002', password: 'password', is_super_admin: false },
    { username: 'hossein', name: 'hossein mohamady', phone: '09120000003', password: '12345678', is_super_admin: false },
  ];

  for (const u of users) {
    const exists = await User.findOne({ $or: [{ username: u.username }, { phone: u.phone }] });
    if (exists) {
      console.log(`User ${u.username} already exists, skipping.`);
      continue;
    }
    const user = new User(u);
    await user.save();
    console.log('Created user:', user.username, 'id:', user.id);
  }

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
