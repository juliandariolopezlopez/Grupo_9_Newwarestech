
const fs = require ('fs');
const path = require ('path');

const productModel = require('./product');
const { search } = require('../routes/userRoutes');

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
    createCartProduct: function(newUserCart){

        // Al agregarse uno, se creara una nueva carta de product.
        // con la informacion del usuario
        // y los productos que agregue a su carrito => CartManager

        const cartProducts = this.cardProductFindAll();

        if (cartProducts.length <= 0){

            userNeeded ={
                id : 1,
                email: "exampleNeeded"
            }

            cartProducts.push(userNeeded)
            let cartProductsJsonNeeded = JSON.stringify(cartProducts);
            fs.writeFileSync(path.join(__dirname ,this.route), cartProductsJsonNeeded)
        }
        
        newUserCart = {

            id : cartProducts[cartProducts.length - 1].id + 1,
            email: newUserCart.email,
            productId : []
        }

        cartProducts.push(newUserCart);

        const cartProductsJSON = JSON.stringify(cartProducts);

        fs.writeFileSync(path.join(__dirname ,this.route), cartProductsJSON);

        // Si users aumenta uno.
        //identificar mail del nuevo
        // crear nuevo carrito con mail y id

        return newUserCart
    },

    // Encontrar el CartProduct, lo identifica el email del usuario
    findCartProductByField: function(field , text){

        // Buscar dentro del json de carritos
        // Encontrar el carrito segun email del ususario

        const cartProducts = this.cardProductFindAll();

        let searchedCardProduct = cartProducts.find(elemento=> elemento[field] === text);

        if (!searchedCardProduct){
            searchedCardProduct = null
        }

        return searchedCardProduct

    },

    cartManager: function( data , userDataSession){

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

        const productsIdToAdd = data.id;

        let cartProducts = this.cardProductFindAll()

        let cartProductUser = this.findCartProductByField('email', userDataSession.email);
        
        // DEBE AGREGAR LOS IDS de los productos en un mismo array

        /* cartProductUser.productId.push(productsIdToAdd) */

        const index = cartProducts.findIndex(elemento=> elemento.id === cartProductUser.id)

        cartProducts[index] ={

            ...cartProductUser,
            productId: productsIdToAdd
        }
        

        cartProductsJSON = JSON.stringify(cartProducts);

        fs.writeFileSync(path.join(__dirname, this.route), cartProductsJSON);

        return cartProducts;

    },

    removeFromCart : function( productId , userData){

        const cartProducts = this.cardProductFindAll();

        const cartProductUser = cartProducts.filter(elemento=> elemento.email === userData.email);

        const index = cartProducts.indexOf(cartProductUser)

        cartProducts[index]={

            ...cartProductUser,
            // debe buscar el productID y eliminarlo
        }

        cartProductsJSON = JSON.stringify(cartProducts);

        fs.writeFileSync(path.join(__dirname, this.route), cartProductsJSON);

        return cartProducts;

    },

    cleanCart : function(data){

        // Debe buscar el carrito segun el mail del usuario
        // Debe borrar todos los productos que haya en el carrito
        // Debe reescribir el archivo sin los productos


        //** RECIBE desde ruta  un array vacio, y lo reescribe en el json*/
        // Deberia reescribir solamente el carrito borrado y mantener la info del usuario 
        /* clean: function (data) {} */

            cartProducts = data;
    
            const productsJSON = JSON.stringify(cartProducts); // Convertir de JS a JSON
    
            fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
    
            return cartProducts;

    },

    checkCart: function (email) {

        let cartProductsUser = this.findCartProductByField('email',email);

        if(!cartProductsUser.productId){
            
            cartProductsUser = []

        }else{

            cartProductsUser = productModel.findByid(cartProductsUser.productId);
        }
        // Debe encontrar los prodcutos por su id y retornarlos en cartProductsUser
        // Como hacer para que lea el array de ids??
        // Luego los lee el metodo findByid y debe retornar los productos.
        // Ahora estan en [] para la lectura
    
        return cartProductsUser;
    },

}



module.exports = cartProductModel;