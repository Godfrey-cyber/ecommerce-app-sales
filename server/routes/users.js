import express from 'express'
import { registerUser, getAllUsers, loginStatus, loginUser, logoutUser, token, refreshToken } from "../controllers/users.js"
import { protect } from "../middleWare/authMiddleware.js"
const router = express.Router()

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.post("/logout-user", protect, logoutUser)
router.get("/get-users", getAllUsers)
router.get("/login-status", loginStatus)
router.get("/token", token)
router.post("/refresh_token", refreshToken)

export default router
