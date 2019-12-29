import { IProduct } from "./IProduct";

export class ProductBasket {
    private goodsInBasket: IProduct[] = [];
    private totalCost: number = .00;

    constructor(oldProductBasket?: ProductBasket) {
        if (oldProductBasket != undefined) {
            this.goodsInBasket = [...oldProductBasket.goodsInBasket];
            this.totalCost = oldProductBasket.totalCost;
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
        this.totalCost += product.specialOffer ? product.specialOffer : product.normalPrice;
    }

    public pollProductFromBasket(id: string) {
        let productToPoll = this.goodsInBasket.find(x => x.id == id);
        if (productToPoll.quantity > 1) {
            productToPoll.quantity--;
        } else {
            this.goodsInBasket = this.goodsInBasket.filter(x => x.id != id);
        }
        this.totalCost -= productToPoll.specialOffer ? productToPoll.specialOffer : productToPoll.normalPrice;
    }

    public getTotalCost(): number {
        return Math.round(this.totalCost * 20) / 20;
    }
}