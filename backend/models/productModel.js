import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    productDiscount: {
        type: Number,
        required: true,
        default: 0
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        default: 0
    },
    isOnOffer: {
        type: Boolean,
        required: true,
        default: false
    },
    offerName: {
        type: String,
    },
    compatibilityDetails: {
        socketType: {type:String},
        powerConsumption: {type:String},
        chipsetModel: {type:String},
        formFactor: {type:String},
        memorySlots: {type:String},
        expansionSlots: {type:String},
        storageInterface: {type:String},
        formFactor: {type:String},
        ramType: {type:String},
        ramFormFactor: {type:String},
        storageInterface: {type:String},
        wattage: {type:String},
        networkCardInterfaces: {type:String}
    }
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema);

export default Product;