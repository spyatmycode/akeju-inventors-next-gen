import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task{
    @PrimaryGeneratedColumn("uuid", {name:"id"})
    id:string;

    
    @Column({name:'title',nullable:false})
    title:string;


    @Column({name:'description',nullable:false})
    description:string
}