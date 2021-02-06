import { getRepository } from 'typeorm';

import Task from '../models/Task';

interface TaskDTO {
  id: number;
  status: 'pending' | 'done' | 'canceled';
}

class UpdateTaskService {
  public async execute({ id, status }: TaskDTO): Promise<Task> {
    const tasksRepository = getRepository(Task);

    const task = await tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (status !== task.status) {
      task.status = status;
      await tasksRepository.save(task);
    }

    return task;
  }
}

export default UpdateTaskService;
