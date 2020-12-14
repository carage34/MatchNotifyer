const dotenv = require("dotenv");
dotenv.config();
module.exports ={
    verify_token: process.env.VERIFY_TOKEN,
    access_token: process.env.ACCESS_TOKEN,
    port: process.env.PORT
}