import { connectToDB } from "@utils/database";
import PostMessage from "@models/postMessage";
import mongoose from "mongoose";

export const revalidate = 1; //revalidate api every 1 second

// Patch Endpoint
export const PATCH = async (req, { params }) => {
    const id = params.id;
    const post = req.body;
    try {
        await connectToDB();
        if(!mongoose.Types.ObjectId.isValid(id)){
            return new Response(`No post with id: ${id}`, { status: 404 });
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id,{...post, createdAt: new Date().toISOString()}, {new: true});

        await updatedPost.save();

        return new Response(JSON.stringify(updatedPost), { status: 200 }); 

    } catch (error) {
        console.log(error);
        return new Response("Failed to update Post.", { status: 500 });
    }
}