import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Authenticating token: ", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    const email = payload.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

export default authenticateToken;