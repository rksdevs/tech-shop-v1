import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    offerName: {
        type: String,
        required: true,
    },
    offerDiscount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
        default: 'Inactive'
    }
})

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;