const mongoose = require("mongoose");

const dbCon = async (dbURI) => {
  try {
    // Establish connection to MongoDB
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // Timeout after 30 seconds if no server is found
      connectTimeoutMS: 60000, // Connection timeout
      socketTimeoutMS: 60000,   // Socket timeout
    });

    console.log("🟢 Successfully connected to the database");
  } catch (error) {
    // Log the error message and full error for better debugging
    console.error("🔴 Database connection failed:", error.message);
    console.error("Full error details:", error);
    
    // Optionally, exit the process if database connection fails
    process.exit(1);
  }
};

module.exports = { dbCon };
