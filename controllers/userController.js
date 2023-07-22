const express = require('express');

const userModel = require('../models/users');

const expressValidator = require('express-validator');

const bcryptjs = require('bcryptjs');

const userController = {

    getLogin: (req,res)=>{
        res.render('login',{
            errors:[],
            values:[]
        });
    },

    postLogin: (req,res)=>{

        const validation = expressValidator.validationResult(req);

        if(validation.errors.length>0){

            return res.render('login',{
                errors:validation.errors,
                values:req.body
            })
        }

        const userInLogin = userModel.findByField('email',req.body.email);

        if(!userInLogin){

            res.render('login',{
                errors:[{
                    msg:'Este email no se encuentra registrado'
                }],
                values:req.body
            })
        }

        if(userInLogin){

            const passwordCoincid = bcryptjs.compareSync(req.body.password, userInLogin.password);

            if(passwordCoincid){

                delete userInLogin.password;
                delete userInLogin.id;

                if(req.body.rememberme){    
                    res.cookie('emailUser', userInLogin.email,{ maxAge:(1000*60)*60*24});
                }
                
                req.session.userLogged = userInLogin;

                return res.redirect('/products/productCart');
            
        }else{

            return res.render('login',{
                errors:[{
                    msg:'Contraseña incorrecta'
                }],
                values:req.body
            });
        }
    }
},

    getuserList:(req,res)=>{
        
        const users = userModel.findComplete(false)
        
        res.render('userList', {users});
    },

    getRegister:(req,res)=>{
        res.render('register',{

            errors:[],
            values:[]
        });
    },
    
    postRegister:(req,res)=>{

        const validation = expressValidator.validationResult(req);

        if(validation.errors.length > 0){

            return res.render('register' ,{

                errors: validation.errors,
                values: req.body

            })

        }

        const passwordEquality = req.body.password === req.body.confirmpassword;

        if(!passwordEquality){

            return res.render('register',{
                errors:[{
                 msg:"La contraseña debe coincidir"   
                }],
                values:req.body,
            })
        }

        const usuarioEnBD = userModel.findByField('email',req.body.email);

        if(usuarioEnBD){
            return res.render('register',{
                errors:[{
                    msg: "El mail ya existe, elija otro"
                }],
                values: req.body
            })
        }
        
            const newUser= {
                
                ...req.body,
                password: bcryptjs.hashSync(req.body.password,10),
                confirmpassword: bcryptjs.hashSync(req.body.confirmpassword,10)
            }
    
            userModel.createOne(newUser);
    
           return res.redirect('/users/login');

    },

    getuserToUpdate:(req,res)=>{

        const id = Number(req.params.id);

        const users = userModel.findByid(id)

        res.render('updateUser', {users})

    },

    userUpdate: (req,res)=>{

            const id = Number(req.params.id);

            newData = req.body;

            newData.image = '/images/users/' + req.file.filename;

            let users = userModel.updateByid(id, newData)

            res.render('userList', {users})
    },

    userDelete:(req,res)=>{

        const id = Number(req.params.id);

        let users = userModel.deleteByid(id);

        users = userModel.findComplete(false)

        res.render('userList', {users});

    },

    getLogout : ( req , res ) =>{
        
        res.clearCookie('emailUser');
        req.session.destroy();
        return res.redirect('/');
    },
}

module.exports = userController;