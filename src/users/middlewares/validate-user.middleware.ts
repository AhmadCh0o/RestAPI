// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { Request, Response, NextFunction } from "express";

// @Injectable()
// export class  ValidateUserMiddleWare implements NestMiddleware {
//     use (req: Request, res: Response, next: NextFunction) {
//         console.log('Hello there, i am in the validateUserMiddleware ')
//         const { authorization } = req.headers
//         if (!authorization) return res.status(403).send({ 
//          Error: ' no authentication token provided '}) 
         
//         if (authorization === '123') {
//             next();
//         } else {
//             return res.status(403).send({Error: 'Invalid Authentication Token Provided'})
//         }
       
//     }
// }