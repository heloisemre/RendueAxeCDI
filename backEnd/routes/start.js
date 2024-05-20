import express from "express";
import UsersController from "../controllers/userController.js";
import AuthentificationController from "../controllers/authentificationController.js";
import CardController from "../controllers/cardController.js";
import authenticateToken from "../middlewares/auth.js";
import validators from "../validators/verify.js";

const router = express.Router();

router.get("/users", UsersController.index); // GET /users
router.post("/users", UsersController.store); // POST /users
router.get("/users/:id", UsersController.show);
router.get("/myCards", CardController.myCards);
router.get("/verify", validators.verifyToken);
router.post("/liked", CardController.like);
router.get("/booster", CardController.booster);
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);

export default router;