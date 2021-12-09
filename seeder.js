import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import users from './data/users.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import dbConnect from './config/db.js'
import colors from 'colors'

dotenv.config()

dbConnect()

const importData = async () => {
    try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUser = await User.insertMany(users)

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map(pd => {
        return { ...pd, user: adminUser}
    })

    await Product.insertMany(sampleProducts)

    console.log('Data inserted'.green.bold)
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }

}

const destroyData = async () => {
    try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroy'.green.bold)
    process.exit()

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }

}

if(process.argv[2] === "-d"){
    destroyData()
}else{
    importData()
}

