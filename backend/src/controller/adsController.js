import { createAdsService, deleteAdsService, getAllAdsService, updateAdsService } from "../models/adsModel";

const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,message,data
    });
};

export const getAllAds=async (res,req,next)=>{
    try{
        const data=await getAllAdsService()
        handleResponse(res,200,"Ads Fetched",data)
    }
    catch(error){
        next(error)
    }

}
export const deleteAdById=async (res,req,next)=>{
    
    try{
        const data=await deleteAdsService(req.params.id)
        if(!data) return handleResponse(res,404,'No ad with this id was found')
        handleResponse(res,200 ,"Ad deleted",data)
    }
    catch(err){
        next(err)
    }

}
export const updateAdById=async (res,req,next)=>{
    const{title,category,description}=req.body
    try{
        const data=await updateAdsService(req.params.id,title,category,description)
        if(!data) return handleResponse(res,404,'No ad with this id was found')
        handleResponse(res,200 ,"Ad updated",data)

    }
    catch(err){
        next(err)
    }
}
export const createAd=async (res,req,next)=>{
    const{title,category,description,created_by}=req.body
    try{
        const data=await createAdsService(title,category,description,created_by)
        handleResponse(res,200 ,"Ad created",data)
    }
    catch(err){
        next(err)
    }
}
