import dotenv from "dotenv";

dotenv.config();
export default {
  port: process.env.PORT,
  devUrl:process.env.DEVPAYPALURL,
  devUrlV2:process.env.DEVPAYPALURLV2,
  clientID:process.env.DEVCLIENTID,
  secretkey:process.env.DEVSECRETKEY,
};
