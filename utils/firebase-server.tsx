import { initializeApp, cert } from "firebase-admin/app";
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

const adminApp = initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore(adminApp);
