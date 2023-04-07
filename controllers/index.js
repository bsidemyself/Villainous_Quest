const router = require('express').Router();
const homeRouter = require('./home-router');
const apiRouter = require('./api');
const userRouter = require('./api/users-router');
const questRouter = require('./api/quest-router')


router.use('/', homeRouter);
router.use('/api', apiRouter);
router.use('/users',userRouter);
router.use('/quests', questRouter);

module.exports = router;
