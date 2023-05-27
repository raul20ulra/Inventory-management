import { Router } from "express";
import productController from "../controllers/product.controller";



const productRoutes = Router()

productRoutes.post('/create', productController.createProduct);
productRoutes.get('/list/', productController.listProduct);
productRoutes.get('/category/:idCategory', productController.listProductsCategory);
productRoutes.get('/update/:productId', productController.updateProduct);
productRoutes.get('/delete/:productId', productController.deleteProduct);
productRoutes.post('/search', productController.searchInput);



export default productRoutes