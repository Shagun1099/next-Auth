import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

export default NextAuth({

    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found');
                }

                const isValidPassword = await verifyPassword(credentials.password, user.password);

                if (!isValidPassword) {
                    client.close();
                    throw new Error("Wrong Password!");
                }

                client.close();
                return { email: user.email };

            }
        })
    ]
});
