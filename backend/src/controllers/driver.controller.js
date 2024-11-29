import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";


const showDriver = asyncHandler(async(req,res) =>{
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "This is the driver dashboard"
    ))
})

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { taskId, status } = req.body;
  
    const task = await Task.findById(taskId);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }
  
    // if (task.driver.toString() !== req.user._id.toString()) {
    //   throw new ApiError(403, "You are not authorized to update this task");
    // }
  
    task.status = status;
    await task.save();
  
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task status updated successfully"));
  });

export {
    showDriver,
    updateTaskStatus
}
