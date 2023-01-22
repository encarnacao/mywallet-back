import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { getDatabase } from "../database.js";
import { ObjectId } from "mongodb";

export async function signUp(req, res){
	try {
		const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
		const user = {
			name,
			email,
			password: hashedPassword,
		};
		const result = await getDatabase().collection("users").insertOne(user);
		res.status(201).send({ id: result.insertedId });
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}