import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { Users } from './Users';


@Entity('categories')
export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @ManyToOne(() => Users, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user_id!: number;  // Coluna de chave estrangeira

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 10 })
    type!: 'entrada' | 'saida';

    @Column({ default: true })
    status!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

     // Especifica a coluna de chave estrangeira
}
