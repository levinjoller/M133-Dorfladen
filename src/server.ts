import express from 'express';

const app = express();

app.get("/", (req,res) => {
    res.sendStatus(200);
});

app.listen(8080, () => {
    console.log("runs on port 8080");
});