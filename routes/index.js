const express = require('express');

const router = express.Router();

const test = async (req, res) => {
  res.render('main');
}

router.get('/', test);
module.exports = router;
