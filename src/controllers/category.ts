import { Request, Response } from "express";
import { handlerError } from "../handlers/handler.error";
import { errorConstants } from "../constants/error.constants";
import Category from "../models/category.model";


const categoryController = {

    /**
     * Método para crear una categoria para los productos
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    createCategory: async (req:Request, res:Response) => {
        try {
          const { name } = req.body;
          // Validar que el nombre esté presente
          if (!name)  return handlerError(res, 400, errorConstants.nameRequired);
          // Verificar si la categoria ya existe
          const existingCategory = await Category.findOne({ name });
          if (existingCategory) return handlerError(res, 400, errorConstants.categoryAlreadyExist);
          const category = new Category({
            name
          });
          const savedCategory = await category.save();
          return res.json(savedCategory);
        } catch (err) {
          return handlerError(res, 500, errorConstants.serverError);
        }
      },

       /**
     * Método para listar todas las categorias
        * @param {Request} req
        * @param {Response} res
        * @returns {Promise<Response>}
     */
    listAllCategories: async (req:Request, res:Response) => {
      try {
        const categoriesFounds = await Category.find({});
        res.json(categoriesFounds);
      } catch (error) {
        return handlerError(res, 500, errorConstants.serverError);
      }
    
    },

}

export default categoryController;
