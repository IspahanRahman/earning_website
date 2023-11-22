const express = require('express');
const apiRoute = express.Router();

const userRoute = require('./userRoute');
// const websiteInfoRoute = require('./websiteInfoRoute');
// const planRoute = require('./planRoute');
// const taskRoute = require('./taskRoute');
// const paymentMethodRoute = require('./paymentMethodRoute');
// const paymentTypeRoute = require('./paymentTypeRoute');
// const noticeRoute = require('./noticeRoute');
// const referSettingsRoute = require('./referSettingsRoute');


const admin = require('../../middlewares/admin');


apiRoute.use(userRoute);
// apiRoute.use(websiteInfoRoute);
// apiRoute.use(planRoute);
// apiRoute.use(taskRoute);
// apiRoute.use(paymentMethodRoute);
// apiRoute.use(paymentTypeRoute);
// apiRoute.use(noticeRoute);
// apiRoute.use(referSettingsRoute);

module.exports = apiRoute;