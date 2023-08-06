const mongoose=require("mongoose");

const youtuberSchema = new mongoose.Schema({
    category: String,
    name: String,
    birthday: String,
    totalViews: String,
    link: String,
  });
  
const Youtuber = mongoose.model('Youtuber', youtuberSchema);

module.exports=Youtuber;