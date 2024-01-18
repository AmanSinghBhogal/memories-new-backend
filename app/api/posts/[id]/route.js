import { connectToDB } from "@utils/database";
import PostMessage from "@models/postMessage";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

export const revalidate = 1; //revalidate api every 1 second

// Patch Endpoint
export const PATCH = async (req, { params }) => {
    try {
        const id = params.id;
        const post = req.body;

        // Checking if the request is authenticated or not:
        const token = req.headers.authorization.split(" ")[1];
        const isCustom = token.length < 500;
        let decodedData;

        if(token && isCustom)
        {
            decodedData = jwt.decode(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        }
        else
        {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

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

// Delete Endpoint
export const DELETE = async (req, { params }) => {
    try {
        // Checking if the request is authenticated or not:
        const token = req.headers.authorization.split(" ")[1];
        const isCustom = token.length < 500;
        let decodedData;

        if(token && isCustom)
        {
            decodedData = jwt.decode(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        }
        else
        {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        await connectToDB();

        if(!mongoose.Types.ObjectId.isValid(id))
            return new Response(`No post with id: ${id}`, { status: 404 });
        
        await PostMessage.findByIdAndDelete(params.id);

        return new Response("Post Deleted Successfully", { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to Delete Post!", { status: 500 });
    }
}