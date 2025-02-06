const Listing = require('../models/listing')


const index = async (req, res) => {

    try {
        const listings = await Listing.find().populate('owner')
        console.log(listings);
        res.render('listings/index.ejs', {
            title: "Listings",
            listings
        });
    } catch (err) {
        console.log(err);
        res.redirect('/')
    }
}
const newListing =  async (req,res) => {
res.render('listings/new.ejs',{

    title:"New Listing",
})


}
const createListing = async (req,res) => {
try{
    req.body.owner=req.session.user._id
    await Listing.create(req.body)
    res.redirect('/listings')

}catch(err) {

    console.log(err);
}



}

const show = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId).populate('owner')
        
        const userHasFavourited = listing.favouritedByUsers.some((user) => user.equals(req.session.user._id))

        res.render('listings/show.ejs', {
            title: listing.streetAddress,
            listing,
            userHasFavourited
        })
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}
const deleteListing = async (req,res) => {
try {
const listing= await Listing.findById(req.params.listingId)
if (listing.owner.equals(req.params.userId)) {

await listing.deleteOne()
res.redirect('/listings')


} else {
    res.send('You dont have permission to do that') 
}

} catch (error) {

    console.log(error);
    res.redirect('/')
}


}
const edit = async (req,res) => {
try{
    const listing =await  Listing.findById(req.params.listingId).populate('owner')

    if(listing.owner.equals(req.params.userId)){
    res.render('listings/edit.ejs',{
title:`Editing ${listing.streetAddress}`,
listing,
    })
} else {res.send('You dont have permission to do that')}

} catch (err) {

console.log(err);
res.redirect('/')

}



}
const update = async (req,res) => {
try {



    const listing = await Listing.findByIdAndUpdate(

req.params.listingId,
req.body,
{new: true}
)
res.redirect(`/listings/${req.params.listingId}`)

 }
catch (err) {
console.log(err);
res.redirect('/')
}


}
const addFavourtie = async (req,res) => {
try{
const listing= await Listing.findByIdAndUpdate(req.params.listingId, 
    
    {$push:{favouritedByUsers: req.params.userId}})

}catch(err) {
console.log(err);
res.redirect("/")
}


}
const removeFavourite = async (req,res) => {
    try{
        const listing= await Listing.findByIdAndUpdate(req.params.listingId, 
            
            {$pull:{favouritedByUsers: req.params.userId}})
        
        }catch(err) {
        console.log(err);
        res.redirect("/")
        }
        



}

module.exports = {
    index,
newListing,
createListing,
show,
deleteListing,
edit,
update,
addFavourtie,
removeFavourite
}

