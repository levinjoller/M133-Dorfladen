import { IProduct } from "./IProduct";

export class ProductBasket {
    private goodsInBasket: IProduct[] = [];

    constructor(oldProductBasket?: ProductBasket) {
        if (oldProductBasket != undefined) {
            this.goodsInBasket = [...oldProductBasket.goodsInBasket];
        }
    }

    public getProductsInBasket(): IProduct[] {
        return this.goodsInBasket;
    }

    public addProductToBasket(product: IProduct) {
        let productInBasket = this.goodsInBasket.find(x => x.id == product.id);
        if (!productInBasket) {
            this.goodsInBasket.push(Object.assign(product, { quantity: 1 }));
        } else {
            productInBasket.quantity++;
        }
    }

    public pollProductFromBasket(id: string) {
        let productToPoll = this.goodsInBasket.find(x => x.id == id);
        if (productToPoll.quantity > 1) {
            productToPoll.quantity--;
        } else {
            this.goodsInBasket = this.goodsInBasket.filter(x => x.id != id);
        }
    }

    public getTotalCost(): number {
        let totalCost = 0;
        for (let i = 0; i < this.goodsInBasket.length; i++) {
            totalCost = totalCost + this.goodsInBasket[i].specialOffer * this.goodsInBasket[i].quantity;
        }
        return Math.round(totalCost * 20) / 20;
    }
}