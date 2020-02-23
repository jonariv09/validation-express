const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render('users', { file: 'router.js' })
})

module.exports = router