import express from "express";
import cors from 'cors'
import { connectDatabase } from "./database.js";

const PORT = 5000;



const server = express();
server.use(express.json());
server.use(cors());

await connectDatabase();

server.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
});
