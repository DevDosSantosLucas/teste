import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Swap from '../models/Swap';

// interface ItemId {
//     item_id: string;
//   }
  
class TrySwapController {

    async trySwap(request: Request, response: Response){
            
            const { targed_item_id } = request.params;
            const { item_id } = request.body.item_id;

            // console.log(targed_item_id)
            // console.log(item_id)

                   
    
  
    const swapRepository =getRepository(Swap);

    const swap ={
        targed_item_id,
        item_id,
    }


    const newSwap = swapRepository.create(swap);
  
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
    
            // const item = await swapRepository.find( {
            //     relations: ["item_id","targed_item_id"] 
            //   } );
              const item = await swapRepository.findOneOrFail({ 
                relations: [ "item_id", "targed_item_id" ] ,// falta mostrar todas a s infos dos Items
                where: { item_id},
                }
               );
              console.log(item)
            return response.status(201).json(item);

    }
}


export default new TrySwapController()

