import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'PSW_Users_list'
})
export class PswUsersEntity {
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

  @PrimaryColumn({
    name: 'USER_ID',
    type: 'int',
    nullable: false,
  })
  USER_ID: number;

  @Column({
    name: 'PSW',
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  PSW: string;
}
