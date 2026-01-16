import { Router } from "express";

import auth, { UserRole } from "../../middleware/middleware";
import { postController } from "./postController";
const route = Router();
route.get("/", postController.getAllPostController);
route.get(
  "/my-post",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPostsCon
);
route.get("/:postId", postController.getPostByIdCon);

route.post("/", auth(UserRole.USER), postController.createPostController);
export const postRoute = route;
