import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json({
    limit:"16kb",
}));

app.use(express.urlencoded({
    extended: true,
    limit:"16kb",
}))

app.use(cookieParser());

//routes import 
import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import driverRouter from "./routes/driver.routes.js"
import managerRouter from "./routes/manager.routes.js"
import vehicleRouter from "./routes/vehicle.routes.js"

app.use('/api/v1/users',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/driver',driverRouter)
app.use('/api/v1/manager',managerRouter)
app.use('/api/v1/vehicle',vehicleRouter)

export {app}