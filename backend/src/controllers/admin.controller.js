import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

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
  

export{
    showAdmin,
    assignRoles
}