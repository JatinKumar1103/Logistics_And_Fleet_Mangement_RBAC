import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const showAdmin = asyncHandler(async(req,res) =>{
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "This is the admin dashboard"
    ))
})

const assignRoles = asyncHandler(async (req, res) => {
    const { userId, role } = req.body;
  

    const validRoles = ['admin', 'manager', 'driver'];

    if (!validRoles.includes(role)) {
        throw new ApiError(400, 'Invalid role');
    }

    const user = await User.findById(userId);
   
    

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    user.role = role;
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {}, 
            'Role updated successfully'));
  });

  const accessReports = asyncHandler(async (req, res) => {
    try {
        // User Reports
        const totalUsers = await User.countDocuments();
        const usersByRole = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);

        // Task Reports
        const totalTasks = await Task.countDocuments();
        const tasksByStatus = await Task.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const tasksPerManager = await Task.aggregate([
            {
                $group: {
                    _id: "$createdBy",
                    taskCount: { $sum: 1 }
                }
            }
        ]);

        const tasksPerDriver = await Task.aggregate([
            {
                $group: {
                    _id: "$assignedTo",
                    taskCount: { $sum: 1 }
                }
            }
        ]);

        // Combine all reports into a single response
        const reports = {
            totalUsers,
            usersByRole,
            totalTasks,
            tasksByStatus,
            tasksPerManager,
            tasksPerDriver
        };

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                reports,
                "Admin reports generated successfully"));
    } catch (error) {
        throw new ApiError(500, "Error generating admin reports");
    }
});

  

export{
    showAdmin,
    assignRoles,
    accessReports
}