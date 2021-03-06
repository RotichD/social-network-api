const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// prefixes routes with respective titles
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;