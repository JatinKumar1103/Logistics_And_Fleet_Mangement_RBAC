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

const monitorDrivers = asyncHandler(async (req, res) => {
    const managerId = req.user._id;

    // Fetch drivers managed by this manager
    const drivers = await User.find({ role: "driver", managedBy: managerId }).select(
        "_id fullName email"
    );

    if (!drivers.length) {
        throw new ApiError(404, "No drivers found under this manager");
    }

    // Fetch tasks assigned to these drivers
    const driverIds = drivers.map((driver) => driver._id);
    const driverTasks = await Task.aggregate([
        { $match: { assignedTo: { $in: driverIds } } },
        {
            $group: {
                _id: "$assignedTo",
                totalTasks: { $sum: 1 },
                completedTasks: {
                    $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                },
                pendingTasks: {
                    $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
                },
                inProgressTasks: {
                    $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] }
                }
            }
        }
    ]);

    // Map tasks data to drivers
    const driverDetails = drivers.map((driver) => {
        const taskData = driverTasks.find(
            (task) => task._id.toString() === driver._id.toString()
        ) || {
            totalTasks: 0,
            completedTasks: 0,
            pendingTasks: 0,
            inProgressTasks: 0
        };

        return {
            _id: driver._id,
            fullName: driver.fullName,
            email: driver.email,
            ...taskData
        };
    });

    return res.status(200).json(
        new ApiResponse(200, driverDetails, "Drivers monitored successfully")
    );
});


export {
    showManager,
    assignTask,
    monitorDrivers
}
