const express = require('express');
const apiRoute = express.Router();

const userRoute = require('./userRoute');
const websiteInfoRoute = require('./websiteInfoRoute');
const referRoute = require('./referRoute');
const investmentRoute = require('./investmentRoute');
// const taskRoute = require('./taskRoute');
// const paymentMethodRoute = require('./paymentMethodRoute');
// const paymentTypeRoute = require('./paymentTypeRoute');
// const noticeRoute = require('./noticeRoute');
// const referSettingsRoute = require('./referSettingsRoute');


const admin = require('../../middlewares/admin');


apiRoute.use(userRoute);
apiRoute.use(websiteInfoRoute);
apiRoute.use(referRoute);
apiRoute.use(investmentRoute);
// apiRoute.use(planRoute);
// apiRoute.use(taskRoute);
// apiRoute.use(paymentMethodRoute);
// apiRoute.use(paymentTypeRoute);
// apiRoute.use(noticeRoute);
// apiRoute.use(referSettingsRoute);

module.exports = apiRoute;