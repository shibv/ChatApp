const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        text: { type: String, required: true },
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    
   
}, 
{
    timestamps: true,
  }
  )

module.exports  = moongose.model("Messages", messageSchema);