
import { Router } from "express";

import UserController from"../controllers/UserController"


import JWT from "../middleware/JWT";


    const routes = Router();




    routes.use(JWT);

    routes
        .get('/show/:user_id', UserController.show,JWT)
        // .put('/update/:userId', UserController.update,JWT)
        // .delete('/delete/:userId', UserController.delete,JWT)





export default routes;