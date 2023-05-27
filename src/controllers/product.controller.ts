
import { Request, Response } from "express";
import mongoose from 'mongoose';
import { handlerError } from "../handlers/handler.error";
import { errorConstants } from "../constants/error.constants";
import Category from '../models/category.model';
import googleVerify from "../helpers/google.verifyToken";
import User from "../models/user.model";
import generateJwt from "../helpers/generateJWT";
import validateMongoId from "../helpers/validateIdMongo";
import Product from '../models/product.model';
import { filterForId, filterInputRegex } from "../helpers/query";


const productController= {
     /**
     * Método para crear un producto
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    createProduct: async (req:Request, res:Response) => {
        try {
            const { name, category, description, amount,price, img } = req.body;
            // validar que sean MongoId Validos!
            if( !validateMongoId(category)) return handlerError(res, 400, errorConstants.idInvalid);
            // validar demas campos
            if(!name) return handlerError(res, 400, errorConstants.nameRequired);
            if(!description) return handlerError(res, 400, errorConstants.descriptionRequired);
            if(!amount) return handlerError(res, 400, errorConstants.descriptionRequired);
            if(!img) return handlerError(res, 400, errorConstants.descriptionRequired);
            // Validar que el category exista en Category
            const categor = await Category.findById(category);
            if (!categor) return handlerError(res, 400, errorConstants.categoryNotFound);
            const product = new Product({
              name,
              category,
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

     /**
     * Método para en listar los productos
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    listProduct: async (req: Request, res: Response) => {
      try {
        const products = await Product.find();
        return res.json(products);
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    },
  
   /**
     * Método para en listar los productos
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
   listProductsCategory: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (error) {
      return handlerError(res, 500, errorConstants.serverError);
    }
  },
  

     /**
     * Método para actualizar un producto
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
     updateProduct: async (req: Request, res: Response) => {
      try {
        const { name, description, amount, price, category, img } = req.body;
        const { productId } = req.params;
        // validar que sean MongoId válidos
        if (!validateMongoId(category)) return handlerError(res, 400, errorConstants.idInvalid);
        // validar demás campos
        if (!name) return handlerError(res, 400, errorConstants.nameRequired);
        if (!description) return handlerError(res, 400, errorConstants.descriptionRequired);
        // Validar que el producto exista
        const product = await Product.findById(productId);
        if (!product) return handlerError(res, 404, errorConstants.productNotFound);
        // Actualizar los campos
        product.name = name;
        product.description = description;
        product.price = price;
        product.amount = amount;
        product.img = img;
        product.category = category;
        const updatedProduct = await product.save();
        return res.json(updatedProduct);
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    },

     /**
     * Método para eliminar un producto
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    deleteProduct: async (req: Request, res: Response) => {
      try {
        const { productId } = req.params;
        // Validar que el producto exista
        const product = await Product.findById(productId);
        if (!product) return handlerError(res, 404, errorConstants.productNotFound);
        // Eliminar el producto
        await product.remove();
        return res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    },

     /**
     * Método para buscar productos
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
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
        from: 'category',
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
        const product = await Product.aggregatePaginate(coincidences, options);
        if(!product.totalDocs) return handlerError(res, 404, errorConstants.productNotFound)
        res.json(product)
      } catch (error) {
            return handlerError(res, 500, errorConstants.serverError);
          }
  },
  
}


export default productController;