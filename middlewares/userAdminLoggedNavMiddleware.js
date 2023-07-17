
const userAdminModel = require('../Models/usersAdmin');


function userAdminLoggedNavMiddleware(req,res,next){

    res.locals.adminIsLogged = false;

    if(req.session.userAdminLogged){

        res.locals.adminIsLogged=true;
        res.locals.adminUserLogged = req.session.userAdminLogged;
       
    }

    next();
}




module.exports= userAdminLoggedNavMiddleware;
