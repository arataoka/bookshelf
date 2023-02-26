import env from 'dotenv';
import mongoose from "mongoose";
env.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
