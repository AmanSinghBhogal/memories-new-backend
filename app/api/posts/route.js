import { connectToDB } from "@utils/database";
import PostMessage from "@models/postMessage";

export const dynamic = "force-dynamic";
export const revalidate = 1; //revalidate api every 1 second

export const GET = async (req) => {

    const page = parseInt(req.nextUrl.searchParams.get("page"));
    const limit = req.nextUrl.searchParams.get("limit");
    
    try {
        await connectToDB();
        const defaultPageLimit = 3;
        const Limit = (Number(limit)? Number(limit): defaultPageLimit);
        const Page = (Number(page)>0? Number(page) : 1);
        const StartIndex = (Page - 1) * Limit;
        const TotalPosts = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(Limit).skip(StartIndex);

        return new Response(JSON.stringify({ data: posts, currentPage: Page, numberOfPages: Math.ceil(TotalPosts/Limit) }), { status: 200 });

        // const posts = await PostMessage.find();
        // return new Response(JSON.stringify(posts), {status: 200});
        
    } catch (error) {
        
        return new Response("Failed to fetch Post data", { status: 500 });
    }
}