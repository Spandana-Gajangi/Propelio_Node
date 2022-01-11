import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, Unique, BeforeInsert } from 'typeorm';

@Entity({ name: 'CountySuggestion' })
export class CountySuggestion {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fips: string

    @Column()
    state: string

    @Column()
    name: string
}
