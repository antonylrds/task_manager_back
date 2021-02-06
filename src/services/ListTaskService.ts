import { getRepository } from 'typeorm';

import Task from '../models/Task';

class ListTaskService {
  public async execute(): Promise<Task[]> {
    const tasksRepository = getRepository(Task);

    const tasks = await tasksRepository.find({ select: ['title', 'status'] });

    return tasks;
  }
}

export default ListTaskService;
