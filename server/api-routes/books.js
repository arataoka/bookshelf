import express from "express";
import {body} from "express-validator";
import {deleteBook, getAllBooks, getBook, registBook, updateBook} from "../controllers/books.js";
import {requestErrorHandler} from "../helpers/errorHandler.js";

const router = express.Router();

// /api/books
router.get("/", requestErrorHandler(getAllBooks))

router.get("/:id", requestErrorHandler(getBook))

router.delete("/:id", deleteBook)

// https://github.com/validatorjs/validator.js
router.patch("/:id",
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('comment').optional().notEmpty(),
    body('rating').optional().notEmpty().isInt({min: 1, max: 5})
    , updateBook)


// router.post('/', body('title').notEmpty().withMessage('タイトルが空です'));
// router.post("/", body('title').notEmpty().withMessage('タイトルが空です'),async (req,res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//        const errs = errors.array();
//       return res.status(400).json(errs);
//     }
//     const book = new Book(req.body);
//     const newBook = await book.save();
//     res.json(newBook)
// })
router.post("/",
    // body('title').notEmpty(),
    // body('description').notEmpty(),
    // body('comment').notEmpty(),
    // body('rating').notEmpty().isInt({min: 1, max: 5}),
    registBook);

export default router;