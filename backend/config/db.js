const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("\n❌ MongoDB Connection Failed!");
    console.error("──────────────────────────────────────────────────");
    if (error.message?.includes("SSL") || error.message?.includes("tls")) {
      console.error("🔒 SSL/TLS Error — Fix these in MongoDB Atlas:");
      console.error("   1. Go to https://cloud.mongodb.com");
      console.error("   2. Open your cluster → Network Access");
      console.error("   3. Add IP: 0.0.0.0/0  (Allow from Anywhere)");
      console.error("   4. Also check: Database Access → ensure user exists");
    } else if (error.message?.includes("ECONNREFUSED")) {
      console.error("🌐 Connection Refused — Server not reachable");
    } else {
      console.error("Error:", error.message);
    }
    console.error("──────────────────────────────────────────────────\n");
    throw error; // Re-throw so server.js can handle gracefully
  }
};

module.exports = connectDB;