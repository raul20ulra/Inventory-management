
// modulos
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import express from 'express';
import fileUpload from "express-fileupload";
import cors from 'cors'
import config from './config/config';




export const app = express();

// cargar rutas
import authRouter from './routes/auth.route';
import categoryRouter from './routes/category.route';
import productRoutes from './routes/product.route';

// middleware


app.use(express.json())
app.use(cors())


app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./tmp",
    })
  );


app.use('/auth', authRouter )
app.use('/category', categoryRouter)
app.use('/product',productRoutes)



// rutas
const swaggerDocument = YAML.load('./docs/swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// public folder

app.use(express.static("src/public"));

app.get("/", (req, res) => {
    res.send({ message: 'Welcome to my Api', environment: config.NODE_ENV  });
})