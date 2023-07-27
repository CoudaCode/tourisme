import { verifyToken } from "../utils/token.js";
import express from "express"
// import asyncHandler = require("express-async-handler");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const protectAdmin = async (req, res, next) => {
	
	const token = req.cookies.token;
  console.log('token', token)
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    req.admin = verifiedToken;
  } else {
    return res.redirect('/login');
  }
  next();
};
export default protectAdmin