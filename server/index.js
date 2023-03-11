import express from "express";
import apiRoutes from "./api-routes/index.js"
import "./helpers/db.js"
import cors from "cors";

const app = express();
const PORT = "8080";

// jsonを扱う
app.use(express.json());

// cors allow 設定
app.use(cors({
    origin:"http://localhost:3000"
}))

// API 集約されたルーターを読み込む
app.use("/api", apiRoutes);

// errorHandler(nextに引数が渡ってきた場合) 引数を4つ定義する
app.use((err, req, res, next) => {
    // resが送信済みの場合
    if (res.headersSent) {
        // defaultのエラーハンドラー
        return next(err);
    }
    // resが返却されていない場合
    res.status(500).json({msg: "不正なエラーが発生しました。"})
})

// 上のパスが一致しない場合・完了しなかった場合
app.use((req, res) => {
    res.status(404).json({msg: "page not found"});
});

// サーバー起動
app.listen(PORT, () => {
    console.log("start server " + "http://localhost:8080");
})