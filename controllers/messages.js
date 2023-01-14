import {Message} from "../models/message.js"

function newMessage(req, res){
  console.log("messages are being created!")
}

export {
  newMessage as new,
}