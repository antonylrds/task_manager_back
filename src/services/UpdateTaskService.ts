import { getRepository } from 'typeorm';

import Task from '../models/Task';

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
      throw new Error('Task does not exists');
    }

    const validStatus = statusTypes.indexOf(status) > -1;

    if (!validStatus) {
      throw new Error(
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
