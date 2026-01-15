import { Request, Response } from "express"
import { CommentService } from "./commentService";
const createCommentController= async (req:Request,res:Response)=>{
  try {
        const user = req.user;
         // console.log(
         //    user
         // );
        req.body.authorId= user?.id;
     
    const result= await CommentService.createComment (req.body)
     console.log(result);
     res.status(201).json(
        result
     )
  } catch (e) {
   console.log(e);
    res.status(400).json({
        error:' comment creation fail',
        details:e
    })
    
  }
}
  const commentById= async(req:Request,res:Response)=>{
     try {
         const {commentId}= req.params
         const result= await  CommentService.getCommentById(commentId as string)
         res.status(201).json(
        result
     )
     } catch (error) {
         res.status(400).json({
        error:' comment create fail',
        details:error
    })
     }
  }
  const commentByAuthorId= async(req:Request,res:Response)=>{
     try {
         const {authorId}= req.params
         const result= await  CommentService.getCommentByAuthorId(authorId as string)
         res.status(201).json(
        result
     )
     } catch (error) {
         res.status(400).json({
        error:' comment create fail',
        details:error
    })
     }
  }
    const commentDelete=async(req:Request,res:Response)=>{
      try {
                 const user = req.user;
           const {commentId}= req.params
            const result= await  CommentService.deleteComment(user?.id as string,
  commentId as string)
              res.status(201).json(
        result )
      } catch (e) {
         console.log(e);
          res.status(400).json({
        error:' comment delate fail',
        details:e
          }
    )}}
    const updateComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await CommentService.updateComment(commentId as string, req.body, user?.id as string)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "Comment update failed!",
            details: e
        })
    }
}
 export  const commentController={
    createCommentController,
    commentById,
    commentByAuthorId,
    commentDelete,
    updateComment
 }