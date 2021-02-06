import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const createUserService = new CreateUserService();

  const { name, email, password } = request.body;

  const user = await createUserService.execute({ name, email, password });

  delete user.id;
  delete user.password;
  delete user.created_at;
  delete user.updated_at;

  return response.status(201).json(user);
});

export default usersRouter;
