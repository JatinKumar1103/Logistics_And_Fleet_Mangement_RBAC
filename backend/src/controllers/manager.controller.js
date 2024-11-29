import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";


const showManager = asyncHandler(async(req,res) =>{
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "This is the manager dashboard"
    ))
})

const assignTask = asyncHandler(async (req, res) => {
    const { title, description, driverId } = req.body;

    if (!title || !driverId) {
        throw new ApiError(400, 'Title and driverId are required');
    }

    const driver = await User.findById(driverId);
    if (!driver || driver.role !== 'driver') {
        throw new ApiError(400, 'Invalid driver ID');
    }

    const managerId = req.user._id; // Assumes req.user is set by auth middleware

    const task = await Task.create({
        title,
        description,
        assignedTo: driverId,
        createdBy: managerId,
    });

    return res.status(201).json(new ApiResponse(201, task, 'Task assigned successfully'));
});


export {
    showManager,
    assignTask
}
