const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const reformController=require('../controllers/reformController');
const auth=require('../middlewares/auth')

router.get('/',auth,catchErrors(reformController.getAllReforms));
router.post('/',auth,catchErrors(reformController.createReform));
router.post('/upvote',auth,catchErrors(reformController.upvoteReform));
router.post('/downvote',auth,catchErrors(reformController.downvoteReform));


module.exports=router;