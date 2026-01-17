import { NextFunction, Request, Response } from "express"
import { CommentService } from "./commentService";
const createCommentController= async (req:Request,res:Response,next:NextFunction)=>{
  try {
        const user = req.user;
        req.body.authorId= user?.id;
     
    const result= await CommentService.createComment (req.body)
     console.log(result);
     res.status(201).json(
        result
     )
  } catch (e) {
  
   next(e)
    
  }
}
  const commentById= async(req:Request,res:Response,next:NextFunction)=>{
     try {
         const {commentId}= req.params
         const result= await  CommentService.getCommentById(commentId as string)
         res.status(201).json(
        result
     )
     } catch (error) {
        next(error)
     }
  }
  const commentByAuthorId= async(req:Request,res:Response,next:NextFunction)=>{
     try {
         const {authorId}= req.params
         const result= await  CommentService.getCommentByAuthorId(authorId as string)
         res.status(201).json(
        result
     )
     } catch (error) {
        next(error)
     }
  }
    const commentDelete=async(req:Request,res:Response,next:NextFunction)=>{
      try {
                 const user = req.user;
           const {commentId}= req.params
            const result= await  CommentService.deleteComment(user?.id as string,
  commentId as string)
              res.status(201).json(
        result )
      }
       catch (e) {
         next(e)
    }}
    const updateComment = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await CommentService.updateComment(commentId as string, req.body, user?.id as string)
        res.status(200).json(result)
    } catch (e) {
       next(e)
       
    }
}
   const moderateCommentAdmin=async(req:Request,res:Response,next:NextFunction)=>{
    try {
           const { commentId } = req.params;
        const result= await CommentService.moderateComment(commentId as string,req.body)
         res.status(200).json(result)
    } catch (error) {
         next(error)
    }
    }
   
 export  const commentController={
    createCommentController,
    commentById,
    commentByAuthorId,
    commentDelete,
    updateComment,
    moderateCommentAdmin
 }