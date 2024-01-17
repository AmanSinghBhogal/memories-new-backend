import { connectToDB } from "@utils/database";
import PostMessage from "@models/postMessage";

export const dynamic = "force-dynamic";
export const revalidate = 1; //revalidate api every 1 second

export const GET = async (req, res) => {

    const searchQuery = req.nextUrl.searchParams.get("searchQuery");
    const tags = req.nextUrl.searchParams.get("tags");
    
    try {
        await connectToDB();
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ {title}, {tags: { $in: tags.split(',') }} ] });

        return new Response(JSON.stringify({ data: posts }), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 404 });
    }
}