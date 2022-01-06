import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

async function handler(req, res) {

    if (req.method !== 'PATCH') return;

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: "Not Authenticated!" });
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).son({ message: "User not found" });
        client.close();
        return;
    }

    const currentPassword = user.password;

    const isVerified = await verifyPassword(oldPassword, currentPassword);

    if (!isVerified) {
        res.status(403).json({ message: "Incorrect Password!" });
        client.close();
        return;
    }

    const newHashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: newHashedPassword } });

    client.close();

    res.status(200).json({ message: "Password Updated Successfully!" });

}

export default handler