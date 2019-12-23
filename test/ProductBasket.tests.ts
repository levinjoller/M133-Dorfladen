import { expect } from "chai";
import { ProductBasket } from "../src/ProductBasket";
import products from '../data/products.json';

describe("Village shop", () => {
    describe("Product basket", () => {
        it("with no products, has a number of", () => {
            const testee = new ProductBasket();
            const result = testee.getProductsInBasket().length;
            expect(result).to.equal(0);
        });
        it("with two equal and a different product, costs", () => {
            const testee = new ProductBasket();
            testee.addProductToBasket(products[1]);
            testee.addProductToBasket(products[1]);
            testee.addProductToBasket(products[4]);
            const result = testee.getTotalCost();
            expect(result).to.equal(2.65 * 2 + 4.5);
        });
        it("with one product, which get's deleted, has a number of objects", () => {
            const testee = new ProductBasket();
            testee.addProductToBasket(products[2])
            testee.pollProductFromBasket("003");
            const result = testee.getProductsInBasket().length;
            expect(result).to.equal(0);
        });
        it("with three equal products, which one get's deleted, has quantity", () => {
            const testee = new ProductBasket();
            testee.addProductToBasket(products[2]);
            testee.addProductToBasket(products[2]);
            testee.addProductToBasket(products[2]);
            testee.pollProductFromBasket("003");
            const result = testee.getProductsInBasket()[0].quantity;
            expect(result).to.equal(2);
        });
        it("with three different products, which one get's deleted, costs", () => {
            const testee = new ProductBasket();
            testee.addProductToBasket(products[5]);
            testee.addProductToBasket(products[1]);
            testee.addProductToBasket(products[3]);
            testee.pollProductFromBasket("002");
            const result = testee.getTotalCost();
            expect(result).to.equal(2 + 0 + 2.7);
        });
        it("with total mix of products, where two get's deleted, costs", () => {
            const testee = new ProductBasket();
            testee.addProductToBasket(products[5]);
            testee.addProductToBasket(products[2]);
            testee.addProductToBasket(products[3]);
            testee.addProductToBasket(products[3]);
            testee.addProductToBasket(products[2]);
            testee.pollProductFromBasket("003");
            testee.pollProductFromBasket("006");
            const result = testee.getTotalCost();
            expect(result).to.equal(2.7 * 2 + 8.25);
        });
    });
});