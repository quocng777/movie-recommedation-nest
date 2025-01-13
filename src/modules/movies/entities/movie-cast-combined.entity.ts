import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('movie_cast_combined') // Tên bảng là "users"
export class Movies_Casts_Combined {
    @PrimaryColumn('varchar', { length: 24 })
    id: string; 
    
}