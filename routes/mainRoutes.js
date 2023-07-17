const express = require('express');
const mainControllers = require('../controllers/mainControllers');
const router = express.Router();

const validationsUser = require('../middlewares/validationsUser');
const validationsUserLogin = require('../middlewares/validationUserLogin');

const userAdminLoggedNavMiddleware = require('../middlewares/userAdminLoggedNavMiddleware');

//@get /
router.get('/', mainControllers.getIndex);

//@get /admin
router.get('/admin', mainControllers.getAdmin);

//Login del admin
//@post /admin
router.post('/admin', validationsUserLogin.validateLogInUser ,mainControllers.postAdmin);


//@get /adminregister
router.get('/adminregister', mainControllers.getAdminRegister);

//@post /adminregister
router.post('/adminregister', validationsUser.validateCreateUser ,mainControllers.postAdminRegister);


//@get /update/admin
router.get('/updateadminuser', mainControllers.getUserAdminToUpdate);

//@put /update/admin
router.put('/updateadminuser/:id/update', mainControllers.putUserAdminUpdate);

//@delete

router.delete ('/updateadminuser/:id/delete' , mainControllers.deleteUserAdmin)



router.post ('/adminlogout' , mainControllers.amdminLogOut)


module.exports = router;