import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterTaskDTO } from '../../domain';
import { TasksService } from '../service/tasks.service';
import { AuthGuard } from 'src/modules/auth/presentation/guard/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTaskByID(@Param('id') taskId) {
    return this.tasksService.getTaskByID(taskId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getTasks(@Req() req) {
    const userID = req.user.sub;

    return this.tasksService.getTasksList(userID);
  }

  @UseGuards(AuthGuard)
  @Post()
  async registerTask(@Req() req, @Body() registerTaskData: RegisterTaskDTO) {
    const userID = req.user.sub;

    return this.tasksService.registerTask(registerTaskData, userID);
  }
}
