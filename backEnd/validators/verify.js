import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';


class Validators {
    async verifyToken(req, res) {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ message: "No token provided" });
    
        // verify that the token is less than 3 hours old
        dotenv.config();
        const secret = process.env.TOKEN_SECRET;

        jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

    
        const userFound = await prisma.user.findFirst({
            where: {
            token: token,
            },
        });

        let good = { 'isValid': true}
    
        if (!userFound) return res.status(404).json({ message: "User not found" });
    
        return res.status(200).json(good);
        });
    }
}

export default new Validators();