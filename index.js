 import express from "express";
import apiRoutes from "./server/api-routes/index.js"

const app = express();
const PORT = "8080";

app.use(express.json());

// API
 app.use("/api",apiRoutes);

app.listen(PORT, ()=>{
    console.log("start server " + "http://localhost:8080");
})