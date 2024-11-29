import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        model : {
            type : String,
            required : true,
            trim : true
        },
        license_plate : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        status : {
            type : String,
            required : true,
            trim : true,
            enum : ['available', 'in-use', 'maintenance'],
            default : 'available'
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming drivers are stored in the User model
            default: null
        }
    }, 
    {
        timestamps : true
    }
)

export const Vehicle = mongoose.model("Vehicle", vehicleSchema)