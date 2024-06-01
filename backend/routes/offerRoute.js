import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createOffer, deleteOffer, getAllOffers, updateOffer } from "../controller/offerController.js";
const router = express.Router();

router.get("/allOffers", protect, admin, getAllOffers);

router.post("/createOffer",protect, admin, createOffer);

router.put("/updateOffer/:id",protect, admin, updateOffer);

router.delete("/:id",protect, admin, deleteOffer);

export default router;