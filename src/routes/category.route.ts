import { Router } from "express";
import categoryController from "../controllers/category";



const categoryRoutes = Router()

categoryRoutes.post('/create', categoryController.createCategory);
categoryRoutes.get('/list', categoryController.listAllCategories);



export default categoryRoutes