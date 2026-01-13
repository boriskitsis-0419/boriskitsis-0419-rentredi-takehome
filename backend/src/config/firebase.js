const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.FIREBASE_DATABASE_URL) {
  throw new Error("Missing FIREBASE_DATABASE_URL in env");
}

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.database();
const usersRef = db.ref("users");

module.exports = {
  db,
  usersRef,
  admin,
};

