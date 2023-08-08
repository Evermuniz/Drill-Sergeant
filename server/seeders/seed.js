const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json'); 

const seedUsers = async () => {
  try {
    await db.once('open', async () => {
    
      await User.deleteMany({});

      await User.insertMany(userSeeds);

      console.log('Users have been successfully seeded.');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error seeding users:', err);
    process.exit(1);
  }
};

seedUsers();
