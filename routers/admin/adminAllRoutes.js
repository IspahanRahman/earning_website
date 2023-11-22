const express = require('express');
const adminRoute = express.Router();

const loginRoute = require('./loginRoute');
const websiteInfoRoute = require('./websiteInfoRoute');
const planRoute = require('./planRoute');
const taskRoute = require('./taskRoute');
const paymentMethodRoute = require('./paymentMethodRoute');
const paymentTypeRoute = require('./paymentTypeRoute');
const noticeRoute = require('./noticeRoute');
const referSettingsRoute = require('./referSettingsRoute');


const admin = require('../../middlewares/admin');


adminRoute.use(loginRoute);
adminRoute.use(websiteInfoRoute);
adminRoute.use(planRoute);
adminRoute.use(taskRoute);
adminRoute.use(paymentMethodRoute);
adminRoute.use(paymentTypeRoute);
adminRoute.use(noticeRoute);
adminRoute.use(referSettingsRoute);

module.exports = adminRoute;