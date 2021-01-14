import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { string } from 'yup/lib/locale';

import Swap from '../models/Swap';
import SwapView from '../views/SwapView'

interface ItemId {
    item_id: string;
    targed_item_id: string;
  }
  
class TrySwapController {

    async trySwap(request: Request, response: Response){
     
            
            const { targed_item_id } = request.params ;//as ItemId ;
            const { item_id } = request.body.item_id ; //as ItemId ;
              

            // console.log(targed_item_id)
            // console.log(item_id)

                   
    
  
    const swapRepository =getRepository(Swap);

    const swap ={
        targed_item_id,
        item_id,
    }

    const item = await swapRepository.findOneOrFail({ where: { item_id} }  );
    if(item) return response.status(201).json("Item ja inserido ");

    const newSwap = swapRepository.create({
      targed_item_id,
      item_id,
    });
    
    // delete item_id.user_id.password
  
    await swapRepository.save(swap);

    const targedItem =await swapRepository.findOne({where:[{
        'item_id':targed_item_id,
        'targed_item_id':item_id,
    }] });
    if( targedItem){
        console.log('FULANO TAMBÉM SE INTERESSOU PELO SEU PRODUTO. QUE TAL FINALIZAR UMA TROCA?')
    }
    
    return response.status(201).json(newSwap);
  }

    async showSwap(request: Request, response: Response){
    
            const { item_id } = request.params;
            const swapRepository =getRepository(Swap);
    
      
              const item = await swapRepository.findOneOrFail({ 
                relations: [   "item_id", "targed_item_id",
                       "item_id.images" , "targed_item_id.images",
                       "item_id.user_id", "targed_item_id.user_id"] ,
                where: { item_id},      
                }
                
               );
              
              //  delete item.item_id.user_id.password
            
            return response.status(201).json(SwapView.render(item));
            

    }
}

export default new TrySwapController()

