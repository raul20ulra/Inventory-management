import { Router } from "express";
import productController from "../controllers/product.controller";



const productRoutes = Router()

productRoutes.post('/create', productController.createProduct);
productRoutes.get('/list', productController.listAllCategories);



export default productRoutes