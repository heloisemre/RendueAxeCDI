import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";

class AuthentificationController {

  async login(req, res) {
    try {
      const body = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      const isSamePassword = await comparePassword(
        body.password,
        user.password
      );

      if (!isSamePassword)
        return res.status(401).json({ message: "Invalid password" });

      const token = generateAccessToken(body.email);

      await prisma.user.update({
        where: {
          email: body.email,
        },
        data: {
          token,
        },
      });

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getMyProfile(req, res) {
    console.log("MY CONTROLLER");

    return res.status(200).json({ user: req.user });
  }
}

export default new AuthentificationController();