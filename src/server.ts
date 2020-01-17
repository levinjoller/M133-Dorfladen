import express from 'express';
import expressSession from 'express-session';
import exphbs from 'express-handlebars';
import { check, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import { IProduct } from './IProduct';
import { Cart, addProductToCart, pollProductFromCart } from './Cart';
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
app.use("/assets", express.static(__dirname + '/../views/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "I'%m23-o&uT",
    resave: false,
    saveUninitialized: true,
}));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (_req, res) => {
    res.render("Index", {
        title: 'Produkteübersicht',
        assortment: assortment
    });
});

app.get('/Checkout', (_req, res) => {
    res.render('Checkout', {
        title: 'Checkout'
    });
});

app.get('/Details/:id', (req, res) => {
    res.render('Details', {
        title: 'Details',
        product: assortment.find(x => x.id == req.params.id)
    });
});

app.get('/Warenkorb', (req, res) => {
    let cart = req.session.cart ? req.session.cart : new Cart();
    res.render('Warenkorb', {
        title: 'Warenkorb',
        products: cart.products,
        totalCost: cart.totalCost
    });
});

app.get('/api/addproduct/:id/:isWarenkorb?', (req, res) => {
    let product = assortment.find(x => x.id == req.params.id);
    if (product) {
        let cart = req.session.cart ? req.session.cart : new Cart();
        req.session.cart = addProductToCart(cart, product);
    }
    req.query.isWarenkorb ? res.redirect('/Warenkorb') : res.redirect(`/Details/${req.params.id}`);
});

app.get('/api/pollproduct/:id', (req, res) => {
    let cart = req.session.cart ? req.session.cart : new Cart();
    req.session.cart = pollProductFromCart(cart, req.params.id);
    res.redirect('/Warenkorb');
});

app.post('/api/order', [
    check('firstname').isLength({ min: 1 }),
    check('name').isLength({ min: 1 }),
    check('mail').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        req.session.cart = new Cart();
    }
    res.render('Checkout', {
        title: 'Checkout',
        showAlert: true,
        isSuccess: errors.isEmpty(),
    });
});

app.get('/api/cart', (req, res) => {
    let cart = req.session.cart ? req.session.cart : new Cart();
    res.json(cart);
});

app.listen(port, () => {
    console.log(`server started: ${port}`);
});