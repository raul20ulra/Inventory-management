
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
     * Método para crear un product
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    createProduct: async (req:Request, res:Response) => {
        try {
            const { name, description, amount,price,category,img } = req.body;
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
              img,
            });
            const savedProduct = await product.save();
            return res.json(savedProduct);
          } catch (error) {
            return handlerError(res, 500, errorConstants.serverError);
          }
    },  
    listAllProduct: async (req:Request, res:Response) => {
      try {
        
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    },
    updateProduct: async (req:Request, res:Response) => {
      try {
        
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    },
        /**
     * Método para listar productos por categoria
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
        listCategory: async (req:Request, res:Response) => {
          try {
          const { idCategory } = req.params;
          if(!validateMongoId(idCategory)) return handlerError(res, 400, errorConstants.invalidToken);
          // validar que exista esa category
          const category = await Category.findById(idCategory);
          if(!category) return handlerError(res, 404, errorConstants.categoryNotFound);
          const optionsPagination: any = {
            page: req.query.page || 1,
            sort: req.query.sort || '-createdAt',
            limit: req.query.limit || 25,
            populate: [

              {
                path: 'category',
                model: Category,
              }
            ],
    
          }
          const coupons = await Product.paginate({ category: idCategory}, optionsPagination )
          if (coupons.totalDocs != 0)  return res.status(200).send(coupons); 
          else {
           return handlerError(res, 400, errorConstants.productnotFound)
           }
          } catch (error) {
            return handlerError(res, 500, errorConstants.serverError)
          }
    
        },
        searchInput: async (req: Request, res: Response) =>{
          try {
            // buscar por categorias / tipos / regexInput
            const { input, categoryId} = req.body;
            // retonar {} si esta vacio el input o retorna el fragmento de codigo para complementar
            const matchInput = filterInputRegex(input);
            // si se quiere filtrar por caregoria se valida que sea un object id valido
            if(categoryId && !validateMongoId(categoryId)) return handlerError(res, 400, errorConstants.requiredInput);
            if(!categoryId && !input ) return handlerError(res, 400, errorConstants.oneIsRequired)
            // querys que pueden hacer efecto en esta consulta dependiendo de si se mandan los ids o no
            const queryOptionalCategory = filterForId('category', categoryId);
            const coincidences =  Product.aggregate([
              // opcional tambíen
              {
                $match: matchInput
              },
             
              {
                $lookup: {
                  from: 'categorycoupons',
                  localField: 'category',
                  foreignField: '_id',
                  as: 'category',
                }
              },
              {
                $unwind: '$category'
              },
            ])
            const options = {
              page: req.query.page || 1,
              limit: req.query.limit || 25,
              sort: req.query.sort || '-createdAt'
            };
            const coupons = await Product.aggregatePaginate(coincidences, options);
            if(!coupons.totalDocs) return handlerError(res, 404, errorConstants.productnotFound)
            res.json(coupons)
          } catch (error) {
            return handlerError(res, 500, errorConstants.serverError);
          }
        },
  
}


export default productController;