const permissions = {
    admin: [
      "manageUsers", // Admin can manage users
      "viewDashboard", // Admin dashboard access
      "assignRoles", // Admin can assign roles to other users
      "accessReports", // Admin can view reports
    ],
    manager: [
      "viewDashboard", // Manager can view their dashboard
      "assignTasks", // Manager can assign tasks to drivers
      "monitorDrivers", // Manager can monitor drivers
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
  