// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone'

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding
const cohortChatGptIndex = pc.Index('cohort-chat-gpt');

//yeh vectors store karne mai help karta hai 
export async function createMemory({vectors,metadata,messageId}){
    await cohortChatGptIndex.upsert([{
        //id honi chahiye 
        id : messageId, 
        values : vectors,
        metadata
    }])
}

export async function querryMemory( {queryVector , limit=5 , metadata}) {
    const data=await cohortChatGptIndex.query({
        vector:queryVector,
        //closest kitne points humme chahiye , saare close points nahi chahiye 
        topK:limit,
        filter:metadata?{metadata}:undefined,
        includeMetadata:true
    })
    return data.matches
}