import { error } from "console"
import { prisma } from "../lib/prisma"
import { UserRole } from "../middleware/middleware"

async function seedAdmin() {
      const adminData= {
         name: "Admin36Saheb",
            email: "admin33@admin.com",
            role: UserRole.ADMIN,
            password: "admin1234"
      }
     try {
         const existingUser= await prisma.user.findUnique({
           where:{
            email:
            adminData.email
            }
           
         })
          if (existingUser) {
                throw new Error(' user already exist')
            }
              const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminData)
        })
        if (signUpAdmin.ok) {
            console.log("**** Admin created")
             await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
               
            })
              console.log("**** Email verification status updated!")
        }

          console.log("******* SUCCESS ******")
        
     } catch (e) {
         throw e
     }
}
 seedAdmin()