import express from 'express';
import expressSession from 'express-session';
const app = express();
const port = 8080;

app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req,res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});