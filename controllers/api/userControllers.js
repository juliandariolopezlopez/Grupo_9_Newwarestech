const { JSON } = require('sequelize');
const {User} = require ('../../database/models');

module.exports = {
    getAll: async (req, res) => {
        const user = await user.findAll({
          raw:true
        });

    res.json(user); 
    }
}