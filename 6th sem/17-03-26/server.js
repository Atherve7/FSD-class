const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello" });
});

app.post("/api/data", (req, res) => {
    const data = req.body;
    res.send({ received: data });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});