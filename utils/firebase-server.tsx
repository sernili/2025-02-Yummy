import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";

const serviceAccountKeyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKeyString) {
  console.error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found!");
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found!",
  );
}

let serviceAccount;
try {
  console.log("SERVICE ACCOUNT: ", serviceAccountKeyString);
  serviceAccount = JSON.parse(serviceAccountKeyString);
} catch (error) {
  console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:", serviceAccount);
  throw new Error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY");
}

let adminApp;
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount),
  });
  console.log("Firebase Admin SDK initialized");
} else {
  adminApp = getApps()[0];
  console.log("Firebase Admin SDK already initialized");
}

export const db = getFirestore(adminApp);
