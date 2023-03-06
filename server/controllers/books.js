import {validationResult} from "express-validator";
import {Book} from "../models/books.js";

export const getAllBooks = async (req, res) => {
    const books = await Book.find().sort({updatedAt: -1}); // 降順全て取得
    res.json(books);
}

export const getBook = async (req, res) => {
    const _id = req.params.id; // queryから取得
    // const book = await Book.findOne({_id});
    const book = await Book.findById(_id);
    if (book === null) return res.status(404).json({msg: "page not found"})
    res.json(book);

}

export const deleteBook = async (req, res) => {
    try {
        const _id = req.params.id; // queryから取得
        // const book = await Book.findByIdAndDelete(_id);

        const book = await Book.deleteOne({_id});
        console.log(book);
        if (book.deletedCount === 0) return res.status(404).json({msg: "book not found"})
        res.json({"msg": `${book.title} is deleted`});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "不正なエラーが発生しました"});
    }
}

export const registBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array();
        return res.status(400).json(errs);
    }
    const book = new Book(req.body);
    const newBook = await book.save();
    res.status(201).json(newBook); // DBに対して処理を行った場合
}

export const updateBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array();
        return res.status(400).json(errs);
    }
    const {title, description, comment, rating} = req.body;
    const _id = req.params.id; // queryから取得
    const book = await Book.findById(_id);
    if (book === null) return res.status(404).json({msg: "page not found"});
    if (title) book.title = title;
    if (description) book.description = description;
    if (comment) book.comment = comment;
    if (rating) book.rating = rating;
    await book.save();
    res.status(201).json(book);
}