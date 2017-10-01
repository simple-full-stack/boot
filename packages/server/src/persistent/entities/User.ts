import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {

    @PrimaryGeneratedColumn('long')
    id: number;

    @Column('string', { nullable: false, length: 100, unique: true })
    nickname: string;

    @Column('string', { length: 100 })
    realName: string;
}
