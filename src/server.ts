import express from 'express';
import expressSession from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import { IProduct } from './IProduct';
import { ProductBasket } from "./ProductBasket"
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

app.get("/", (req, res) => {
    res.render("Index");
});

app.get("/Checkout", (req, res) => {
    res.sendFile(path.join(publicDir + '/Checkout.html'));
});

app.get("/Details/:id", (req, res) => {
    res.sendFile(path.join(publicDir + '/Details.html'));
});

app.get("/Warenkorb", (req, res) => {
    res.sendFile(path.join(publicDir + '/Warenkorb.html'));
});

app.get("/api/products", (req, res) => {
    res.json(assortment);
});

app.get('/api/product/:id', (req, res) => {
    res.json(assortment.find(x => x.id == req.params.id));
});

app.get('/api/addproduct/:id/:isWarenkorb?', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    let product = assortment.find(x => x.id == req.params.id);
    basket.addProductToBasket(product);
    req.session.productbasket = basket;
    if (req.query.isWarenkorb) {
        res.redirect('/Warenkorb');
    } else {
        res.redirect('/');
    }
});

app.get('/api/totalcost', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.json(basket.getTotalCost());
});

app.get('/api/basketproducts', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.json(basket.getProductsInBasket());
});

app.get('/api/pollproduct/:id', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    basket.pollProductFromBasket(req.params.id);
    req.session.productbasket = basket;
    res.redirect('/Warenkorb');
});

app.post('/api/order', (req, res) => {
    let mailPattern = /^\S+(\.\S+)?@\S+\.\S{2,3}$/;
    let isValid = {
        firstname: req.body.firstname ? true : false,
        name: req.body.name ? true : false,
        email: mailPattern.test(req.body.mail) ? true : false,
    }
    req.session.orderAlert = {
        showAlert: true,
        isSuccess: false
    };
    if (isValid.firstname && isValid.name && isValid.email) {
        req.session.productbasket = new ProductBasket();
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