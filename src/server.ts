import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import { IProduct } from './IProduct';
import { ProductBasket } from "./ProductBasket"
import products from '../data/products.json';
const app = express();
const port = 8080;
const publicDir = __dirname + '/../../views';
const assortment = <IProduct[]>products;

app.use(express.static(publicDir));

app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req, res) => {
    res.render("Index");
});

app.get("/Checkout", (req, res) => {
    res.sendFile(path.join(publicDir + '/Checkout.html'));
});

app.get("/Details/:ID", (req, res) => {
    res.sendFile(path.join(publicDir + '/Details.html'));
});

app.get("/Warenkorb", (req, res) => {
    res.sendFile(path.join(publicDir + '/Warenkorb.html'));
});

app.get("/api/products", (req, res) => {
    res.json(assortment);
});

app.get('/api/product/:ID', (req, res) => {
    res.json(assortment.find(x => x.id == req.params.ID));
});

app.get('/api/addproduct/:ID/:warenkorb?', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    let product = assortment.find(x => x.id == req.params.ID);
    basket.addProductToBasket(product);
    req.session.productbasket = basket;
    if (req.query.warenkorb) {
        res.redirect('/Warenkorb');
    } else {
        res.redirect('/');
    }
});

app.get('/api/totalcost', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.json(basket.getTotalCost());
});

app.get('/api/basket', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.json(basket.getProductsInBasket());
});

app.get('/api/pollproduct/:ID', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    basket.pollProductFromBasket(req.params.ID);
    req.session.productbasket = basket;
    res.redirect('/Warenkorb');
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});