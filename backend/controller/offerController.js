import asyncHandler from "../middlewares/asyncHandler.js";
import Offer from "../models/offerModel.js";

const createOffer = asyncHandler(async(req, res)=> {
    const {offerName, offerDiscount, status} = req.body;

    try {
        const offer = await Offer.findOne({offerName});
        if(offer) {
            res.status(400);
            throw new Error('Offer already exist, update offer instead')
        } else {
            const newOffer = new Offer ({
                offerName, offerDiscount, status
            });

            const createdOffer = await newOffer.save();
            res.status(200).json(createdOffer)
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Unable to create offer, try again')
    }
});

const updateOffer = asyncHandler(async(req, res)=> {
    const {offerName, offerDiscount, status} = req.body;
    const offerId = req.params.id;
    try {
        const offer = await Offer.findById(offerId);
        if(!offer) {
            res.status(404)
            throw new Error('Offer doesnt exists')
        } else {
            offer.offerName = offerName;
            offer.offerDiscount = offerDiscount;
            offer.status = status;

            const updatedOffer = await offer.save();
            res.status(200).json(updatedOffer)
        }
    } catch (error) {
        console.log(error);
        res.status(400)
            throw new Error('Unable to update offer, try again')
    }
})

const deleteOffer = asyncHandler(async(req, res)=> {
    const offerId = req.params.id;
    try {
        const offer = await Offer.findById(offerId);
        if(!offer) {
            res.status(404)
            throw new Error('Offer doesnt exists')
        } else {
            await Offer.deleteOne({_id: offer._id});
            res.status(200).json({message: 'Offer deleted successfully'})
        }
    } catch (error) {
        console.log(error);
        res.status(400)
            throw new Error('Unable to delete offer, try again')
    }
})

const getAllOffers = asyncHandler(async(req,res)=> {
    try {
        const allOffers = await Offer.find();
        res.status(200).json(allOffers)
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error('Can not find any offers!')
    }
})

export {createOffer, updateOffer, deleteOffer, getAllOffers};