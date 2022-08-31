import { Task } from '@prisma/client';

export type TaskResponse = Omit<Task, 'id' | 'duration'> & {
  message: string;
};
