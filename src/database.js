import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

let client = null;
let db = null;

export async function connectDatabase(){
    try{
        client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        db = client.db();
        console.log("Database connected");
    } catch (error){
        console.log(error);
    }
}

export function getDatabase(){
    if(db){
        return db;
    } else{
        throw new Error("Database not connected");
    }
}