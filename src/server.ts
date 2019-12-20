import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import { IProduct } from './IProduct';
import products from './products.json';
const app = express();
const port = 8080;
const assortment = <IProduct[]>products;

app.use(express.static(__dirname + '/../views'));

app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req, res) => {
    res.render("Index");
});

app.get("/Checkout", (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/Checkout.html'));
});

app.get("/Details/:ID", (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/Details.html'));
});

app.get("/api/products", (req, res) => {
    res.json(assortment);
});

app.get('/api/product/:ID', (req, res) => {
    res.json(assortment.find(x => x.id == parseInt(req.params.ID)));
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});