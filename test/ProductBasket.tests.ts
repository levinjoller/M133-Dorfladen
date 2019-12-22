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
            testee.addProductInBasket("001");
            const result = testee.isEmpty();
            expect(result).to.equal(false);
        });
        it("with one product which gets deleted, is empty", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket("003");
            testee.pollProductFromBasket("003");
            const result = testee.isEmpty();
            expect(result).to.equal(true);
        });
        it("with three products, has price", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket("001");
            testee.addProductInBasket("003");
            testee.addProductInBasket("005");
            const result = testee.getTotalCost();
            expect(result).to.equal(3.6 + 8.25 + 4.5);
        });
        it("with three products, where one gets deletet, has price", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket("001");
            testee.addProductInBasket("003");
            testee.addProductInBasket("005");
            testee.pollProductFromBasket("003");
            const result = testee.getTotalCost();
            expect(result).to.equal(3.6 + 0 + 4.5);
        });
        it("with a product that occurs twice, has occurrence", () => {
            const testee = new ProductBasket();
            testee.addProductInBasket("003");
            testee.addProductInBasket("003");
            testee.addProductInBasket("005");
            const result = testee.getProductOccurence("003");
            expect(result).to.equal(2);
        });
    });
});