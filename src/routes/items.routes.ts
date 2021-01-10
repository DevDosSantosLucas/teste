import { Router } from "express";

import multer from "multer";
import uploadConfig from "../config/upload";

import ItemController from"../controllers/ItemsController"
import TrySwapController from "../controllers/TrySwapController"
import JWT from "../middleware/JWT";

    const routes = Router();
    const upload = multer(uploadConfig);

    routes.use(JWT);
    

    routes.get('/show',  ItemController.index,JWT)
          .post('/create', upload.array('images'), ItemController.create,JWT)
          // .put('/update/:item_id', ItemController.update,JWT)
          // .delete('/delete/:item_id', ItemController.delete,JWT)

          .post('/:targed_item_id/tryswap',TrySwapController.trySwap,JWT)
          .get('/showSwap/:item_id',TrySwapController.showSwap,JWT)

        //   .post('/image', upload.array('images'), TrySwapController.create);
    

export default routes;
