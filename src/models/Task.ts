import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('enum')
  status: 'pending' | 'done' | 'canceled';
}

export default Task;
