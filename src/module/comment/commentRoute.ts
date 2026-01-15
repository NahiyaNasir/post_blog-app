
import { Router } from "express";

import auth, { UserRole } from "../../middleware/middleware";
import { commentController } from "./commentController";

const router= Router()
 router.get('/:commentId',commentController.commentById)
 router.get('/author/:authorId',commentController.commentByAuthorId)
  router.post('/',auth(UserRole.USER,UserRole.ADMIN) , commentController.createCommentController)
  router.delete('/:commentId',auth(UserRole.USER,UserRole.ADMIN), commentController.commentDelete)
  router.patch(
    "/:commentId",
    auth(UserRole.USER, UserRole.ADMIN),
   commentController.updateComment
)

 export  const commentRoute=  router