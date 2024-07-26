
import { config } from "../config";
import { JwtPayload, User } from "../Interfaces/User";
import UserModel, { IUser } from "../models/UserModel";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { invalidEmailorPasswordError, UnableToSaveUserError } from "../Utils/User";
import { UpdateQuery } from "mongoose";

export async function getAllUsers():Promise <IUser[] | void>{
try{
    const users = await UserModel.find().populate('products')
    return users

}catch(error:any){
    console.log(error)
}
}

export async function getUser(id:string):Promise <IUser | void>{
    try{
        const user = await UserModel.findById(id).populate('products').populate('cart') .populate({
            path: 'orders', 
            populate: {
              path: 'products.product', 
              model: 'Product', 
              select: 'Name Description DiscountedPrice Image Category' 
            }
          });
        if(!user){
            throw new Error("No user was found with that id")
        }else{
            return user
        }

    }catch(e:any){
        console.log(e);
        
    }
}

export async function deleteUser(id:string):Promise <string | void>{
    try{
       const deletedUser = await UserModel.findByIdAndDelete(id)
       if(!deleteUser){
         throw new Error("the user with id does not exist") 
       }else{
        return "Successfully deleted user"
       }

    }catch(error:any){
        console.log(error);
        
    }
}

export async function createUser(user: User): Promise<IUser> {
    const rounds = config.server.rounds;

    try {
        const hashedPassword = await bcrypt.hash(user.password, rounds);
        const savedUser = new UserModel({ ...user, password: hashedPassword });
        return await savedUser.save();
    } catch (error: any) {
        throw new UnableToSaveUserError(error.message);
    }
}

export async function logInUser(Details:{email:string, password:string}):Promise <IUser>{
    const {email, password} = Details
    try{
        const user = await UserModel.findOne({email}).populate('products').populate('cart').populate('orders')
        if(!user){
            throw new invalidEmailorPasswordError("Invalid Email")
        }else{
            const isMatch:boolean = await bcrypt.compare(password, user.password)
            if(!isMatch){
                throw new invalidEmailorPasswordError("Invalid Password")
            }else{
                return user
            }
        }



    }catch(error:any){
       throw error
    }
}


export async function updateUser(id: string, updateData: UpdateQuery<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true 
      });
  
      if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
      }
  
      return updatedUser;
    } catch (error:any) {
      console.error('Error updating user:', error);
      throw new Error(`Could not update user: ${error.message}`);
    }
  }


  export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role:user.role
    },
    config.server.jwtSecret, 
    { expiresIn: '2h' } 
  );
};

export async function  deleteProductFromCart (userId:string, productId:string) {
    try{
        const user = await UserModel.findById(userId)
        if(!user) throw new Error('User not found')
        user.cart = user.cart.filter(item => item.toString() !== productId);
        await user.save();

    }catch(error:any){
        throw error
    }
}


export  function verifyToken (token:string):JwtPayload | null{
    try{
        const secretKey = config.server.jwtSecret
        if(!secretKey){
            throw new Error('No secret key found')
        }
        const decoded = jwt.verify(token, secretKey) as JwtPayload
        return decoded
    }catch(error:any){
        console.error('Invalid token', error)
        return null

    }

}