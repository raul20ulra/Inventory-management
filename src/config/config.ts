import dotenv from 'dotenv'
dotenv.config({path:`./.env.${process.env.NODE_ENV || 'development'}`})



export default {
    PORT: process.env.PORT || 8080,
    SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY || "",
    MONGODB_URI:process.env.MONGODB_URI || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID  || "",
}