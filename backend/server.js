require('colors');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');

// Load environment variables
dotenv.config({ path: './.env' });

// Initialize Express
const app = express();

// ========================
// 🛜 Middlewares
// ========================
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// ========================
// 🗃️ Database Connection
// ========================
connectDB(); // Handles its own pretty logging

// ========================
// 🚦 Routes
// ========================
app.use('/api/v1/auth/admin', require('./routes/admin.routes'));


// ========================
// ✅ Health Check
// ========================
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: '✅ Operational',
    service: 'Spiritual Gurus API',
    timestamp: new Date().toISOString()
  });
});


// ========================
// 🚀 Server Initialization
// ========================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n' + '━'.repeat(40).blue);
  console.log('🌿 Spiritual Gurus Admin System'.green.bold);
  console.log('━'.repeat(40).blue);
  
  console.log(`\n🟢 Server Status: `.green + `Operational`.white.bold);
  console.log(`🔌 Environment: `.cyan + `${process.env.NODE_ENV || 'development'}`.white);
  console.log(`🌐 Base URL: `.cyan + `http://localhost:${PORT}/api/v1`.white);
  console.log(`📅 Started: `.cyan + `${new Date().toLocaleTimeString()}`.white);
  console.log('\n' + '━'.repeat(40).blue);
});

// ========================
// 🚨 Error Handling
// ========================
process.on('unhandledRejection', (err) => {
  console.log('\n' + '❌ Unhandled Rejection'.red.bold);
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.log('\n' + '⚠️ Uncaught Exception'.yellow.bold);
  console.log(`Error: ${err.message}`.yellow);
  server.close(() => process.exit(1));
});