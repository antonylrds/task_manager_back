import { Router } from 'express';

import CreateTaskService from '../services/CreateTaskService';
import ListTaskService from '../services/ListTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';

const tasksRouter = Router();

tasksRouter.get('/', async (request, response) => {
  const listTaskService = new ListTaskService();

  const tasks = await listTaskService.execute();

  return response.json(tasks);
});

tasksRouter.post('/', async (request, response) => {
  const createTaskService = new CreateTaskService();
  const { title } = request.body;

  const task = await createTaskService.execute({ title });

  delete task.id;

  return response.status(201).json(task);
});

tasksRouter.put('/:id', async (request, response) => {
  const updateTaskService = new UpdateTaskService();

  const { id } = request.params;
  const { status } = request.body;

  const task = await updateTaskService.execute({
    id: parseInt(id, 10),
    status,
  });

  delete task.id;

  return response.json(task);
});

tasksRouter.delete('/:id', async (request, response) => {
  const deleteTaskService = new DeleteTaskService();

  const { id } = request.params;

  await deleteTaskService.execute(parseInt(id, 10));

  return response.status(204).send();
});

export default tasksRouter;
