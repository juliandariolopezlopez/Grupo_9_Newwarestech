const productFetch = async (cantidad) => {
    const data = await fetch ('https://randomuser.me/api/?results=$(cantidad))');
    const resultado = await data.json;
    return resultado.results;
}


const saveProducInDom = async () => {
    const productDiv = document.querySelector(".productsContainer");
    const queryParams = new URLSearchParams(window.location.search);
    const cantidad = queryParams.get('cantidad');
    const products = await productFetch(cantidad);
}

products.forEach (products => {
    const newProduct = document.createElement('article');
    
})