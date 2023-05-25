import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface Product {
  id: number;
  name: string;
  quantity: number;
}

let inventory: Product[] = [];

// Obtener todos los productos
app.get('/products', (req: Request, res: Response) => {
  res.json(inventory);
});

// Crear un nuevo producto
app.post('/products', (req: Request, res: Response) => {
  const { id, name, quantity } = req.body;
  const newProduct: Product = { id, name, quantity };
  inventory.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar la cantidad de un producto existente
app.put('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const { quantity } = req.body;
  const productIndex = inventory.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    inventory[productIndex].quantity = quantity;
    res.json(inventory[productIndex]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// Eliminar un producto existente
app.delete('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const productIndex = inventory.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const deletedProduct = inventory.splice(productIndex, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// Puerto en el que se ejecutará el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
