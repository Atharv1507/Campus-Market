import express from "express"
import { createAd, deleteAdById, getAllAds, updateAdById } from "../controller/adsController"

const router=express.Router()

router.post('/ads',createAd)
router.get('/ads',getAllAds)
router.delete('/ads:id',deleteAdById)
router.put('/ads:id',updateAdById)