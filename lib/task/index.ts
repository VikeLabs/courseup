import { Task } from '@prisma/client';
import { differenceInMilliseconds } from 'date-fns';

import { prisma } from '@courseup/lib/prisma';

export async function createTask(type: string, fn: Promise<any>, metadata: any): Promise<Task> {
  const task = await prisma.task.create({
    data: {
      type,
      metadata,
    },
  });

  await fn;

  const endedAt = new Date();
  return await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      endedAt,
      duration: differenceInMilliseconds(endedAt, task.createdAt),
    },
  });
}

export async function findLatestTask(type: string): Promise<Task | null> {
  return await prisma.task.findFirst({
    where: {
      type,
    },
    orderBy: {
      startedAt: 'desc',
    },
  });
}
