const dotenv = require("dotenv");
dotenv.config();
module.exports ={
    verify_token: process.env.VERIFY_TOKEN,
    access_token: process.env.ACCESS_TOKEN,
    port: process.env.PORT,
    server_address: process.env.SERVER_ADDRESS,
    server_port: process.env.SERVER_PORT,
    dest_id: process.env.DEST_ID
}