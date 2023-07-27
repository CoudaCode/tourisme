import express from "express";
import Admin from "./../models/adminModel.js";
import { generateToken } from "../utils/token.js";
import { hash, compareHash } from "./../utils/hash.js";
class AdminControllers {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   *
   */
  // register admin as a admin
  static async registerAdmin(req, res, next) {
    try {
      const { email, password, pic, ...body } = req.body;

      const adminExists = await Admin.findOne({ email });

      if (adminExists) {
        res.status(400);
        throw new Error("Admin Profile Exists !");
      }

      const admin = new Admin({
        email,
        password: await hash(password),
        pic,
        ...body,
      });
      await admin.save();
      console.log(admin._id)
      if (admin) {
        res.status(201).json({
          _id: admin._id,
          token: generateToken({_id:admin._id}),
          ...admin.toObject(),
        });
      } else {
        res.status(400);
        throw new Error("Admin Registration Failed !");
      }
    } catch (e) {
      res.status(500).json({ message: e.message }); // eslint-disable-line
    }
  }
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   *
   */
  // register admin as a admin
  static async authAdmin(req, res, next) {
    const {email, password} = req.body
    try {
      const admin = await Admin.findOne({ email });

      if (admin && (await compareHash(password, admin.password))) {
        // l'utilisateur est connecté
        res.cookie('token', generateToken(admin.toObject()));
        return res.status(200).json({
          status: true,
          admin,
        });
      }
      res.status(401).json({ status: false, message: 'identifiant invalide' });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   *
   */
  static async getAdminProfile(req, res, next) {
    try {

      const admin = await Admin.findById(req.admin._id);
      console.log(req.admin)
      if (admin) {
        res.status(201).json(admin);
      } else {
        res.status(400);
        throw new Error("Admin Not Found !");
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   *
   */
  static async updateAdminProfile(req, res, next) {
    const { _id } = req.admin;

    try {
      const admin = await Admin.findById(_id);
      const {name, telephone, address, pic, password,email,...body } = req.body
      
      if (admin) {
        admin.name = name || admin.name;
        admin.telephone = telephone || admin.telephone;
        admin.address = address || admin.address;
        admin.email = email || admin.email;
        admin.pic = pic || admin.pic;
        if (password) {
          admin.password = await hash(password);
        }
        const updatedAdmin = await admin.save();
    
        res.json({
          token: generateToken({_id:updatedAdmin._id}),
          ...updatedAdmin.toObject(),
        });
      } else {
        res.status(404);
        throw new Error("Admin Not Found !");
      }
    
    } catch (e) {
      console.log(e);
      res.json({ status: false, message: e.message });
    }
  }
}

export default AdminControllers;
