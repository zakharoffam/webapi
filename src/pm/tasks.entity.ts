import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({
    name: 'TASKS_ON_NULL'
})
export class TasksOnNullEntity {
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
        name: 'INITIATOR_NAME',
        type: 'varchar',
        length: 255,
    })
    INITIATOR_NAME: string;

    @Column({
        name: 'INITIATOR_PHONE',
        type: 'int',
        length: 11,
    })
    INITIATOR_PHONE: number;

    @Column({
        name: 'INFO',
        type: 'varchar',
    })
    INFO: string;

    @Column({
        name: 'TEMPLATE',
        type: 'int',
    })
    TEMPLATE: number;
}