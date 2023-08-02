const db = require('../config/connection');
const { Quote } = require('../models');
const quoteSeeds = require('./quoteSeeds.json');


const seedQuotes = async () => {
  try {
    await db.once('open', async () => {
    
      await Quote.deleteMany({});

      await Quote.insertMany(quoteSeeds);

      console.log('Quotes have been successfully seeded.');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error seeding quotes:', err);
    process.exit(1);
  }
};

seedQuotes();
