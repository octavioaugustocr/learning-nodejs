const { parse } = require('path');
const url = require('url');
const address = 'https://www.mysite.com/catalog?products=mouse';
const parsedUrl = new url.URL(address);

console.log(parsedUrl.host);
console.log(parsedUrl.pathname);
console.log(parsedUrl.search);
console.log(parsedUrl.searchParams);
console.log(parsedUrl.searchParams.get('products'));