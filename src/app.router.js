import connectDB from '../DB/connection.js'
import categoriesRouter from './modules/categories/categories.router.js'
import subCategoriesRouter from './modules/subCategory/subCategories.router.js'
import productsRouter from './modules/products/products.router.js'
import authRouter from './modules/auth/auth.router.js'
const initApp = (app, express) => {
    app.use(express.json())
    connectDB()
    app.get('/', (req, res) => {
        return res.status(200).json("Welcome...")
    })
    app.use('/auth', authRouter)
    app.use('/categories', categoriesRouter)
    app.use('/products', productsRouter)
    app.use('/subCategories', subCategoriesRouter)
    app.get('*', (req, res) => {
        return res.status(200).json("Page Not Found...")
    })
}
export default initApp