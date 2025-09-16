import { admin, db } from "./firebaseAdmin.js";
import { getCliArgumentValue } from "./utils.js";

const collectionName = getCliArgumentValue("target");

async function deleteDuplicateDocuments() {
  try {
    const snapshot = await db.collection(collectionName).get();
    const documentsToDelete = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      documentsToDelete.push(doc.ref);
    });

    if (documentsToDelete.length > 0) {
      console.log(`Found ${documentsToDelete.length} documents. Deleting...`);
      // Use Promise.all to perform deletions concurrently for better efficiency
      await Promise.all(documentsToDelete.map((docRef) => docRef.delete()));
      console.log("All documents deleted successfully!");
    } else {
      console.log("No documents found.");
    }
  } catch (error) {
    console.error("Error deleting documents:", error);
  } finally {
    admin.app().delete();
  }
}

deleteDuplicateDocuments();
