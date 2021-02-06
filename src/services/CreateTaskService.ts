import { getRepository } from 'typeorm';

import Task from '../models/Task';

interface TaskDTO {
  title: string;
}

class CreateTaskService {
  public async execute({ title }: TaskDTO): Promise<Task> {
    const tasksRepository = getRepository(Task);

    const task = tasksRepository.create({
      title,
      status: 'pending',
    });

    await tasksRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
