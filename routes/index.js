const router = require('express').Router();

const notesRouter= require('./notes');
const htmlRoutes= require('./html-routes')

router.use('/api', notesRouter);
router.use('/', htmlRoutes);


module.exports = router;