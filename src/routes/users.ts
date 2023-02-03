import  { Router } from "express";
import { GetUsers,PostUser,GetUserById,UpdateAvatar,UpdateUser} from "../controllers/users";
const userRouter = Router();

userRouter.get("/",GetUsers );
userRouter.get("/:userId",GetUserById );
userRouter.post("/:userId",PostUser );
userRouter.patch("/me/avatar",UpdateAvatar );
userRouter.patch("/me",UpdateUser );

export default userRouter