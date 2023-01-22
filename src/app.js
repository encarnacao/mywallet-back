import express from "express";
import cors from 'cors'
import { connectDatabase } from "./database.js";
import users from "./routes/users.js";
import entries from "./routes/entries.js";

const PORT = 5000;

await connectDatabase();

const server = express();
server.use(express.json());
server.use(cors());
server.use(users);
server.use(entries);



server.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
});
