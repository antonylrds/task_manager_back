import { Router } from 'express';

import CreateTaskService from '../services/CreateTaskService';

const tasksRouter = Router();

tasksRouter.get('/', (request, response) => {
  return response.json({ msg: 'Ok Get' });
});

tasksRouter.post('/', async (request, response) => {
  const createTaskService = new CreateTaskService();
  const { title } = request.body;

  const task = await createTaskService.execute({ title });

  return response.json({ task });
});

tasksRouter.put('/', (request, response) => {
  return response.json({ msg: 'Ok Put' });
});

tasksRouter.delete('/', (request, response) => {
  return response.json({ msg: 'Ok Delete' });
});

export default tasksRouter;
