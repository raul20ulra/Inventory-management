import mongoose from 'mongoose';


const validateMongoId = (id:string) => {

    try {
        if( new mongoose.Types.ObjectId(id) ){
            return true;
        };
    } catch (error) {
        return false;
    }
}


export default validateMongoId;