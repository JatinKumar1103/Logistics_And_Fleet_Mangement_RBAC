const permissions = {
    admin: [
      "manageUsers", // Admin can manage users
      "viewDashboard", // Admin dashboard access
      "assignRoles", // Admin can assign roles to other users
      "accessReports", // Admin can view reports
      "assignVehicleToDriver",// Admin can assign
      "releaseVehicleFromDriver"// Admin can release vehicle from driver
    ],
    manager: [
      "viewDashboard", // Manager can view their dashboard
      "assignTasks", // Manager can assign tasks to drivers
      "monitorDrivers", // Manager can monitor drivers
      "vehicledetailsFromDriver", //Manager can add vehicle details
      "assignVehicleToDriver", // Manager can assign vehicles to drivers
      "releaseVehicleFromDriver"// Manager can release vehicle from driver
    ],
    driver: [
      "viewDashboard",
      "viewTasks", // Driver can view assigned tasks
      "updateTaskStatus", // Driver can update the status of tasks
    ],
    user: [
      "updateProfile", // General users can update their profiles
    ],
  };
  
  export { permissions };
  