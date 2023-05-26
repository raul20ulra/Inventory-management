import { app } from './app';
import mongoose from 'mongoose';
import config from './config/config';

const port =  config.PORT;



mongoose
    .connect(config.MONGODB_URI) 
    .then((data) => data)
    .catch((error) => console.error(error));

    app.listen(port, () =>console.log('server listening on port', port))