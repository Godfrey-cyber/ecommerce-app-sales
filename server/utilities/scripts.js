// scripts/dropOldUsernameIndex.js
import mongoose from 'mongoose';

async function dropIndex() {
  try {
    if (!process.env.MONGO_URL) {
      console.log("env: ", process.env.MONGO_URL)
      throw new Error('MONGO_URL is not defined');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL)
      console.log('MongoDb connected successfully')
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL); // replace with your Mongo URI
    }
    const db = mongoose.connection.db;

    const indexes = await db.collection('products').indexes();
    console.log('Existing indexes:', indexes);

    if (indexes.some(idx => idx.name === 'name_1')) {
      await db.collection('products').dropIndex('name_1');
      console.log('Dropped name_1 index successfully');
    } else {
      console.log('No name_1 index found');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

dropIndex();

// Dropped username_1 index  run node utilities/scripts.js