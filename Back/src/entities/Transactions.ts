import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Users } from './Users';
import { Categories } from './Categories';

@Entity('transactions')
export class Transactions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'timestamp', nullable: true })
    data!: Date;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'float', nullable: true })
    value!: number;

    @Column()
    @ManyToOne(() => Users, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id!: number;  // Coluna de chave estrangeira

    @Column()
    @ManyToOne(() => Categories, category => category.id)
    @JoinColumn({ name: 'category_id' })
    category_id!: number;  // Coluna de chave estrangeira

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}
