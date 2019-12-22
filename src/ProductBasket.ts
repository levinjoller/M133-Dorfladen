import { IProduct } from "./IProduct";
import products from "../data/products.json";

export class ProductBasket {
    private goodsInBasket: IProduct[] = [];
    private assortment = <IProduct[]>products;

    constructor(oldProductBasket?: ProductBasket) {
        if (oldProductBasket != undefined) {
            this.goodsInBasket = [...oldProductBasket.goodsInBasket];
        }
    }

    public isEmpty(): boolean {
        return this.goodsInBasket.length == 0 ? true : false;
    }

    public addProductInBasket(ID: string) {
        this.goodsInBasket.push(this.assortment.find(x => x.id == ID));
    }

    public pollProductFromBasket(ID: string) {
        this.goodsInBasket = this.goodsInBasket.filter(x => x.id != ID);
    }

    public getTotalCost(): number {
        let totalCost = 0;
        for (let i = 0; i < this.goodsInBasket.length; i++) {
            totalCost = totalCost + this.goodsInBasket[i].specialOffer;
        }
        return Math.round(totalCost * 20) / 20;
    }

    public getProductOccurence(ID: string): number {
        return this.goodsInBasket.filter(x => x.id == ID).length;
    }
}