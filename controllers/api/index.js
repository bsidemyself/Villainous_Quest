const router = require('express').Router();
const usersRouter = require('./users-router');
const questsRouter = require('./quest-router');

router.use('/users', usersRouter);
router.use('/quests', questsRouter);


module.exports = router;
