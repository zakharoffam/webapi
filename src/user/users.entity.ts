import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { PswUsersEntity } from './psw-user.entity';

@Entity({
  name: 'Users_list'
})
export class UsersEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
  })
  ID: number;

  @CreateDateColumn({
    name: 'TIMESTAMP_CREATE',
    type: 'timestamp',
    update: false,
  })
  TIMESTAMP_CREATE: string;

  @UpdateDateColumn({
    name: 'TIMESTAMP_UPDATE',
    type: 'timestamp',
  })
  TIMESTAMP_UPDATE: string;

  @Column({
    name: 'FIRST_NAME',
    type: 'varchar',
    length: 100,
  })
  FIRST_NAME: string;

  @Column({
    name: 'LAST_NAME',
    type: 'varchar',
    length: 100,
  })
  LAST_NAME: string;

  @Column({
    name: 'EMAIL',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  EMAIL: string;

  @Column({
    name: 'PHONE',
    type: 'varchar',
    length: 25,
    nullable: true,
    unique: true,
  })
  PHONE: string;
}
