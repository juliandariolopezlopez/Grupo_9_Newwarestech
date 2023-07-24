
const fs = require ('fs');
const path = require ('path');

const productModel = require('./product');
const userModel = require('./models/users')


const cartProductModel = { 

    route : '../data/cartProducts.json',
    productRoute : '../data/products.json',
    userRoute : '../data/users.json',


    cardProductFindAll: function(){

        const allCardProductsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8'); //Leer archivo JSON y tipo de caracteres que se usan 

        const cardProducts = JSON.parse(allCardProductsJSON) //Traducir de JSON a JS

        return cardProducts;

    },

    // Se crea un cartPorduct al crear un usuario nuevo.
    createCartProduct: function(){

        // Este codigo debe leer el json de nuevos usuarios,
        // Al agregarse uno, se creara una nueva carta de product.
        // con la informacion del usuario
        // y los productos que agregue a su carrito => CartManager

        const usersJSON = fs.readFileSync(path.join(__dirname , this.userRoute), 'utf-8');
        const users = JSON.parse(usersJSON);

        console.log (users)

    },

    // Encontrar el CartProduct, lo identifica el email del usuario
    findByEmail: function(){

        // Buscar dentro del json de carritos
        // Encontrar el carrito segun email del ususario

    },

    cartManager: function(){

        // Debe agregar porductos al recibir por ruta addToCart
        // recibe el id del producto a agregar
        // Lo busca en el listado de productos
        // Lo agrega
        // Debe escribirlo con el producto agregado
        // Si quiere eliminar uno, lo mismo. 
        // Reescribe sin el producto eliminado


        // QUE HACE?
        // recibe id desde ruta ( selecciona Agregar al carrito y envia)
        // Dicho id lo usa para encontar el producto como FindByID
        // Asi lo envia como paramentro a cartManager
        // Luego lo siguiente , lee el json, lo reescribe integrando el producto agregado


        let productsJSON = fs.readFileSync(path.join(__dirname, this.route2), 'utf-8');

        let cartProducts = JSON.parse(productsJSON);

        /* let cartProductsJSON = JSON.stringify(cartProducts); */

        cartProducts.push(data);

        productsJSON = JSON.stringify(cartProducts);

        fs.writeFileSync(path.join(__dirname, this.route2), productsJSON);

        return cartProducts;

    },

    cleanCart : function(){

        // Debe buscar el carrito segun el mail del usuario
        // Debe borrar todos los productos que haya en el carrito
        // Debe reescribir el archivo sin los productos


        //** RECIBE desde ruta  un array vacio, y lo reescribe en el json*/
        // Deberia reescribir solamente el carrito borrado y mantener la info del usuario 
        /* clean: function (data) {} */

            cartProducts = data;
    
            const productsJSON = JSON.stringify(cartProducts); // Convertir de JS a JSON
    
            fs.writeFileSync(path.join(__dirname, this.route2), productsJSON);
    
            return cartProducts;

    }

}


module.exports = cartProductModel;