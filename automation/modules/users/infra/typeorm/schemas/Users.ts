import { Entity, Column } from 'typeorm';

@Entity('users')
export class Users {
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  addressNumber: number;

  @Column()
  phoneNumber: string;
}
