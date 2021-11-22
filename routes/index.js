const router = require('express').Router();

const notesRouter= require('./notes');
const htmlRouter= require('./html-router')

router.use('/api', notesRouter);
router.use('/', htmlRoutes);


module.exports = router;