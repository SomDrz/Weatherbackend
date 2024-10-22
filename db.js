const mongoose = require('mongoose');


const ConnectionDbs =()=>{
    mongoose.connect('mongodb+srv://user:Subsomdorjebine@blogweb.eik9j.mongodb.net/BLOG?retryWrites=true&w=majority')
.then(console.log("Connected to MongoDB Cloud"))
  .catch((err) => console.log(err));

}
module.exports = {ConnectionDbs}