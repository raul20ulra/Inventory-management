import { Router } from "express";
import productController from "../controllers/product.controller";



const productRoutes = Router()

productRoutes.post('/create', productController.createProduct);
productRoutes.get('/list', productController.listAllProduct);
productRoutes.get('/update', productController.updateProduct);
productRoutes.get('/category/:idCategory', productController.listCategory);
productRoutes.post('/search', productController.searchInput);



export default productRoutes