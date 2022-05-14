import { Router } from 'express';
import { FindAllUsersController } from '../controllers/UsersController';

export const usersRouter = Router();

const findAllUsersController = new FindAllUsersController();

usersRouter.get('/', findAllUsersController.index);
