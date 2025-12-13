document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#a').addEventListener('click', async (e) => {
        console.log('clicou');

        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        console.table(products);
    });
});