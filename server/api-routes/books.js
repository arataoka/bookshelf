import express from "express";
import {Book} from "../models/books.js"

const router = express.Router();

// /api/books
router.get("/", async (req,res)=>{
    const books = await Book.find();
    res.json(books);
})

export default  router;