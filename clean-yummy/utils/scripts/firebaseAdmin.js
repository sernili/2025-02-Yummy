import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  console.error(
    `Error: The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. - ${process.env}`,
  );
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountKey);
} catch (error) {
  console.error(
    "Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:" + process.env.title,
    error,
  );
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db };
