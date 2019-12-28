import express from 'express';
import expressSession from 'express-session';
import exphbs from 'express-handlebars';
import { check, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import { IProduct } from './IProduct';
import { ProductBasket } from "./ProductBasket"
import products from '../data/products.json';
const app = express();
const port = 8080;
const assortment = <IProduct[]>products;
const hbs = exphbs.create({
    extname: 'hbs',
    helpers: {
        multiply: function (factor_1: number, factor_2: number) { return (factor_1 * factor_2).toFixed(2); },
        twoDecimals: function (price: number) { return price.toFixed(2); }
    }
});

app.use(express.static(__dirname + '/../../views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.render("Index", {
        title: 'Produkteübersicht',
        basketValue: basket.getTotalCost(),
        assortment: assortment
    });
});

app.get("/Checkout", (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.render('Checkout', {
        title: 'Checkout',
        basketValue: basket.getTotalCost()
    });
});

app.get("/Details/:id", (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.render('Details', {
        title: 'Details',
        basketValue: basket.getTotalCost(),
        product: assortment.find(x => x.id == req.params.id)
    });
});

app.get("/Warenkorb", (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    res.render('Warenkorb', {
        title: 'Warenkorb',
        goodsInBasket: basket.getProductsInBasket(),
        basketValue: basket.getTotalCost()
    });
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

app.get('/api/pollproduct/:id', (req, res) => {
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    basket.pollProductFromBasket(req.params.id);
    req.session.productbasket = basket;
    res.redirect('/Warenkorb');
});

app.post('/api/order', [
    check('firstname').isLength({ min: 1 }),
    check('name').isLength({ min: 1 }),
    check('mail').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    let basket = new ProductBasket(req.session.productbasket ? req.session.productbasket : undefined);
    if (errors.isEmpty()) {
        req.session.productbasket = new ProductBasket();
    }
    res.render('Checkout', {
        title: 'Checkout',
        basketValue: basket.getTotalCost(),
        showAlert: true,
        isSuccess: errors.isEmpty() ? true : false,
    });
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});