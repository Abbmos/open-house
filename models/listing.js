const mongoose = require ('mongoose');

const listingSchema = new mongoose.Schema({
streetAddress: {
type:String,
required:true,

},
city: {
type:String,
required:true,


},
price: {
type:Number,
required:true,
min: 0,
},
size: {
type:Number,
require:true,
min:0,

},
imgUrl: {
type:String,
default:"https://static.wikia.nocookie.net/gtawiki/images/e/e2/JohnsonHouse-GTASA-Exterior.jpg",

},

owner: {
type: mongoose.Schema.Types.ObjectId,
ref:"User",

}
}, {timestamps: true});

const Listing = mongoose.model('Listing',listingSchema)

module.exports= Listing