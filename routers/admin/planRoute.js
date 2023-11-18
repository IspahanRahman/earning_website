const express = require("express");

const planRoute = express.Router();

const {
  plan_list,
  plan_add,
  plan_add_post,
  plan_update,
  plan_update_post,
  plan_delete
} = require("../../controllers/admin_controller/planController");
const admin = require("../../middlewares/admin");

planRoute.get("/plan_list", admin, plan_list);
planRoute.get("/plan_add", admin, plan_add);
planRoute.post('/plan_add_post',admin,plan_add_post);
planRoute.get("/plan_update", admin, plan_update);
planRoute.post('/plan_update_post',admin,plan_update_post);
planRoute.get("/plan_delete", admin, plan_delete);

module.exports = planRoute;
