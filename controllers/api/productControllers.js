const { JSON } = require('sequelize');
const {Product} = require ('../../database/models');

module.exports = {
    getAll: async (req, res) => {
        const product = await product.findAll({
          raw:true
        });

    res.json(product); 
    }
}

