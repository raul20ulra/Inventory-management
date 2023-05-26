
import { Request, Response } from "express";
import mongoose from 'mongoose';
import { handlerError } from "../handlers/handler.error";
import { errorConstants } from "../constants/error.constants";
import Category from "../models/category.model";
import googleVerify from "../helpers/google.verifyToken";
import User from "../models/user.model";
import generateJwt from "../helpers/generateJWT";
import validateMongoId from "../helpers/validateIdMongo";
import Product from "../models/product.model";
import { filterForId, filterInputRegex } from "../helpers/query";


const productController= {
     /**
     * Método para crear un cupon a una compañia de la cuponera
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    createProduct: async (req:Request, res:Response) => {
        try {
            const { name, description, category,price,amount,img } = req.body;
            const { /**ID DEL USUARIO */ } = req.params;
            // validar que sean MongoId Validos!
            if( !validateMongoId(category)) return handlerError(res, 400, errorConstants.idInvalid);
            // validar demas campos
            if(!name) return handlerError(res, 400, errorConstants.nameRequired);
            if(!description) return handlerError(res, 400, errorConstants.descriptionRequired);
            // Validar que el category exista en CategoryCoupon
            const categoryCoupon = await Category.findById(category);
            if (!categoryCoupon) return handlerError(res, 400, errorConstants.categoryNotFound);
            const product = new Product({
              name,
              description,
              price,
              amount,
              img 
            });
            const savedProduct = await product.save();
            return res.json(savedProduct);
          } catch (error) {
            return handlerError(res, 500, errorConstants.serverError);
          }
    },  
    listAllCategories: async (req:Request, res:Response) => {
      try {
        
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    }
}


export default productController;