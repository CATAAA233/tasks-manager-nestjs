import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterTaskDTO, UpdateTaskDTO } from '../../domain';
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

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTask(@Param('id') taskId, @Body() taskData: UpdateTaskDTO) {
    return this.tasksService.updateTask(taskId, taskData);
  }
}
