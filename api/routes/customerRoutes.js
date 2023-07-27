// const express = require("express");
// const {
// 	registerCustomer,
// 	authCustomer,
// 	getCustomerProfile,
// 	updateCustomerProfile,
// 	deleteCustomerProfile,
// } = require("../controllers/customerController");
// const { protectCustomer } = require("../middleware/authCustomerMiddleware");
// const router = express.Router();
import {Router} from "express"
import CustomerControllers from "../controllers/customerControllers.js";
import  protectCustomer  from "../middlewares/authCustomerMiddleware.js";
const router = Router()

//Routes for Customer Account Operations 
router.post("/register",CustomerControllers.registerCustomer);
router.post("/login",CustomerControllers.authCustomer);
router.get("/view",protectCustomer, CustomerControllers.getCustomerProfile);
router.put("/edit",protectCustomer, CustomerControllers.updateCustomerProfile);
router.delete("/delete",protectCustomer, CustomerControllers.deleteCustomerProfile);

export default router;
