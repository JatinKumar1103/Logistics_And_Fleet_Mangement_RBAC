import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
    {
        route_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
            required: true
        },
        status : {
            type : String, 
            enum : ['pending', 'completed', 'delayed'],
            default: 'pending'
        }
    }, 
    {
        timestamps: true, 
    }
);

export const Delivery = mongoose.model('Delivery', deliverySchema)