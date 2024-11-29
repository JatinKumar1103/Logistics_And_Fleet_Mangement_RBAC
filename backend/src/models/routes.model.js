import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
    {
        startLocation : {
            type: String,
            required: true,
            trim : true
        },
        endLocation : {
            type : String,
            required: true,
            trim : true
        },
        distance : {
            type: Number,
            required: true
        },
        assigned_driver_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        vehicle_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true

        },
        status : {
            type: String,
            enum : ['pending', 'completed'],
            default : 'pending'
            
        }
    },
    {
        timestamps : true
    }
);

export const Route = mongoose.model('Route',routeSchema);