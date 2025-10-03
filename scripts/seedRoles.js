const mongoose = require('mongoose');
const Role = require("../models/Role.model")
const Permission  = require("../models/Permission.model");
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const permissions = await Permission.find({}).lean();
  if (permissions.length === 0) {
    console.log('No permissions found. Run seedPermissions.js first!');
    await mongoose.disconnect();
    return;
  }

  const permMap = {};
  permissions.forEach(p => {
    permMap[`${p.module}_${p.action}`] = p._id;
  });

const rolesData = [
    {
      name: 'Super Admin',
      description: 'Super admin role with full access to all sections',
      permissions: [
        permMap['Account_Create'], permMap['Account_Edit'], permMap['Account_View'], permMap['Account_Assign'],
        permMap['Product_Create'], permMap['Product_Edit'], permMap['Product_View'],
        permMap['Role_Create'], permMap['Role_Edit'], permMap['Role_View']
      ].filter(Boolean)  
    },
    {
      name: 'Editor',
      description: 'Editor role with edit and view access',
      permissions: [
        permMap['Account_Edit'], permMap['Account_View'], permMap['Account_Assign'],
        permMap['Product_Edit'], permMap['Product_View'],
        permMap['Role_Edit'], permMap['Role_View']
      ].filter(Boolean)
    },
    {
      name: 'Viewer',
      description: 'Viewer role with view-only access',
      permissions: [
        permMap['Account_View'],
        permMap['Product_View'],
        permMap['Role_View']
      ].filter(Boolean)
    }
  ];

  const existingRoles = await Role.find({}, { name: 1 });
  const existingNames = existingRoles.map(r => r.name);

  const newRoles = rolesData.filter(r => !existingNames.includes(r.name));

  if (newRoles.length === 0) {
    console.log('All roles already exist, skipping.');
  } else {
    const createdRoles = await Role.insertMany(newRoles);
    console.log(`Created ${createdRoles.length} new roles:`);
    createdRoles.forEach(r => {
      console.log(`- ${r.name}: ${r.description}`);
      console.log(`  Permissions count: ${r.permissions.length}`);
    });
  }

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

module.exports = { seed };