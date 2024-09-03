import express from 'express'
import { registerUser, getAllUsers } from "../controllers/users.js"
const router = express.Router()

router.post("/register-user", registerUser)
router.get("/get-users", getAllUsers)

export default router
