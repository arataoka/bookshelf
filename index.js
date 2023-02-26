 import express from "express";
import apiRoutes from "./server/api-routes/index.js"
 import "./server/helpers/db.js"

const app = express();
const PORT = "8080";

// jsonを扱う
app.use(express.json());

// API 集約されたルーターを読み込む
 app.use("/api",apiRoutes);

 // サーバー起動
app.listen(PORT, ()=>{
    console.log("start server " + "http://localhost:8080");
})