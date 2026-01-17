import { Router } from "express";

import auth, { UserRole } from "../../middleware/middleware";
import { postController } from "./postController";
const route = Router();
route.get("/", postController.getAllPostController);
route.get(
  "/stats",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.statesPostCon,
);
route.get(
  "/my-post",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPostsCon,
);

route.get("/:postId", postController.getPostByIdCon);
route.post("/", auth(UserRole.USER), postController.createPostController);
route.patch(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.updatePostCon,
);
route.delete(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.deletePostCon,
);

export const postRoute = route;
