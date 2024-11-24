

const MONGODB_URI = process.env.MONGODB_URI;
// console.log(MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }



async function connectDB() {
  const mongoose = require('mongoose');

mongoose.connect(`${MONGODB_URI}`, {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error', err));
}

export default connectDB;