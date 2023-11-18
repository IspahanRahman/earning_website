const express = require('express');
const adminRoute = express.Router();

const loginRoute = require('./loginRoute');
const websiteInfoRoute = require('./websiteInfoRoute');
const planRoute = require('./planRoute');
const taskRoute = require('./taskRoute');
const paymentMethodRoute = require('./paymentMethodRoute');


adminRoute.use(loginRoute);
adminRoute.use(websiteInfoRoute);
adminRoute.use(planRoute);
adminRoute.use(taskRoute);
adminRoute.use(paymentMethodRoute);

module.exports = adminRoute;