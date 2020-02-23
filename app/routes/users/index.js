
const router = require('express').Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', { file: 'Users' })
})

module.exports = router
