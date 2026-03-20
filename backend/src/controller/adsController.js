import { createAdsService, deleteAdsService, getAllAdsService, updateAdsService } from "../models/adsModel.js";

const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,message,data
    });
};

export const getAllAds=async (req,res,next)=>{
    try{
        const data=await getAllAdsService()
        handleResponse(res,200,"Ads Fetched",data)
    }
    catch(error){
        next(error)
    }

}
export const deleteAdById=async (req,res,next)=>{
    
    try{
        const data=await deleteAdsService(req.params.id)
        if(!data) return handleResponse(res,404,'No ad with this id was found')
        handleResponse(res,200 ,"Ad deleted",data)
    }
    catch(err){
        next(err)
    }

}
export const updateAdById=async (req,res,next)=>{
    const{title,budget,description,urgency}=req.body
    try{
        const data=await updateAdsService(req.params.id,title,budget,description,urgency)
        if(!data) return handleResponse(res,404,'No ad with this id was found')
        handleResponse(res,200 ,"Ad updated",data)

    }
    catch(err){
        next(err)
    }
}
export const createAd=async (req,res,next)=>{
    const{title,budget,description,created_by,urgency}=req.body
    try{
        const data=await createAdsService(title,budget,description,created_by,urgency)
        handleResponse(res,200 ,"Ad created",data)
    }
    catch(err){
        next(err)
    }
}
