import { Request, Response } from 'express';
import { getRepository ,getManager, ObjectID  } from 'typeorm';
import * as Yup from 'yup';

// import AppError from "../errors/AppErrors"
import { sign } from "jsonwebtoken";
import authConfig from "../config/authConfig"
import bcrypt from "bcryptjs";

import User from '../models/User';

import userView from '../views/UserView';



class UserController{ 
async create(request: Request, response: Response){
    const {user_id, name, password, city, uf, whatsapp ,passwordConfirmation} = request.body;

    const UsersRepository =getRepository(User);

    const requestImages = request.file.filename ;
    console.log(requestImages)

    const user = {
      user_id,
      avatar: requestImages, 
      name,
      city,
      uf,
      whatsapp,
      passwordConfirmation,
      password
    };
    
    const schema = Yup.object().shape({
      avatar: Yup.string(),
      name: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string().required().max(2),
      whatsapp:  Yup.number().lessThan(99999999999999),
      password: Yup.string().required().min(6),
      passwordConfirmation: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    console.log(user)
    
    await schema.validate(user, {
      abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
    })
    const userExists = await UsersRepository.findOne({where:{whatsapp}})
      if(userExists){ 
        console.log(userExists)
        return response.status(409).json('WhatsApp has already signed up') }

    const createdUser = UsersRepository.create(user);
 
    await UsersRepository.save(createdUser);
    
    return response.status(201).json({user});
    }
  
async auth(request: Request, response: Response){
    const {user_id, whatsapp, password } = request.body;
    

    const user = {
      user_id,
      whatsapp,
      password,
      
    };
  
    
    const usersRepository = getRepository(User);
    const users = await usersRepository.findOne({where:{whatsapp} });
    console.log(users)

        if(!users){
          return response.status(201).json("Senha ou whatsapp não é valida!");
        }

 
    const isValidPassword = await bcrypt.compare(password,user.password);
      if (!isValidPassword)  {
        console.log('teste')
        console.log(isValidPassword)
          return response.status(401).json('password don\'t authenticated') 
      }  
           //fazer criptografia
    // const token = sign({id: user.user_id}, 'secret', {expiresIn:'1d'
    
    //   // subject: String(user.user_id),
    //   // expiresIn: authConfig.jwt.expiresIn
    // });

    const schema = Yup.object().shape({
      whatsapp:  Yup.number().lessThan(99999999999999),
       password: Yup.string().required().min(6),
   });
   console.log(whatsapp)
   
   await schema.validate(user, {
     abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
   })

    return response.status(201).json({user,/*token*/});
    }
    
}

export default new  UserController();