import { DATASOURCES_CACHE_DIR } from "@/scripts/constants.mjs";
import {
    VectorStoreIndex,
    storageContextFromDefaults,
    MongoDBAtlasVectorSearch,
    ServiceContext,
    SimpleDocumentStore,
} from "llamaindex";
import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URL || 'mongodb+srv://At0x:r8MzJR2r4A1xlMOA@cluster1.upfglfg.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);
await client.connect();
console.log('Connected successfully to server');
// Database Name
const dbName = 'aiUniverse';
const indexName = "vector_index"

export async function getDataSource(
    serviceContext: ServiceContext,
) {
    //Where the real code starts
    const vectorStore = new MongoDBAtlasVectorSearch({
        mongodbClient: client,
        dbName: dbName,
        collectionName: "royIndex", // this is where your embeddings will be stored
        indexName, // this is the name of the index you will need to create
    });

    // now create an index from all the Documents and store them in Atlas

    return await VectorStoreIndex.fromVectorStore(
        vectorStore,
        serviceContext,
    );
}
