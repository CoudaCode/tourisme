import { Router } from "express";
// const { getRooms, createRoom, getRoomById, updateRoom, deleteRoom } 
import RoomController from "../controllers/roomController"
// const {
// 	getReservations,
// 	addReservation,
// 	updateReservation,
// 	deleteReservation,
// 	getTotal,
// } = require("../controllers/reservationController");
// const { protectAdmin } = require("../middleware/authAdminMiddleware");
import protectAdmin from "../middlewares/authAdminMiddleware.js";
const router = Router();

router.post("/create",protectAdmin, RoomController.createRoom);
router.get("/get-rooms/:id",protectAdmin, RoomController.getRooms);
router.get("/:id",protectAdmin, RoomController.getRoomById)
router.put("/:id",protectAdmin, RoomController.updateRoom);
router.delete("/delete/:id", protectAdmin, RoomController.deleteRoom);

router.get("/rooms/:id",RoomController.getRooms);

router.post("/reservation/create", RoomController.addReservation);
router.get("/reservation/get/:id",RoomController.getReservations);
router.get("/reservation/get/total/:id", RoomController.getTotal);
router.put("/reservation/update/:id", RoomController.updateReservation);
router.delete("/reservation/delete/:id",RoomController.deleteReservation);

export default router;
