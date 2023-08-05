
module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Banco";

    let cols = {
        // minimo en estas columnas es type
        id :{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name:{
            type:dataTypes.String
        },

        // Esstos dos tienen tablas pivot, hay que incluirlos?

   /*      proveedor_id : {
            type:dataTypes.INTEGER
        },
        usuario_id : {
            type:dataTypes.INTEGER
        } */
    
    }

    let config = {
        tableName : "bancos",
        timestamps : false
    }

    let Banco = sequelize.define(alias,cols,config);


    Banco.associate = function (models){

        // belongsToMany es porque hay una relacion de muchos a muchos
        // esto genera una tabla intermedia, (de amgos lados o asociaciones)

        Banco.belongsToMany (models.Usuario,{
            as: "usuarios",
            through:"banco_usuario",
            foreignKey : "banco_id",
            otherKey : "usuario_id",
            timestamps:false
        }) 
        Banco.belongsToMany (models.Proveedor,{
            as: "proveedores",
            through:"banco_proveedor",
            foreignKey : "banco_id",
            otherKey : "proveedor_id",
            timestamps:false
        }) 
    }

    return Banco;
}