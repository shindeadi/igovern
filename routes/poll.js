const router=require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const pollController=require('../controllers/pollController');
const auth=require('../middlewares/auth')

router.get('/',auth,catchErrors(pollController.getAllPolls));
router.post('/',auth,catchErrors(pollController.createPoll));
router.post('/upvote',auth,catchErrors(pollController.upvotePoll));
router.post('/downvote',auth,catchErrors(pollController.downvotePoll));


module.exports=router;