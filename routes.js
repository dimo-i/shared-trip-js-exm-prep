const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names

const tripController = require('./controllers/tripController');

router.use(homeController);
router.use('/auth', authController);
router.use('/trips', tripController);

module.exports = router;