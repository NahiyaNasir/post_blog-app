import { NextFunction, Request, Response } from "express"
import { PostService } from "./postService";
import { PostStatus } from "../../../generated/prisma/enums";

import { UserRole } from "../../middleware/middleware";
import paginationSortingHelper from "../../helpers/paginationHelperfun";



const createPostController= async (req:Request,res:Response,next:NextFunction)=>{
  try {

     const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized!",
            })
        }
    const result= await PostService.createPostService (req.body,user.id as string )
     console.log(result);
     res.status(201).json(
        result
     )
  } catch (error) {
    next(error)
  }
}
 const getAllPostController= async (req:Request,res:Response,next:NextFunction)=>{
    try {
       const {search} = req.query
       const searchType=   typeof search === 'string' ?search :undefined
        const tags= req.query.tags?(req.query.tags as string).split(",") : [];
         const isFeatured=  req.query.isFeatured? req.query. isFeatured  === 'true'? true :req.query.isFeatured === 'false'
         ? false :undefined
         :undefined
           const status = req.query.status as PostStatus | undefined
        const authorId = req.query.authorId as string | undefined
             const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query)

    const result= await  PostService.getPostService({search:searchType,tags,isFeatured,status,authorId,page,limit,skip,sortBy,sortOrder})
   //   console.log(result);
     res.status(200).json(
        result
     )
  } catch (e) {
   next(e)
  }
 }
  const getPostByIdCon= async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const {postId}= req.params
       if ( !postId){
         throw new Error (' post id required')
       } {
         
       }
       const result = await  PostService.getPostById(postId )
       res.status(200).json(
        result
     )
       return result
    } catch (e) {
       next(e)
    }
  }
  const getMyPostsCon = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
        console.log("User data: ", user)
        const result = await PostService.getMyPosts(user.id);
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
       next()
    }
}
  const updatePostCon = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
       const { postId } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await PostService.updatePost(postId as string,req.body, user.id ,isAdmin );
        res.status(200).json(result)
    } catch (error) {
      next(error)
    }
}
  const deletePostCon = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
       const { postId } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await PostService.deletePost(postId as string, user.id ,isAdmin );
        res.status(200).json(result)
       
    } catch (error) {
       next(error)
    }
}
  const statesPostCon = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
       const { postId } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await PostService.getStats();
        res.status(200).json(result)
    } catch (error) {
        next(error)
       
    }
}

 export  const postController={ createPostController,
  getAllPostController, getPostByIdCon,getMyPostsCon,updatePostCon,deletePostCon,statesPostCon}