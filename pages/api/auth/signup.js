import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !email.includes('@') || !password || password?.trim()?.length < 5) {
            res.status(422).json({ message: "Invalid Input" });
            return;
        }

        const client = await connectToDatabase();

        const db = client.db();

        const existingUser = await db.collection('users').findOne({ email: email });

        if (existingUser) {
            res.status(422).json({ message: "User already exists!!" });
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Created User!", user: result })
        client.close();
    }

}

export default handler;