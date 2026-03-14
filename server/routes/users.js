import express from 'express'
import { registerUser, getAllUsers, loginUser, logoutUser, tokenRefresh, changePassword, getMe } from "../controllers/users.js"
import { authenticate } from "../utilities/authMiddleware.js"
const router = express.Router()

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.post("/logout-user", authenticate, logoutUser)
router.get("/get-users", getAllUsers)
router.get("/get-me", authenticate, getMe)
router.post("/change-password", changePassword)
router.get("/refresh-token", tokenRefresh)

export default router