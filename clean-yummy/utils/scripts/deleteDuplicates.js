import { admin, db } from "./firebaseAdmin.js";

// Adjust collection name as needed
const collectionName = "recipes";

async function deleteDuplicateDocuments() {
  try {
    const snapshot = await db.collection(collectionName).get();
    const titleMap = new Map();

    const documentsToDelete = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const title = data.title;

      if (titleMap.has(title)) {
        documentsToDelete.push(doc.ref);
      } else {
        titleMap.set(title, doc.id);
      }
    });

    if (documentsToDelete.length > 0) {
      console.log(
        `Found ${documentsToDelete.length} duplicate documents. Deleting...`,
      );
      // Use Promise.all to perform deletions concurrently for better efficiency
      await Promise.all(documentsToDelete.map((docRef) => docRef.delete()));
      console.log("Duplicate documents deleted successfully!");
    } else {
      console.log("No duplicate documents found.");
    }
  } catch (error) {
    console.error("Error deleting duplicate documents:", error);
  } finally {
    // It's good practice to close the Firebase Admin SDK when done
    admin.app().delete();
  }
}

deleteDuplicateDocuments();
