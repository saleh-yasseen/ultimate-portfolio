import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;

if (!uri) {
  throw new Error("DATABASE_URL is not set in the environment.");
}

// In Next.js app router we keep the client cached across hot reloads in development
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalForMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalForMongo._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = globalForMongo._mongoClientPromise;

export async function getResumeData() {
  const client = await clientPromise;

  // Extract DB name from the connection string path (e.g. /resume → "resume")
  // Falls back to "resume" if no path is specified
  const dbName = new URL(uri).pathname.replace(/^\//, "") || "resume";
  const db = client.db(dbName);
  const collection = db.collection("data");

  const docs = await collection.findOne({});
  return docs;
}

export { clientPromise };
