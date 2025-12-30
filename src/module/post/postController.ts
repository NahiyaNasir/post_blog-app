import { Request, Response } from "express"
import createPostService from "./postService"

const createPostController= async (req:Request,res:Response)=>{
  try {
    const result= await createPostService(req.body  )
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
 export default createPostController