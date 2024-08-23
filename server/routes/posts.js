import express from 'express'
import { getAllPosts } from "../controllers/posts.js"
const router = express.Router()

router.get("/get-posts", getAllPosts);
// router.get("/get-post/:id", getPost);
// router.post("/create-post", createPost);
// router.delete("/delete-post", deletePost);
// router.put("/update-post", updatePost);

export default router;