import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { getDatabase } from "../database.js";

export async function signUp(req, res) {
	try {
		const { name, email, password } = req.body;
		const findUser = await getDatabase()
			.collection("users")
			.findOne({ email });
		if (findUser) {
			return res.sendStatus(409);
		}
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

export async function login(req, res) {
	try {
		const { email, password } = req.body;
		const user = await getDatabase().collection("users").findOne({ email });
		if (!user) {
			return res.status(401).send("Email or password incorrect");
		}

		const checkPassword = await bcrypt.compare(password, user.password);
		if (checkPassword) {
			const token = uuid();
            await getDatabase().collection("sessions").deleteOne({ userId: user._id});
			await getDatabase().collection("sessions").insertOne({
				token,
				userId: user._id,
			});
			res.status(200).send({ token });
		} else {
			res.status(401).send("Email or password incorrect");
		}
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
