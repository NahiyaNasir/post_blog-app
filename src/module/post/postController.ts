import { Request, Response } from "express"
import { PostService } from "./postService";



const createPostController= async (req:Request,res:Response)=>{
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
    res.status(400).json({
        error:'post create fail',
        details:error
    })
  }
}
 const getAllPostController= async (req:Request,res:Response)=>{
    try {
       const {search} = req.query
       const searchType=   typeof search === 'string' ?search :undefined
        const tags= req.query.tags?(req.query.tags as string).split(",") : [];
    const result= await  PostService.getPostService({search:searchType,tags})
     console.log(result);
     res.status(200).json(
        result
     )
  } catch (error) {
    res.status(400).json({
        error:'post  get fail',
        details:error
    })
  }
 }
 export  const postController={ createPostController,
  getAllPostController}