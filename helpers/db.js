import { MongoClient } from 'mongodb';

const MONGODB_URL = 'YOUR_MONGO_URL_HERE';

export async function connectToDatabase() {
    const client = await MongoClient.connect(MONGODB_URL);

    return client;

}