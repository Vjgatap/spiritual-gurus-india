const mongoose = require('mongoose');
require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Custom clean connection message
    console.log(`\n📊 ` + `MongoDB Connected`.green.bold + ` to ` + `Cloud Database`.cyan);
    console.log(`   └─ Secure connection established\n`.gray);
    
    return conn;
  } catch (error) {
    console.log(`\n❌ ` + `MongoDB Connection Failed:`.red.bold);
    console.log(`   └─ ${error.message}\n`.red);
    process.exit(1);
  }
};

module.exports = connectDB;