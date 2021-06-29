import { Exclude } from 'class-transformer';
import { Users } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: taskStatus;

  @ManyToOne((_type) => Users, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: Users;
}
