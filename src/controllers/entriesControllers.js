import { getDatabase } from "../database.js";

export async function newEntry(req, res) {
	try {
		const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");
        const session = await getDatabase().collection("sessions").findOne({token});
        if(!session){
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

export async function getEntries(req, res){
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");
        const session = await getDatabase().collection("sessions").findOne({token});
        if(!session){
            return res.status(401).send("Session expired");
        }
        const entries = await getDatabase().collection("entries").find({userId: session.userId}).toArray();
        const user = await getDatabase().collection("users").findOne({_id: session.userId});
        delete user.password;
        delete user.email;
        const response = {...user, entries};
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
