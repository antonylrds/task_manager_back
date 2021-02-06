import { getRepository } from 'typeorm';

import Task from '../models/Task';

import AppError from '../errors/AppError';

class DeleteTaskService {
  public async execute(id: number): Promise<null> {
    const tasksRepository = getRepository(Task);

    const task = await tasksRepository.findOne(id);

    if (!task) {
      throw new AppError('Task does not exists');
    }

    await tasksRepository.remove(task);

    return null;
  }
}

export default DeleteTaskService;
