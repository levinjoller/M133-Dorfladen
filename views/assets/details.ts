import { IProduct } from '../../src/IProduct';

let pathArray: string[] = window.location.pathname.split('/');
let lastPartOfPath = pathArray[pathArray.length - 1];
fetch(`http://localhost:8080/api/product/${lastPartOfPath}`)
    .then(r => r.json())
    .then((product: IProduct) => {
        let content = `
            <div>
                <img src="/assets/img/${product.imageName}" alt="${product.productName}" />
            </div>
            <div>
                <h2>${product.productName}</h2>
                <p>${product.description}</p>
                <input type="submit" value="In den Warenkorb" onclick="window.location='http://localhost:8080/api/addproduct/${lastPartOfPath}';" /> 
            </div>
        `;
        document.querySelector('.productdetails').innerHTML = content;
    });