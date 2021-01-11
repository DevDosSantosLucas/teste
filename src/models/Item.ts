import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,JoinTable, OneToOne } from 'typeorm';

import Image from './Image';
import User from './User';

@Entity('items')
export default class Item {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @Column()
  name_item:string;


  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  // @Column()
  // user_id: string;

  @OneToOne(()=> User, user => user.item)
  @JoinColumn({ name: "users"})  
  user_id: User;
  

  @OneToMany(()=> Image, image => image.item, {
    cascade:['insert', 'update'] //Irá cadastrar ou atualizar as imagens relacionados a orfanatos cadastrardos
  })
  @JoinColumn({name: 'item_id'})
  images: Image[];
  // images: Image[];

}
