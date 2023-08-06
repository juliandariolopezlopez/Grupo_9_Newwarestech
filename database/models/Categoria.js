module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Categoria";

    let cols = {
        // minimo en estas columnas es type
        id :{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name:{
            type:dataTypes.String
        }
    }

    let config = {
        tableName : "categorias",
        timestamps : false
    }

    let Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function (models){
        // has many quiere decir que categoria tiene muchos productos 

        // en models se usa Producto, porque asi usamos en el alias ("as")
        // el as de esta tabla es como se llama la asociacion
        
        Categoria.hasMany (models.Producto,{
            as: "productos",
            foreignKey : "categoria_id"
        })
    }



    return Categoria
}