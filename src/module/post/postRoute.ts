import { Router } from "express";

import auth, { UserRole } from "../../middleware/middleware";
import { postController } from "./postController";
const route= Router()
 route.get("/",postController.getAllPostController)
  route.post('/',auth(UserRole.USER) , postController.createPostController)
 export  const postRoute=  route