import 'dotenv/config'
import express from "express"
import initApp from './src/app.router.js'
const app=express()

initApp(app,express)

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})
