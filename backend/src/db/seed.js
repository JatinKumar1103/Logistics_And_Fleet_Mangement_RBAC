import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { Route } from "../models/routes.model.js";

const seedDatabase = async () => {
    try {
        // Seed Users
        const users = [
            {
                username: "admin",
                email: "admin@example.com",
                fullName: "Admin User",
                password: "hashed_password",
                role: "admin",
            },
            {
                username: "dispatcher1",
                email: "dispatcher1@example.com",
                fullName: "Dispatcher One",
                password: "hashed_password",
                role: "dispatcher",
            },
            {
                username: "driver1",
                email: "driver1@example.com",
                fullName: "Driver One",
                password: "hashed_password",
                role: "driver",
            },
        ];
        await User.insertMany(users);
        console.log("Users seeded");

        // Fetch driver ID
        const driver = await User.findOne({ role: "driver" });

        // Seed Vehicles
        const vehicles = [
            { model: "Truck A", license_plate: "ABC123", status: "available" },
            { model: "Truck B", license_plate: "XYZ456", status: "maintenance" },
        ];
        await Vehicle.insertMany(vehicles);
        console.log("Vehicles seeded");

        // Fetch vehicle ID
        const vehicle = await Vehicle.findOne({ status: "available" });

        // Seed Routes
        const routes = [
            {
                startLocation: "New York",
                endLocation: "Los Angeles",
                distance: 2800,
                assigned_driver_id: driver._id, // Assign driver ID
                vehicle_id: vehicle._id,       // Assign vehicle ID
                status: "pending",
            },
            {
                startLocation: "Chicago",
                endLocation: "Houston",
                distance: 1080,
                assigned_driver_id: driver._id,
                vehicle_id: vehicle._id,
                status: "pending",
            },
        ];
        await Route.insertMany(routes);
        console.log("Routes seeded");

       
        console.log("Database seeding completed");
    } catch (err) {
        console.error("Error occurred during seeding:", err);
    }
};


export default seedDatabase;
