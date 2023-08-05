

module.exports= function(sequelize,dataTypes){

    // El alias es el nombre como queremos llamar a la tabla
    let alias = "Empleado";

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
        tableName : "empleados",
        timestamps : false
    }

    let Empleado = sequelize.define(alias,cols,config);

    return Empleado;
}