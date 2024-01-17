import { connectToDB } from "@utils/database";
import User from "@models/user";

export const dynamic = "force-dynamic";
export const revalidate = 1; //revalidate api every 1 second

export const GET = async (req, res) => {

    
    try {
        await connectToDB();
        const users = await User.find();

        return new Response(JSON.stringify(users), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch users data", { status: 500 });
    }
}