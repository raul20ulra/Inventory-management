
import  mongoose  from 'mongoose';

 /**
     * fragmento para filtrar con regex
        * @param {input} input
        * @returns {object}
     */
// 
export function filterInputRegex(input:string){
    if(!input) return {}
    const matchInput =  
          { $or: [
           { "name": { $regex: input, $options: "i" } },
           { "description": { $regex: input, $options: "i" } }, 
          ], };

    return matchInput
}


// 
/**
     * fragmento para filtrar por un _id en el campo especificado
        * @param {input} input
        * @returns {object}
     */
// 
export function filterForId(campo:string, idFilter:string){
    if(!idFilter) return {}
    const query =  { [campo]: new mongoose.Types.ObjectId(idFilter) };
    return query
}
