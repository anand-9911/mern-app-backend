const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Mongodb Connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1); //Exit process with faliure
  }
};

module.exports = connectDB;
