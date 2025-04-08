import {prisma} from '@/utils/prisma'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
class AuthError extends Error {
    statusCode: number
  
    constructor(message: string, statusCode = 400) {
      super(message)
      this.name = "AuthError"
      this.statusCode = statusCode
    }
  }
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginService = async (data:any)=>{

    const checkEmail = await prisma.admin.findUnique({where:{email:data.email}})

    if(!checkEmail){

         throw new AuthError("Email Not Found",404)
    }
    const isPasswordValid = await bcrypt.compare(data.password, checkEmail.password_hash)
    if (!isPasswordValid) {
      throw new AuthError("Password doesn't match",401)
    }
    return await prisma.admin.findUnique({where:{email:data.email}})

}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerService = async (data:any)=>{
    const ifExisit = await prisma.admin.findUnique({where:{email:data.email}})

    if (ifExisit){
        throw Error("Email Already Registed")
    }

    const password_hash = await bcrypt.hash(data.password,10)

    return await prisma.admin.create({
        data:{
            email:data.email,
            password_hash:password_hash,
            username:data.username,
        }
    })
    
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestPasswordResetService = async (data:any)=>{
    const { email } = data

    const user = await prisma.admin.findUnique({ where: { email } })
  

    if (!user){
        throw new AuthError("Email Not Found",404)
    }
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  
    await prisma.resetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    })
  
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
  
    
    return resetLink
}

// export const resetPasswordService = async (data:any)=>{

// }