import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import { IProduct } from './IProduct';
import { Cart, addProductToCart, pollProductFromCart } from "./Cart"
import products from '../data/products.json';
const app = express();
const port = 8080;
const publicDir = __dirname + '/../../views';
const assortment = <IProduct[]>products;

app.use(express.static(publicDir));
app.use("/assets", express.static(path.join(__dirname + "/../views/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (_req, res) => {
    res.render("Index");
});

app.get("/Checkout", (_req, res) => {
    res.sendFile(path.join(publicDir + '/Checkout.html'));
});

app.get("/Details/:id", (req, res) => {
    if (assortment.find(p => p.id == req.params.id)) {
        res.sendFile(path.join(publicDir + '/Details.html'));
    } else {
        res.redirect('/');
    }
});

app.get("/Warenkorb", (_req, res) => {
    res.sendFile(path.join(publicDir + '/Warenkorb.html'));
});

app.get("/api/products", (_req, res) => {
    res.json(assortment);
});

app.get('/api/product/:id', (req, res) => {
    if (assortment.find(p => p.id == req.params.id)) {
        res.json(assortment.find(p => p.id == req.params.id));
    } else {
        res.redirect('/');
    }
});

app.get('/api/addproduct/:id/:isWarenkorb?', (req, res) => {
    let newProduct = assortment.find(p => p.id == req.params.id);
    if (newProduct) {
        let cart = req.session.cart ? req.session.cart : new Cart();
        req.session.cart = addProductToCart(cart, newProduct);
    }
    req.query.isWarenkorb ? res.redirect('/Warenkorb') : res.redirect(`/Details/${req.params.id}`);
});

app.get('/api/totalcost', (req, res) => {
    let cart = req.session.cart ? req.session.cart : new Cart();
    res.json(cart.totalCost);
});

app.get('/api/basketproducts', (req, res) => {
    let cart = req.session.cart ? req.session.cart : new Cart();
    res.json(cart);
});

app.get('/api/pollproduct/:id', (req, res) => {
    let newProduct = assortment.find(p => p.id == req.params.id);
    if (newProduct) {
        let cart = req.session.cart ? req.session.cart : new Cart();
        req.session.cart = pollProductFromCart(cart, req.params.id);
    }
    res.redirect('/Warenkorb');
});

app.post('/api/order', (req, res) => {
    let mailPattern = /^\S+(\.\S+)?@\S+\.\S{2,3}$/;
    let isValid = {
        firstname: req.body.firstname ? true : false,
        name: req.body.name ? true : false,
        email: mailPattern.test(req.body.mail) ? true : false
    }
    req.session.orderAlert = {
        showAlert: true,
        isSuccess: false
    };
    if (isValid.firstname && isValid.name && isValid.email) {
        req.session.cart = new Cart();
        req.session.orderAlert.isSuccess = true;
    }
    res.redirect('/Checkout');
});

app.get('/api/getAlert', (req, res) => {
    let orderAlert = req.session.orderAlert;
    req.session.orderAlert = null;
    res.json(orderAlert ? orderAlert : {});
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});