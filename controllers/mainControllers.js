const express = require('express');
const path = require('path');

const userAdminModel = require('../Models/usersAdmin');

const expressValidator = require('express-validator');

const bcryptjs = require('bcryptjs');

const controllers = {

    getIndex: (req,res)=>{
       res.render('index');
    },

    getAdmin: (req,res)=>{

      const usersAdmin = userAdminModel.findComplete(false);

      const session = req.session.userAdminLogged;
  
        res.render('admin' ,{
         usersAdmin:usersAdmin,
         errors:[],
         values:[],
         session:session
      });
     },

     //Login de administrador
     postAdmin: (req,res)=>{

      const usersAdmin = userAdminModel.findComplete(false);

      const validation = expressValidator.validationResult(req);

      if(validation.errors.length>0){

          return res.render('admin',{
              errors:validation.errors,
              values:req.body,
              usersAdmin:usersAdmin
          });
      };

        const userAdminInLogin = userAdminModel.findByField('email',req.body.email);

        if(!userAdminInLogin){

        return res.render('admin',{
             errors:[{
                 msg:'Este email no se encuentra registrado'
             }],
             values:req.body,
             usersAdmin
         })
     }

     if(userAdminInLogin){

      const passwordCoincid = bcryptjs.compareSync(req.body.password, userAdminInLogin.password);

      if(passwordCoincid){

          delete userAdminInLogin.password;
          delete userAdminInLogin.id;

          if(req.body.rememberme){    
              res.cookie('emailAdmin', userAdminInLogin.email,{ maxAge:(1000*60)/* *60*24 */});
          }
          
          req.session.userAdminLogged = userAdminInLogin;

          return res.redirect('/admin');

      }else{

      return res.render('admin',{
          errors:[{
              msg:'Contraseña incorrecta'
          }],
          values:req.body,
      });
  };
}
     },

     // REGISTRACION del ADMINISTRADOR
    getAdminRegister: (req,res)=>{
        res.render('adminRegister',{

         errors:[],
         values:[]
        });
     },

     // REGISTRACION DE UN ADMINISTRADOR POST

    postAdminRegister: (req,res)=>{
      
      const validation = expressValidator.validationResult(req);

      if(validation.errors.length>0){

         res.render('adminRegister', {

            errors: validation.errors,
            values:req.body
         });

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

     const usuarioAdminEnBD = userAdminModel.findByField('email',req.body.email);

     if(usuarioAdminEnBD){
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

  userAdminModel.createOne(newUser);

 return res.redirect('/admin');

     },

     // Perfil del ADMINISTRADOR

     getAdminUserProfile:(req,res)=>{
 
        const id = Number(req.query.id);

       const userAdmin = userAdminModel.findByField('id',id)
      
       res.render('adminUserProfile', {

        userAdmin:userAdmin
          
       })
     
    },

     // UPDATE del ADMINISTRADOR

    getUserAdminToUpdate:(req,res)=>{

      const userAdmin = userAdminModel.findByField('email',req.session.userAdminLogged.email)

      res.render('updateAdminUsers', {
         userAdmin:userAdmin
      })

  },

  // PUT del ADMINISTRADOR
  
  putUserAdminUpdate: (req,res)=>{

        const userAdmin = userAdminModel.findByField('email',req.session.userAdminLogged.email)

        const id = userAdmin.id;

        const newAdminData = req.body;

        /* newData.image = '/images/users/' + req.file.filename; */

        userAdminModel.updateByid(id, newAdminData)

        res.redirect('/admin')
  },

  // Delete del ADMINISTRADOR
  deleteUserAdmin:(req,res)=>{

      const id = Number(req.params.id);

      let users = userAdminModel.deleteByid(id);

      users = userAdminModel.findComplete(false)

      res.redirect('/admin', {users});

  },
  
   amdminLogOut:(req,res)=>{

      res.clearCookie('emailAdmin');
      res.clearCookie();
      req.session.destroy();
      return res.redirect('/admin');

  }

}

module.exports = controllers;