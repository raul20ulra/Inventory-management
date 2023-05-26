import { Router } from "express";
import productController from "../controllers/product.controller";



const productRoutes = Router()

productRoutes.post('/create', productController.createProduct);
productRoutes.get('/list', productController.listProduct);
productRoutes.get('/update', productController.updateProduct);
productRoutes.get('/delete', productController.deleteProduct);
productRoutes.post('/search', productController.searchInput);



export default productRoutes