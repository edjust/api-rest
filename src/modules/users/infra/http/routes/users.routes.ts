import { Router } from 'express';
import { ListUsersController } from '../controllers/UsersController';

export const usersRouter = Router();

const listUsersController = new ListUsersController();

usersRouter.get('/', listUsersController.index);
