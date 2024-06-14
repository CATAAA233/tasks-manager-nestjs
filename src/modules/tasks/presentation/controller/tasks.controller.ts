import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterTaskDTO } from '../../domain';
import { TasksService } from '../service/tasks.service';
import { AuthGuard } from 'src/modules/auth/presentation/guard/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  async registerTask(@Req() req, @Body() registerTaskData: RegisterTaskDTO) {
    const userID = req.user.sub;

    return this.tasksService.registerTask(registerTaskData, userID);
  }
}
