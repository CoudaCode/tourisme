import express from "express";
import Room from "../models/roomModel";
import hotel from "../models/hotelModel";
class RoomController {
  /**
   * @param {express.Response} res
   * @param {express.Request} req
   * @param {express.NextFunction} next
   */
  static async createRoom(req, res, next) {
    try {
      const { _id } = req.admin;
      const {
        admin,
        hotel,
        roomType,
        availability,
        beds,
        roomSize,
        roomFacilities,
        bathRoomFacilities,
        price,
        pic,
      } = req.body;
      if (
        !admin ||
        !hotel ||
        !roomType ||
        !availability ||
        !beds ||
        !roomSize ||
        !roomFacilities ||
        !bathRoomFacilities ||
        !price ||
        !pic
      ) {
        res.status(400);
        throw new Error("Please Fill all the feilds");
      } else {
        const room = new Room({
          admin: _id,
          hotel,
          roomType,
          availability,
          beds,
          roomSize,
          roomFacilities,
          bathRoomFacilities,
          price,
          pic,
        });

        const createdRoom = await room.save();

        res.status(201).json({ message: { ...createdRoom.toObject() } });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  /**
   * @param {express.Response} res
   * @param {express.Request} req
   * @param {express.NextFunction} next
   */
  static async updateRoom(req, res, next) {
    try {
      const {
        roomType,
        availability,
        beds,
        roomSize,
        roomFacilities,
        bathRoomFacilities,
        price,
        pic,
      } = req.body;

      const room = await Room.findById(req.params.id);

      if (room) {
        room.roomType = roomType;
        room.availability = availability;
        room.beds = beds;
        room.roomSize = roomSize;
        room.roomFacilities = roomFacilities;
        room.bathRoomFacilities = bathRoomFacilities;
        room.price = price;
        room.pic = pic;
        const updatedRoom = await room.save();
        res.status(200).json({ message: { ...updatedRoom.toObject() } });
      } else {
        res.status(404);
        throw new Error("Room not found");
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  /**
   * @param {express.Response} res
   * @param {express.Request} req
   * @param {express.NextFunction} next
   */
  static async deleteRoom(req, res, next) {
    try {
      const room = await Room.findById(req.params.id);

      if (room) {
        await room.deleteOne();
        res.json({ message: "Room  Removed" });
      } else {
        res.status(404);
        throw new Error("Room  not Found");
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  /**
   * @param {express.Response} res
   * @param {express.Request} req
   * @param {express.NextFunction} next
   */
  static async getRoomById(req, res, next) {
    try {
      const room = await Room.findById(req.params.id);

      if (room) {
        res.json(room);
      } else {
        res.status(404).json({ message: "Room not found" });
      }
    } catch (e) {
		res.status(500).json({ message: e.message });
	  }
  }
  /**
   * @param {express.Response} res
   * @param {express.Request} req
   * @param {express.NextFunction} next
   */
   static async getRooms(req,res,next){
	  try{
		const rooms = await Room.find({ hotel: req.params.id });
          if(rooms){
			res.status(200).json(rooms);
		  }

		  res.status(400).json({message:'Non trouvé'})
	  }catch (e) {
		res.status(500).json({ message: e.message });
	  }
   }
  /**
   * @param {express.Response} res
   * @param {express.Request} req
   * @param {express.NextFunction} next
   */
}

export default RoomController;

// const getRooms = asyncHandler(async (req, res) => {
//   const rooms = await Room.find({ hotel: req.params.id });
//   res.json(rooms);
// });

// const createRoom = asyncHandler(async (req, res) => {
//   const {
//     admin,
//     hotel,
//     roomType,
//     availability,
//     beds,
//     roomSize,
//     roomFacilities,
//     bathRoomFacilities,
//     price,
//     pic,
//   } = req.body;
//   if (
//     !admin ||
//     !hotel ||
//     !roomType ||
//     !availability ||
//     !beds ||
//     !roomSize ||
//     !roomFacilities ||
//     !bathRoomFacilities ||
//     !price ||
//     !pic
//   ) {
//     res.status(400);
//     throw new Error("Please Fill all the feilds");
//   } else {
//     const room = new Room({
//       admin,
//       hotel,
//       roomType,
//       availability,
//       beds,
//       roomSize,
//       roomFacilities,
//       bathRoomFacilities,
//       price,
//       pic,
//     });

//     const createdRoom = await room.save();

//     res.status(201).json(createdRoom);
//   }
// });

// const getRoomById = asyncHandler(async (req, res) => {
//   const room = await Room.findById(req.params.id);

//   if (room) {
//     res.json(room);
//   } else {
//     res.status(404).json({ message: "Room not found" });
//   }
// });

// const updateRoom = asyncHandler(async (req, res) => {
//   const {
//     roomType,
//     availability,
//     beds,
//     roomSize,
//     roomFacilities,
//     bathRoomFacilities,
//     price,
//     pic,
//   } = req.body;

//   const room = await Room.findById(req.params.id);

//   if (room) {
//     room.roomType = roomType;
//     room.availability = availability;
//     room.beds = beds;
//     room.roomSize = roomSize;
//     room.roomFacilities = roomFacilities;
//     room.bathRoomFacilities = bathRoomFacilities;
//     room.price = price;
//     room.pic = pic;

//     const updatedRoom = await room.save();
//     res.json(updatedRoom);
//   } else {
//     res.status(404);
//     throw new Error("Room not found");
//   }
// });

// const deleteRoom = asyncHandler(async (req, res) => {
//   const room = await Room.findById(req.params.id);

//   if (room) {
//     await room.deleteOne();
//     res.json({ message: "Room  Removed" });
//   } else {
//     res.status(404);
//     throw new Error("Room  not Found");
//   }
// });

// module.exports = {
//   getRooms,
//   createRoom,
//   getRoomById,
//   updateRoom,
//   deleteRoom,
// };
