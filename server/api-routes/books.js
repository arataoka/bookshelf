import express from "express";
import {Book} from "../models/books.js"

const router = express.Router();

// /api/books
router.get("/", async (req,res)=>{
    const books = await Book.find().sort({updatedAt:-1}); // 降順全て取得
    res.json(books);
})

router.get("/:id", async (req,res)=>{
    const _id = req.params.id; // queryから取得
    // const book = await Book.findOne({_id});
    const book = await Book.findById(_id);
    res.json(book);

})

router.delete("/:id", async (req,res)=>{
    const _id = req.params.id; // queryから取得
    const book = await Book.findByIdAndDelete(_id);
    res.json({"msg":`${book.title} is deleted`});
})

router.patch("/:id", async (req,res)=>{
    const {title,description,comment,rating} = req.body;
    const _id = req.params.id; // queryから取得
    const book = await Book.findById(_id);
    book.title = title;
    book.description = description;
    book.comment = comment;
    book.rating = rating;
    await book.save();
    res.json(book);
})


router.post("/", async (req,res)=>{
    const book = new Book(req.body);
    const newBook = await book.save();
    res.json(newBook)
})

export default  router;