const express = require('express');

const investmentRoute = express.Router();

const { investment } = require('../../controllers/api_controller/investmentController');

const checkLogin = require('../../middlewares/authCheck');

investmentRoute.get('/investment',checkLogin,investment);


module.exports = investmentRoute;