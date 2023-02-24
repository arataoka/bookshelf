import booksRouter from "./books.js"
import express from "express"

const router = express.Router();
router.use("/books", booksRouter) // NOTE: 第一引数はパス

export default router;