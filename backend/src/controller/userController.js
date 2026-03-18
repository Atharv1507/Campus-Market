import { createUserService, deleteUserService, getAllUserByIdService, getAllUsersService, updateUserService } from "../models/userModel.js";

//Standardize response function
const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,message,data
    });
};
export const createUser =async (req,res,next)=>{
    const {id,name,email}=req.body
    try{
        const newUser=await createUserService(id,name,email)
        handleResponse(res,201,"User Created" , newUser)
    }

    catch(error){next(error)}
}
export const getAllUsers =async (req,res,next)=>{
    try{
        const users=await getAllUsersService()
        handleResponse(res,200,"Users Fetched" , users)
    }

    catch(error){next(error)}
}
export const getUserById =async (req,res,next)=>{
    try{
        const user=await getAllUserByIdService(req.params.id)
        if(!user) return handleResponse(res,404,"user not found")
        handleResponse(res,200,"Users Fetched success" , user)
    }

    catch(error){next(error)}
}
export const updateUser =async (req,res,next)=>{
    const {name,email}=req.body
    try{
        const Updateduser=await updateUserService(req.params.id,name,email)
        if(!Updateduser) return handleResponse(res,404,"user not found")
        handleResponse(res,200,"Users Updated success" , Updateduser)
    }

    catch(error){next(error)}
}
export const deleteUser =async (req,res,next)=>{
    try{
        const user=await deleteUserService(req.params.id)
        if(!user) return handleResponse(res,404,"user not found")
        handleResponse(res,200,"Users Deleted success", user)
    }

    catch(error){next(error)}
}