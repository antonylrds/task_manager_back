import { getRepository } from 'typeorm';

import Task from '../models/Task';

import AppError from '../errors/AppError';

interface TaskDTO {
  id: number;
  status: 'pending' | 'done' | 'canceled';
}

class UpdateTaskService {
  public async execute({ id, status }: TaskDTO): Promise<Task> {
    const tasksRepository = getRepository(Task);
    const statusTypes = ['pending', 'done', 'canceled'];

    const task = await tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new AppError('Task does not exists', 404);
    }

    const validStatus = statusTypes.indexOf(status) > -1;

    if (!validStatus) {
      throw new AppError(
        `Task status must be one of the following: ${statusTypes.join(', ')}`,
      );
    }

    if (status !== task.status) {
      task.status = status;
      await tasksRepository.save(task);
    }

    return task;
  }
}

export default UpdateTaskService;
