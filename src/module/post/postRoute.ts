import { Router } from "express";
import createPostController from "./postController";
const route= Router()
  route.post('/',createPostController)
 export  const postRoute=  route