import { createProductService, deleteProductService, getAllProductsService, updateProductService } from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

const extractPublicId = (url) => {
    try {
        if (!url || !url.includes('cloudinary')) return null;
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        const publicIdWithoutExt = filename.split('.')[0];
        const folder = parts[parts.length - 2];
        if (folder && folder !== 'upload' && !folder.startsWith('v')) {
           return `${folder}/${publicIdWithoutExt}`;
        }
        return publicIdWithoutExt;
    } catch (err) {
        return null;
    }
};

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status, message, data
    });
};

export const getAllProducts = async (req, res, next) => {
    try {
        const data = await getAllProductsService();
        handleResponse(res, 200, "Products Fetched", data);
    } catch (error) {
        next(error);
    }
}

export const deleteProductById = async (req, res, next) => {
    try {
        const data = await deleteProductService(req.params.id);
        if (!data) return handleResponse(res, 404, 'No product with this id was found');
        
        // Delete image from cloudinary
        if (data.image_url) {
            const publicId = extractPublicId(data.image_url);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId, (err, result) => {
                    if (err) console.error("Cloudinary delete err:", err);
                });
            }
        }
        
        handleResponse(res, 200, "Product deleted", data);
    } catch (err) {
        next(err);
    }
}

export const updateProductById = async (req, res, next) => {
    const { title, price, category, condition, description, image_url } = req.body;
    try {
        const data = await updateProductService(req.params.id, title, price, category, condition, description, image_url);
        if (!data) return handleResponse(res, 404, 'No product with this id was found');
        handleResponse(res, 200, "Product updated", data);
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    const { title, price, category, condition, description, image_url, created_by } = req.body;
    try {
        const data = await createProductService(title, price, category, condition, description, image_url, created_by);
        handleResponse(res, 201, "Product created", data);
    } catch (err) {
        next(err);
    }
}

export const deleteImageEndpoint = async (req, res, next) => {
    const { image_url } = req.body;
    try {
        if (!image_url) return handleResponse(res, 400, "image_url is required");
        
        const publicId = extractPublicId(image_url);
        if (!publicId) return handleResponse(res, 400, "Invalid Cloudinary URL");
        
        await cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) console.error("Cloudinary delete err:", err);
        });
        handleResponse(res, 200, "Image deleted from Cloudinary", null);
    } catch (err) {
        next(err);
    }
};
