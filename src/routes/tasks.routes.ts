import { Router } from 'express';

const tasksRouter = Router();

tasksRouter.get('/', (request, response) => {
  return response.json({ msg: 'Ok Get' });
});

tasksRouter.post('/', (request, response) => {
  return response.json({ msg: 'Ok Post' });
});

tasksRouter.put('/', (request, response) => {
  return response.json({ msg: 'Ok Put' });
});

tasksRouter.delete('/', (request, response) => {
  return response.json({ msg: 'Ok Delete' });
});

export default tasksRouter;
