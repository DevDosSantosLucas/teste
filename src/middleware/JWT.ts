// import { Request, Response, NextFunction } from 'express';
// import { verify } from 'jsonwebtoken';

// import authConfig from '../config/authConfig';
// import AppError from "../errors/Handler";

// export default function JWT(
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
// 	const authHeader = request.headers.authorization;

// 	if (!authHeader) {
// 		return response.status(401).json({message: 'JWT Token is missing.' });
// 	}

// 	const [type, token] = authHeader.split(' ');
// 	// const token = authHeader.split(' ')[1];

// 	try {
//     const decodedToken = verify(token, authConfig.jwt.secret);
    

// 		console.log(decodedToken);

// 		return next();
// 	} catch (error) {
// 		return response.status(401).json({message: 'Invalid JWT Token.' });
// 	}
// }

import {Request,Response,NextFunction, response} from 'express'
import authConfig from "../config/authConfig"
import jwt from 'jsonwebtoken'

export default function JWT(request: Request,reponse: Response,next: NextFunction){
	
	const {authorization }= request.headers;

	if(!authorization) { return response.send(401).json('error middlewere') }

	const token = authorization.replace('Bearer', '').trim();
	try{
		const data = jwt.verify(token,'secret');
		console.log(data)
		
	} catch{ return  response.send(401).json('No Token');


	}


}