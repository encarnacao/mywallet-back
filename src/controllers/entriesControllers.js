import { getDatabase } from "../database.js";
import { ObjectId } from "mongodb";

export async function newEntry(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		const session = await getDatabase()
			.collection("sessions")
			.findOne({ token });
		if (!session) {
			return res.status(401).send("Session expired");
		}
		const entry = req.body;
		entry.userId = session.userId;
		await getDatabase().collection("entries").insertOne(entry);
		res.status(201).send("Entry created");
	} catch (e) {
		console.log(req.body);
		console.log(e);
		res.sendStatus(500);
	}
}

export async function getEntries(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		const session = await getDatabase()
			.collection("sessions")
			.findOne({ token });
		if (!session) {
			return res.status(401).send("Session expired");
		}
		const entries = await getDatabase()
			.collection("entries")
			.find({ userId: session.userId })
			.toArray();
		const user = await getDatabase()
			.collection("users")
			.findOne({ _id: session.userId });
		delete user.password;
		delete user.email;
		const response = { ...user, entries };
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

export async function getEntry(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		const session = await getDatabase()
			.collection("sessions")
			.findOne({ token });
		if (!session) {
			return res.status(401).send("Session expired");
		}
		const { id } = req.params;
		const entry = await getDatabase()
			.collection("entries")
			.findOne({ _id: ObjectId(id) });
		if (!entry) {
			return res.status(404).send("Entry not found");
		}
		if (entry.userId.toString() !== session.userId.toString()) {
			return res.sendStatus(401);
		}
		res.status(200).send(entry);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

export async function deleteEntry(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		const session = await getDatabase()
			.collection("sessions")
			.findOne({ token });
		if (!session) {
			return res.status(401).send("Session expired");
		}
		const { id } = req.params;
		const entry = await getDatabase()
			.collection("entries")
			.findOne({ _id: ObjectId(id) });
		if (!entry) {
			return res.status(404).send("Entry not found");
		}
		if (entry.userId.toString() !== session.userId.toString()) {
			return res.sendStatus(401);
		}
		await getDatabase()
			.collection("entries")
			.deleteOne({ _id: ObjectId(id) });
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}

export async function editEntry(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		const session = await getDatabase()
			.collection("sessions")
			.findOne({ token });
		if (!session) {
			return res.status(401).send("Session expired");
		}
		const { id } = req.params;
		const entry = await getDatabase()
			.collection("entries")
			.findOne({ _id: ObjectId(id) });
		if (!entry) {
			return res.status(404).send("Entry not found");
		}
		if (entry.userId.toString() !== session.userId.toString()) {
			return res.sendStatus(401);
		}
		const newEntry = req.body;
		await getDatabase()
			.collection("entries")
			.updateOne({ _id: ObjectId(id) }, { $set: newEntry });
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
}
