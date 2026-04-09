//server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongoconfig.js";
import cors from "cors";
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});