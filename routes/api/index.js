const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');
const friendsRoutes = require('./friendsRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;
