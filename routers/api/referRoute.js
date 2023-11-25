const express = require('express');

const rerferRoute = express.Router();

const { referPage } = require('../../controllers/api_controller/referController');

const checkLogin = require('../../middlewares/authCheck');

rerferRoute.get('/referPage',checkLogin,referPage);


module.exports = rerferRoute;