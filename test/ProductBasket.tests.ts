import { expect } from "chai";
import { ProductBasket } from "../src/ProductBasket";

describe("Village shop", () => {
    describe("Product basket", () => {
        it("is empty", () => {
            const testee = new ProductBasket();
            const result = testee.isEmpty();
            expect(result).to.equal(true);
        });
        it("with one product", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket(1);
            const result = testee.isEmpty();
            expect(result).to.equal(false);
        });
        it("with one product which gets deleted, is empty", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket(3);
            testee.pollProductFromBasket(3);
            const result = testee.isEmpty();
            expect(result).to.equal(true);
        });
        it("with three products, has price", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket(1);
            testee.addProductInBasket(3);
            testee.addProductInBasket(5);
            const result = testee.getTotalCost();
            expect(result).to.equal(3.6 + 8.25 + 4.5);
        });
        it("with three products, where one gets deletet, has price", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket(1);
            testee.addProductInBasket(3);
            testee.addProductInBasket(5);
            testee.pollProductFromBasket(3);
            const result = testee.getTotalCost();
            expect(result).to.equal(3.6 + 0 + 4.5);
        });
        it("with a product that occurs twice, has occurrence", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket(3);
            testee.addProductInBasket(3);
            testee.addProductInBasket(5);
            const result = testee.getProductOccurence(3);
            expect(result).to.equal(2);
        });
    });
});