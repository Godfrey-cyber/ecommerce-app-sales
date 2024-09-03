import express from 'express'
import { registerUser, getAllUsers, loginStatus, loginUser } from "../controllers/users.js"
import { protect } from "../middleWare/authMiddleware.js"
const router = express.Router()

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.get("/get-users", getAllUsers)
router.get("/login-status", loginStatus)

export default router
