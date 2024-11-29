import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'


const options = {
    httpOnly: true,
    secure : true,
}

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave : false
        })

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating and refresh token"
        )
    }
}

//steps to register user

//get user details from frontend
//validation - not empty
//check if user already exists:username, email
// create user object - create entry in db
// remove password and refresh token field response
// check for user creation
// return response
const registerUser = asyncHandler(async (req,res) => {

    const {fullName, email, password,role,username} = req.body;

    if([fullName,email,username,password,role].some((field) => field?.trim() ===""))
        {
        throw new ApiError(400, "All fields are required");
        }

    //if user already exists
    const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    });
    
    if(existedUser){
        throw new ApiError(409, "User already exists");
    }

    //create user object

    const user  = await User.create({
        fullName,
        email,
        password,
        username : username.toLowerCase(),
        role
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "Error registering user")
    }

    return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"))

})

//steps to login user

//login user steps
//req body data
//check for username or email
//find the user
//check password
//access and refresh tokem
//send cookies

const loginUser = asyncHandler(async(req,res) => {
    const {email, username, password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "username or email is required");
    }
    const user = await User.findOne({
        $or:[{username},{email}],
    })
    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credentials");
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res 
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken,
            },
            "User logged in successfully"
        )
    )
    
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken : undefined,
            }
        },
        {
            new : true
        }
    );
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      const user = await User.findById(decodedToken?._id);
  
      if (!user) {
        throw new ApiError(401, "Invalid refresh token");
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
      }
      const options = {
        httpOnly: true,
        secure: true,
      };
  
      const { accessToken, newrefreshToken } =
        await generateAccessAndRefreshToken(user._id);
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              accessToken,
              refreshToken: newrefreshToken,
            },
            "Access Token Refreshed Successfully"
          )
        );
    } catch (error) {
      throw new ApiError(401, error.message || "Invalid RefreshToken");
    }
  });

  const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    const user = await User.findById(req.user?._id);
  
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Old password is incorrect");
    }
  
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
  
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully"));
  });


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    
}