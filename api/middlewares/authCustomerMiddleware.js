import { verifyToken } from "../utils/token.js";
import express from "express"
// import asyncHandler = require("express-async-handler");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const protectCustomer = async (req, res, next) => {
	
	const token = req.cookies.token;
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    req.customer = verifiedToken;
  } else {
    return res.redirect('/login');
  }
  next();
};
export default protectCustomer