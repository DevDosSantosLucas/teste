import { Entity, Column, PrimaryGeneratedColumn, 
         OneToMany, JoinColumn ,
         BeforeInsert, BeforeUpdate} from 'typeorm';

import bcrypt from 'bcryptjs';

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

  
   

}