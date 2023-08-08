
module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Transporte";

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
    
    }

    let config = {
        tableName : "transporte",
        timestamps : false
    }

    let Transporte = sequelize.define(alias,cols,config);


    Transporte.associate = function (models){

        // belongsToMany es porque hay una relacion de muchos a muchos
        // esto genera una tabla intermedia, (de amgos lados o asociaciones)

        Transporte.hasMany (models.Usuario,{
            as: "usuarios",
            foreignKey : "transporte_id",
         
        }) 
        Transporte.hasMany (models.Proveedor,{
            as: "proveedores",
            foreignKey : "transporte_id",
        }) 
        Transporte.hasMany (models.Producto,{
            as: "productos",
            foreignKey : "transporte_id",
        }) 
         
        
    }

    return Transporte;
}