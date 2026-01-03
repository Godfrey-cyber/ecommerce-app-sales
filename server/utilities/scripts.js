// scripts/dropOldUsernameIndex.js
import mongoose from 'mongoose';

async function dropIndex() {
  try {
  	const MONGO_URL = process.env.MONGO_URL
    await mongoose.connect("mongodb+srv://wave-ecommerce:com-shop-0860@cluster0.vqtnd.mongodb.net/commerce-sale?retryWrites=true&w=majority"); // replace with your Mongo URI
    const db = mongoose.connection.db;

    const indexes = await db.collection('users').indexes();
    console.log('Existing indexes:', indexes);

    if (indexes.some(idx => idx.name === 'username_1')) {
      await db.collection('users').dropIndex('username_1');
      console.log('Dropped username_1 index successfully');
    } else {
      console.log('No username_1 index found');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

dropIndex();


// Dropped username_1 index