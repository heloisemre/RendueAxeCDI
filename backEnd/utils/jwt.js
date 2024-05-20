import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();


const secret = process.env.TOKEN_SECRET;


function generateAccessToken(email) {
  //console.log('Generating token for', email)
  //console.log(secret);
  return jwt.sign(
    {
      data: email,
    },
    secret,
    {
      expiresIn: "3h",
    }
  );
}

export { generateAccessToken };