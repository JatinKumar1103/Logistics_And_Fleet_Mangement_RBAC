import { permissions } from "../utils/permissions.js";
import { ApiError } from "../utils/ApiError.js";

export const checkPermission = (requiredPermission) => {
  return (req,_, next) => {
    const userRole = req.user.role; 

    if (!permissions[userRole]?.includes(requiredPermission)) {
      throw new ApiError(403, "Access Denied: You do not have the required permission");
    }
    next();
  };
};
