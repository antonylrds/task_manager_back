import { getRepository } from 'typeorm';

import Task from '../models/Task';

class ListTaskService {
  public async execute(page: number, limit: number): Promise<Task[]> {
    const tasksRepository = getRepository(Task);

    if (page < 1) {
      throw new Error('Page number must be at least 1');
    }

    const tasks = await tasksRepository.find({
      select: ['title', 'status'],
      take: limit,
      skip: (page - 1) * limit,
    });

    return tasks;
  }
}

export default ListTaskService;
