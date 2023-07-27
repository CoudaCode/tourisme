import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { inProduction } from "./config/env.js";
import { fileURLToPath } from "url";
import path from "path";
import { connectDB } from "./config/db.js";
import AdminRouter from "./routes/adminRoutes.js";
import CustomerRouter from "./routes/customerRoutes.js";
import HotelRouter from "./routes/hotelRoutes.js"
import roomRouter from "./routes/roomRoutes.js"
import cookieParser from "cookie-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config({
  path: path.join(process.cwd(), ".env.local"),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../dist")));
app.use("Image", express.static(path.join(__dirname, "../Image")));


app.use("/api/admin", AdminRouter);
app.use("/api/Customer", CustomerRouter);
app.use("/api/hotel", HotelRouter);
app.use("/api/Room", roomRouter);
// app.use('/api/post', postRouter);
// app.use('/api/comment', commentRouter);
// MONGO_URI= ""
// JWT_SECRET= "is_it_my_cle123"
if (inProduction) {
  app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((e) => {
    console.log(
      "An orror has occured while connecting to mongodb : ",
      e.message
    );
  });
