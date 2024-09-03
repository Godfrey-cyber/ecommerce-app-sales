import express from 'express'
import { registerUser, getAllUsers, loginStatus } from "../controllers/users.js"
const router = express.Router()

router.post("/register-user", registerUser)
router.get("/get-users", getAllUsers)
router.get("/login-status", loginStatus)

export default router
