var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            
            
        }, 
        name: String,
        displayPic: [ ],
    },
    created:  {type: Date, default: Date.now}
});



module.exports = mongoose.model('Blog', blogSchema);