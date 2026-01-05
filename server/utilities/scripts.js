// scripts/dropOldUsernameIndex.js
import mongoose from 'mongoose';

async function dropIndex() {
  try {
    await mongoose.connect("mongodb+srv://wave-ecommerce:com-shop-0860@cluster0.vqtnd.mongodb.net/commerce-sale?retryWrites=true&w=majority"); // replace with your Mongo URI
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