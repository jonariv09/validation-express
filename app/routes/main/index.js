
const router = require('express').Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('main', { title: 'Main' })
})

module.exports = router
