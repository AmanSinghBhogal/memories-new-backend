import { connectToDB } from "@utils/database";
import PostMessage from "@models/postMessage";

export const dynamic = "force-dynamic";
export const revalidate = 1; //revalidate api every 1 second

export const GET = async (request) => {
    try {
        await connectToDB();

        const posts = await PostMessage.find();

        return new Response(JSON.stringify(posts), { status: 200 });
        
    } catch (error) {
        
        return new Response("Failed to fetch Post data", { status: 500 });
    }
}