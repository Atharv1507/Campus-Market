import { createProductService, deleteProductService, getAllProductsService, updateProductService } from "../models/productModel.js";

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
