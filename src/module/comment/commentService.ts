import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  //? check post exists
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });
  // ? check  comment exist
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }

  console.log(payload);
  return await prisma.comment.create({
    data: payload,
  });
};
const getCommentById = async (id: string) => {
  const postData = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
  return postData;
};


const getCommentByAuthorId = async (authorId: string) => {
  const postData = await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy:{createdAt:"desc"},
    include: {
      post: {
        select: {
          title: true,
     
        },
      },
    },
  });
  return postData;
};
 const deleteComment=async(authorId:string,commentId:string)=>{
   const commentData= await prisma.comment.findFirst({
    where:{
        id:commentId,
        authorId
    },
    select:{
        id:true
    },   
   })
     if (!commentData) {
     throw new Error ('commentId is required')
  }
  return await prisma.comment.delete({
    where:{
         id:commentData.id
    }
  })
 }

 const updateComment = async (commentId: string, data: { content?: string, status?: CommentStatus }, authorId: string) => {
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    if (!commentData) {
        throw new Error("Your provided input is invalid!")
    }

    return await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data
    })
}
export const CommentService = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment
};
