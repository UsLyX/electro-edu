const express = require('express')
const cors = require('cors')

const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const studentRouter = require('./routers/studentRouter')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/student', studentRouter)

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()