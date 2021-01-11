import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Item from '../models/Item';
import ItemsView from '../views/ItemView';

class TrySwapController {

    async trySwap(request: Request, response: Response){

            const { targed_item_id } = request.params;
            const { item_id } = request.body;

            console.log(targed_item_id)
            console.log(item_id)

                   
    
  
    const swapRepository =getRepository(Item);

    const swap ={
        targed_item_id,
        item_id

    }

    const schema = Yup.object().shape({
        targed_item_id: Yup.number().required(),
        item_id: Yup.number().required().integer(),
      
    });

    
    await schema.validate(swap, {
      abortEarly: false, //Se encontrar um erro, por padrão retorna um erro retornando todos ao mesmo tempo;
    })

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
            const swapRepository =getRepository(Item);
            const swaps = await swapRepository.findOneOrFail( item_id);


            const item = await swapRepository.findOneOrFail( item_id, {
                relations: ['items']
              } );

            return response.status(201).json({swaps,item});

    }
}


export default new TrySwapController()

