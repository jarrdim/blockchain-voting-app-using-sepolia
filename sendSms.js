require('dotenv').config(); 

const ACCOUNT_SID = process.env.ACCOUNT_SID;// Get API URL from environment variables
const AUTH_TOKEN= process.env.AUTH_TOKEN; // Get private key from environment variables

const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async(body)=>
{
    let msgOptions = {
        from: process.env.TWILO_FROM_NUMBER,
        to: process.env.TO_NUMBER,

        body
    }
    try{
       const message = await client.messages.create(msgOptions);
       console.log(message);
       if (message.status === "sent") {
        console.log("SMS sent successfully.");
      } else {
        console.log("Failed to send SMS. Status:", message.status);
      }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { sendSMS };


//sendSMS("hello its jack guru")
