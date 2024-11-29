import {Router} from 'express'
import { registerUser,loginUser, logoutUser, refreshAccessToken, changeCurrentPassword } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';



const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/changePassword").post(changeCurrentPassword)

// router.route("/admin/dashboard").get(verifyJWT,showAdmin)
  
//   router.route("/manager/dashboard").get(verifyJWT, checkRole('manager'), (req, res) => {
//     res.json({ message: "Welcome to Manager Dashboard" });
//   });

export default router;