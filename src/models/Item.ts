import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Image from './Image';

@Entity('items')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  item_id: string;

  @Column()
  name_item:string;


  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()   
  user_id:string;

  @OneToMany(()=> Image, image => image.item, {
    cascade:['insert', 'update'] //Irá cadastrar ou atualizar as imagens relacionados a orfanatos cadastrardos
  })
  @JoinColumn({name: 'item_id'})
  images: Image[];

}
