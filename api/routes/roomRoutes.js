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

router.route("/room/create").post(protectAdmin, createRoom);
router.route("/get-rooms/:id").get(protectAdmin, getRooms);
router.route("/room/:id").get(protectAdmin, getRoomById).put(protectAdmin, updateRoom);
router.route("/room/delete/:id").delete(protectAdmin, deleteRoom);

router.route("/rooms/:id").get(getRooms);

router.route("/reservation/create").post(addReservation);
router.route("/reservation/get/:id").get(getReservations);
router.route("/reservation/get/total/:id").get(getTotal);
router.route("/reservation/update/:id").put(updateReservation);
router.route("/reservation/delete/:id").delete(deleteReservation);

module.exports = router;
