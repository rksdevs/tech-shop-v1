import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createOffer, deleteOffer, getAllOffers, updateOffer, updateProductOffer } from "../controller/offerController.js";
const router = express.Router();

router.get("/allOffers", protect, admin, getAllOffers);

router.post("/createOffer",protect, admin, createOffer);

router.post("/applyOffer", protect, admin, updateProductOffer);

router.put("/updateOffer/:id",protect, admin, updateOffer);

// router.post("/cancelOffer/offer/:id", protect, admin, cancelOffer);

router.delete("/:id",protect, admin, deleteOffer);

export default router;