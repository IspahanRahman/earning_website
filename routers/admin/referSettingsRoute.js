const express = require('express');

const referSettingsRoute = express.Router();

const { refer_settings, refer_setting_add,refer_setting_add_post ,refer_setting_update,refer_setting_update_post,refer_setting_delete } = require('../../controllers/admin_controller/referSettingsController');

const admin = require('../../middlewares/admin');

referSettingsRoute.get('/refer_settings',admin,refer_settings);
referSettingsRoute.get('/refer_setting_add',admin,refer_setting_add);
referSettingsRoute.post('/refer_setting_add_post',admin,refer_setting_add_post);
referSettingsRoute.get('/refer_setting_update',admin,refer_setting_update);
referSettingsRoute.post('/refer_setting_update_post',admin,refer_setting_update_post);
referSettingsRoute.get('/refer_setting_delete',admin,refer_setting_delete);


module.exports = referSettingsRoute

