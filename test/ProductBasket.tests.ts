import { expect } from "chai";
import { Cart, addProductToCart, pollProductFromCart } from "../src/Cart";
import products from '../data/products.json';

describe("Village shop", () => {
    describe("Cart", () => {
        it("which a product is added, has a number of products", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[1]);
            const result = cart.products.length;
            expect(result).to.equal(1);
        });
        it("which a product is added and deleted, has a number of products", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[1]);
            cart = pollProductFromCart(cart, "002");
            const result = cart.products.length;
            expect(result).to.equal(0);
        });
        it("with no products, has a number of", () => {
            let cart = new Cart();
            const result = cart.products.length;
            expect(result).to.equal(0);
        });
        it("with two equal and a different product, costs", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[1]);
            cart = addProductToCart(cart, products[1]);
            cart = addProductToCart(cart, products[5]);
            const result = cart.totalCost;
            expect(result).to.equal(2.65 * 2 + 4.5);
        });
        it("with one product, which get's deleted, has a number of objects", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[2])
            cart = pollProductFromCart(cart, "003");
            const result = cart.products.length;
            expect(result).to.equal(0);
        });
        it("with three equal products, which one get's deleted, has quantity", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[2]);
            cart = addProductToCart(cart, products[2]);
            cart = addProductToCart(cart, products[2]);
            cart = pollProductFromCart(cart, "003");
            const result = cart.products[0].quantity;
            expect(result).to.equal(2);
        });
        it("with three different products, which one get's deleted, costs", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[6]);
            cart = addProductToCart(cart, products[1]);
            cart = addProductToCart(cart, products[3]);
            cart = pollProductFromCart(cart, "002");
            const result = cart.totalCost;
            expect(result).to.equal(2 + 0 + 2.7);
        });
        it("with total mix of products, where two get's deleted, costs", () => {
            let cart = new Cart();
            cart = addProductToCart(cart, products[5]);
            cart = addProductToCart(cart, products[2]);
            cart = addProductToCart(cart, products[3]);
            cart = addProductToCart(cart, products[3]);
            cart = addProductToCart(cart, products[2]);
            cart = pollProductFromCart(cart, "003");
            cart = pollProductFromCart(cart, "006");
            const result = cart.totalCost
            expect(result).to.equal(2.7 * 2 + 8.25);
        });
        it("with one product, whitch has no specialOffer, costs", () => {
            let cart = new Cart();
            let pricyProduct = products[5];
            pricyProduct.specialOffer = null;
            cart = addProductToCart(cart, pricyProduct);
            const result = cart.totalCost;
            expect(result).to.equal(5.4);
        });
    });
});