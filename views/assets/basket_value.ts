fetch('http://localhost:8080/api/totalcost')
    .then(r => r.json())
    .then((totalcost: number) => {
        let basketbtn = document.querySelector('.basket button');
        basketbtn.innerHTML = 'Warenkorb: CHF ' + totalcost.toFixed(2);
    });