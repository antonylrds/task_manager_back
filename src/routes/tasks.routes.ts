import { Router } from 'express';

import CreateTaskService from '../services/CreateTaskService';
import ListTaskService from '../services/ListTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';

const tasksRouter = Router();

tasksRouter.get('/', async (request, response) => {
  const listTaskService = new ListTaskService();

  const { page, limit } = request.query;

  try {
    const tasks = await listTaskService.execute(+page, +limit);

    return response.json({
      tasks,
      perPage: +limit,
      page: +page,
    });
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
});

tasksRouter.post('/', async (request, response) => {
  const createTaskService = new CreateTaskService();
  const { title } = request.body;

  if (!title) {
    return response.status(404).json({ error: 'Task title is required' });
  }

  try {
    const task = await createTaskService.execute({ title });

    delete task.id;
    delete task.created_at;
    delete task.updated_at;

    return response.status(201).json(task);
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server error' });
  }
});

tasksRouter.put('/:id', async (request, response) => {
  const updateTaskService = new UpdateTaskService();

  const { id } = request.params;
  const { status } = request.body;

  if (!status) {
    return response.status(404).json({ error: 'Task status is required' });
  }

  try {
    const task = await updateTaskService.execute({
      id: parseInt(id, 10),
      status,
    });

    delete task.id;
    delete task.created_at;
    delete task.updated_at;

    return response.json(task);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
});

tasksRouter.delete('/:id', async (request, response) => {
  const deleteTaskService = new DeleteTaskService();

  const { id } = request.params;

  try {
    await deleteTaskService.execute(parseInt(id, 10));

    return response.status(204).send();
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
});

export default tasksRouter;
