import {Schema, model} from 'mongoose';
import ICategory from '../interfaces/category.interface';


const CategorySchema = new Schema<ICategory> ({
    name: {
        type: String,
        required: true
    }
});


 const Category = model<ICategory>("Category", CategorySchema);
 export default Category;