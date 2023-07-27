import {Router} from "express"
import AdminControllers from "../controllers/adminController.js";
import CustomerControllers from "../controllers/customerControllers.js";
import  protectAdmin  from "../middlewares/authAdminMiddleware.js";
const router = Router()

//Routes for Admin Account Operations
router.post("/register",AdminControllers.registerAdmin)
router.post("/login", AdminControllers.authAdmin);
router.get("/view",protectAdmin, AdminControllers.getAdminProfile);
router.put("/edit",protectAdmin, AdminControllers.updateAdminProfile);

// Routes for Customer account operations admin end
router.get("/customer/profile/view/:id",protectAdmin, CustomerControllers.getCustomerProfileById)
router.delete("/customer/profile/delete/:id",protectAdmin, CustomerControllers.deleteCustomerProfileById);
router.put("/customer/profile/edit/:id",protectAdmin, CustomerControllers.updateCustomerProfileById);
router.get("/customers",protectAdmin, CustomerControllers.getCustomers);

export default router;
