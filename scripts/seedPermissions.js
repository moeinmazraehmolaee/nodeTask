const mongoose = require("mongoose");
const Permission  = require("../models/Permission.model");
require("dotenv").config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const samplePermissions = [
    { module: "Account", action: "Create" },
    { module: "Account", action: "Edit" },
    { module: "Account", action: "View" },
    { module: "Account", action: "Assign" },
    { module: "Product", action: "Create" },
    { module: "Product", action: "Edit" },
    { module: "Product", action: "View" },
    { module: "Role", action: "Create" },
    { module: "Role", action: "Edit" },
    { module: "Role", action: "View" },
  ];

  const existingPermissions = await Permission.find(
    {},
    { module: 1, action: 1 }
  );
  const existingKeys = existingPermissions.map(
    (p) => `${p.module}_${p.action}`
  );

  const newPermissions = samplePermissions.filter(
    (p) => !existingKeys.includes(`${p.module}_${p.action}`)
  );

  if (newPermissions.length === 0) {
    console.log("All permissions already exist, skipping.");
  } else {
    const created = await Permission.insertMany(newPermissions);
    console.log(`Created ${created.length} new permissions:`);
    created.forEach((p) => console.log(`- ${p.module} ${p.action}`));
  }

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});


module.exports = { seed };