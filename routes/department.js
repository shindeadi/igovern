const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const departmentController=require('../controllers/departmentController');
const auth=require('../middlewares/auth')

router.get('/',auth,catchErrors(departmentController.getAllDepartments));
router.post('/',auth,catchErrors(departmentController.createDepartment));


module.exports=router;