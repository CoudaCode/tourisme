import { Router } from "express";
import protectAdmin from "../middlewares/authAdminMiddleware.js";
// const {
// 	gethotels,
// 	addHotel,
// 	updateHotel,
// 	getHotelById,
// 	deleteHotel,
// 	gethotelsByCustomer,
// } = require("../controllers/hotelController");
// const { protectAdmin } = require("../middleware/authAdminMiddleware");
// const router = express.Router();
import hotelController from "../controllers/hotelController.js";
const router = Router()
router.post("/create",protectAdmin, hotelController.addHotel);
//get hotels all by admin
router.get("/all/:id",protectAdmin, hotelController.gethotels);

//get hotel by id
router.get("/byId/:id",protectAdmin, hotelController.getHotelById)

router.put("/update/:id",protectAdmin, hotelController.updateHotel);

router.delete("/:id",protectAdmin, hotelController.deleteHotel);


router.get("/byCustomer",hotelController.gethotelsByCustomer);
router.get("/:id",hotelController.getHotelById);

export default router;
