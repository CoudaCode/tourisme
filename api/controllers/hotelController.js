// const Hotel = require("../models/hotelModel");
// const asyncHandler = require("express-async-handler");

import express from "express";
import Hotel from "./../models/hotelModel.js";
import { generateToken } from "./../utils/token.js";
import { hash, compareHash } from "./../utils/hash.js";

class hotelController {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async addHotel(req, res, next) {
    try {
      const { _id } = req.admin;
      console.log('is', _id)
      const {
        admin,
        hotelName,
        address,
        location,
        description,
        facilities,
        rules,
        pic,
      } = req.body;

      if (
        !hotelName ||
        !address ||
        !location ||
        !description ||
        !facilities ||
        !rules ||
        !pic
      ) {
        res.status(400);
        throw new Error("Failed adding hotel");
      } else {
        const hotel = new Hotel({
          admin: _id,
          hotelName,
          address,
          location,
          description,
          facilities,
          rules,
          pic,
        });

        const createdHotel = await hotel.save();

        res.status(201).json({ message: { ...createdHotel.toObject() } });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async updateHotel(req, res, next) {
    try {
      const {
        hotelName,
        address,
        location,
        description,
        facilities,
        rules,
        pic,
      } = req.body;

      const hotel = await Hotel.findById(req.params.id);
       console.log('hotel', hotel)
      if (hotel) {
        hotel.hotelName = hotel.hotelName || hotelName;
        hotel.address =  hotel.address || address;
        hotel.location = hotel.location || location;
        hotel.description = hotel.description || description ;
        hotel.facilities =  hotel.facilities || facilities;
        hotel.rules = hotel.rules || rules;
        hotel.pic = hotel.rules || pic;
        const updatedHotel = await hotel.save();
        res.status(200).json({ message: { ...updatedHotel.toObject() } });
      } else {
        res.status(404);
        throw new Error("Hotel not found");
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async deleteHotel(req, res, next) {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (hotel) {
        await hotel.deleteOne();
        res.json({ message: "Item Removed" });
      } else {
        res.status(404);
        throw new Error("Item not Found");
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static async gethotels(req, res, next) {
    try {
      const items = await Hotel.find({ admin: req.params.id });
      res.status(400).json(items);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async getHotelById(req, res, next) {
    try {
      const hotel = await Hotel.findById(req.params.id);

      if (hotel) {
        res.json({hotel: hotel});
      } else {
        res.status(404).json({ message: "Hotel not found" });
      }
    } catch (e) {
		res.status(400).json({message:e.message})
	}
  }
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async gethotelsByCustomer(req,res,next){
	   try {
		const items = await Hotel.find();
		if(!items){
			res.status(400).json({message: "Not Found"})
		}
        res.status(200).json(items);
	   } catch (e) {
		res.status(500).json({message:e.message})
	   }
  }
}
export default hotelController;
// const addHotel = asyncHandler(async (req, res) => {
//   const {
//     admin,
//     hotelName,
//     address,
//     location,
//     description,
//     facilities,
//     rules,
//     pic,
//   } = req.body;

//   if (
//     !admin ||
//     !hotelName ||
//     !address ||
//     !location ||
//     !description ||
//     !facilities ||
//     !rules ||
//     !pic
//   ) {
//     res.status(400);
//     throw new Error("Failed adding hotel");
//   } else {
//     const hotel = new Hotel({
//       admin,
//       hotelName,
//       address,
//       location,
//       description,
//       facilities,
//       rules,
//       pic,
//     });
//     const createdHotel = await hotel.save();
//     res.status(201).json(createdHotel);
//   }
// });
// const gethotels = asyncHandler(async (req, res) => {
//   const items = await Hotel.find({ admin: req.params.id });
//   res.json(items);
// });

// const gethotelsByCustomer = asyncHandler(async (req, res) => {
//   const items = await Hotel.find();
//   res.json(items);
// });

// const updateHotel = asyncHandler(async (req, res) => {
//   const { hotelName, address, location, description, facilities, rules, pic } =
//     req.body;

//   const hotel = await Hotel.findById(req.params.id);

//   if (hotel) {
//     hotel.hotelName = hotelName;
//     hotel.address = address;
//     hotel.location = location;
//     hotel.description = description;
//     hotel.facilities = facilities;
//     hotel.rules = rules;
//     hotel.pic = pic;

//     const updatedHotel = await hotel.save();
//     res.json(updatedHotel);
//   } else {
//     res.status(404);
//     throw new Error("Hotel not found");
//   }
// });

// const getHotelById = asyncHandler(async (req, res) => {
//   const hotel = await Hotel.findById(req.params.id);

//   if (hotel) {
//     res.json(hotel);
//   } else {
//     res.status(404).json({ message: "Hotel not found" });
//   }
// });

// const deleteHotel = asyncHandler(async (req, res) => {
//   const hotel = await Hotel.findById(req.params._id);
//   if (hotel) {
//     await hotel.deleteOne();
//     res.json({ message: "Item Removed" });
//   } else {
//     res.status(404);
//     throw new Error("Item not Found");
//   }
// });
// module.exports = {
//   gethotels,
//   addHotel,
//   updateHotel,
//   getHotelById,
//   deleteHotel,
//   gethotelsByCustomer,
// };
