import express from 'express';
import expressSession from 'express-session';
import path from 'path';
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/../views'));

app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname+'/../views/Checkout.html'));
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});