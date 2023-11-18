const express = require('express');

const paymentTypeRoute = express.Router();

const { payment_types,payment_type_add, payment_type_add_post,payment_type_update,payment_type_update_post,payment_type_delete } = require('../../controllers/admin_controller/paymentTypeController');
const admin = require('../../middlewares/admin');

paymentTypeRoute.get('/payment_types',admin,payment_types);
paymentTypeRoute.get('/payment_type_add',admin,payment_type_add);
paymentTypeRoute.post('/payment_type_add_post',admin,payment_type_add_post);
paymentTypeRoute.get('/type_update',admin,payment_type_update);
paymentTypeRoute.post('/payment_type_update_post',admin,payment_type_update_post);
paymentTypeRoute.get('/type_delete',admin,payment_type_delete);




module.exports = paymentTypeRoute

