import express from "express";
import { User } from "../models/user.js";
import {
  createUser,
  // deleteUser,
  // getAllUsers,
  getProfile,
  // getUser,
  login,
  logout,
  // updateUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/all", getAllUsers);

router.post("/new", createUser);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me",isAuthenticated,getProfile)

//2 ways of routing (1)
// router.route("/userid/:id").get(getUser).put(updateUser).delete(deleteUser);
// router.route("/userid/:id").get(getUser);

//(2)
// router.get("/userid/:id", getUser);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);

export default router;
