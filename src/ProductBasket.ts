import { IProduct } from "./IProduct";
import products from "./products.json";

export class ProductBasket {
    private goodsInBasket: IProduct[] = [];
    private assortment: IProduct[] = <IProduct[]>products;

    public isEmpty(): boolean {
        return this.goodsInBasket.length == 0 ? true : false;
    }

    public addProductInBasket(ID: number) {
        this.goodsInBasket.push(this.assortment.find(x => x.id == ID));
    }

    public pollProductFromBasket(ID: number) {
        this.goodsInBasket = this.goodsInBasket.filter(x => x.id != ID);
    }

    public getTotalCost(): number {
        let totalCost = 0;
        for (let i = 0; i < this.goodsInBasket.length; i++) {
            totalCost = totalCost + this.goodsInBasket[i].specialOffer;
        }
        return totalCost;
    }

    public getProductOccurence(ID: number): number {
        return this.goodsInBasket.filter(x => x.id == ID).length;
    }
}