import { Entity, Column, PrimaryGeneratedColumn, 
         OneToOne, JoinColumn ,
         BeforeInsert, BeforeUpdate} from 'typeorm';

import bcrypt from 'bcryptjs';

import Item from './Item'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  whatsapp: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  // para encriptar:
  // @BeforeInsert()
  // @BeforeUpdate()
  // hashPassword(){
  //   this.password = bcrypt.hashSync(this.password,8)
  // }

  @OneToOne(() => Item, item => item.user_id) // specify inverse side as a second parameter
  @JoinColumn({name: 'user_id'})
  item: Item[];

}