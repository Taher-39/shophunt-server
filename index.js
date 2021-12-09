import express from 'express'
import connect from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleWare/errorMiddleWare.js'
dotenv.config();

connect()

const app = express();

app.use(cors()); 

app.get(("/"), (req, res) => {
    res.send("Server Is Running...");
})
app.use('/api/products', productRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))