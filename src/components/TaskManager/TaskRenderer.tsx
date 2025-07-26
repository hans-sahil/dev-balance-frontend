import { Calendar, Star, Timer, EllipsisVertical, PencilIcon, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import PriorityTag from './PriorityTag';
import type { Subtask, Task } from '@/pages/TaskManager';
import IconButton from '../common/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { Dispatch, SetStateAction } from 'react';
import { enqueueSnackbar } from 'notistack';
import convertMinutesToHoursAndMinutes from '@/utils/convertMinToHoursAndMin';

interface TaskRendererProps {
  task: Task;
  setTasks: Dispatch<SetStateAction<Array<Task>>>;
}

const getProgress = (subtasks: Subtask[]): number => {
  const progress =
    (subtasks.filter((subtask) => subtask.is_completed).length / subtasks.length) * 100;
  if (Number.isInteger(progress)) return progress;
  return parseFloat(progress.toFixed(2));
};

const TaskRenderer = ({ task, setTasks }: TaskRendererProps) => {
  const { title, description, is_completed, is_starred, subtasks, priority } = task;

  const onRemoveTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    const existingTasks = localStorage.getItem('tasks');
    const parsedExistingTasks = existingTasks ? JSON.parse(existingTasks) : [];
    localStorage.setItem(
      'tasks',
      JSON.stringify(parsedExistingTasks.filter((t: Task) => t.id !== task.id))
    );
    enqueueSnackbar('Task removed successfully.', { variant: 'success' });
  };

  const updateSubtaskStatus = (subTaskId: number, value: boolean) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          const subtasks = task.subtasks;
          const newTask = {
            ...task,
            subtasks: subtasks?.map((subtask) => {
              if (subtask.id === subTaskId) {
                return { ...subtask, is_completed: value };
              }
              return subtask;
            }),
          };
          const existingTasks = localStorage.getItem('tasks');
          const parsedExistingTasks = existingTasks ? JSON.parse(existingTasks) : [];
          localStorage.setItem(
            'tasks',
            JSON.stringify(
              parsedExistingTasks.map((t: Task) => {
                if (t.id === task.id) {
                  return newTask;
                }
                return t;
              })
            )
          );
          return newTask;
        }
        return t;
      })
    );
  };

  const starredOrUnStarredTask = () => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          return { ...t, is_starred: !t.is_starred };
        }
        return t;
      })
    );
    const existingTasks = localStorage.getItem('tasks');
    const parsedExistingTasks = existingTasks ? JSON.parse(existingTasks) : [];
    localStorage.setItem(
      'tasks',
      JSON.stringify(
        parsedExistingTasks.map((t: Task) => {
          if (t.id === task.id) {
            return { ...t, is_starred: !t.is_starred };
          }
          return t;
        })
      )
    );
  };

  return (
    <div className="border border-gray-200 p-4 rounded-md">
      <div className="flex items-baseline gap-3">
        <div className="flex items-center gap-3 relative top-1">
          <Checkbox checked={is_completed} className="w-5 h-5" />
          <Star
            onClick={starredOrUnStarredTask}
            className={`h-5 w-5 ${
              is_starred
                ? 'text-yellow-500 hover:text-yellow-600 fill-current'
                : 'text-gray-400 hover:text-yellow-500'
            }`}
          />
        </div>
        <div className="flex-1 space-y-4">
          <h3
            className={`text-lg font-semibold leading-tight ${
              is_completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {title}
          </h3>
          {task.description && (
            <div
              className={` p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border-l-4 border-indigo-200`}
            >
              <p
                className={`leading-relaxed ${
                  is_completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {description}
              </p>
            </div>
          )}

          {subtasks && subtasks.length > 0 && (
            <div>
              <div className="flex justify-between mb-1.5 text-sm">
                <span>Progess</span>
                <span>{getProgress(task.subtasks || [])}%</span>
              </div>
              <Progress indicatorColor="bg-blue-500" value={getProgress(task.subtasks || [])} />
            </div>
          )}

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mb-4 p-3 bg-indigo-50 rounded-xl">
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={subtask.is_completed}
                      onCheckedChange={(value: boolean) => {
                        updateSubtaskStatus(subtask.id, value);
                      }}
                      className="h-4 w-4 border-gray-400"
                    />
                    <span
                      className={`text-sm ${
                        subtask.is_completed ? 'line-through text-gray-500' : 'text-gray-700'
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags and Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <PriorityTag priority={priority} />
            {task.tags?.map((tag, index) => (
              <Badge key={index} variant={'outline'} className="text-xs border-gray-300">
                #{tag}
              </Badge>
            ))}
            {task.dueDate && (
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                <Calendar className="h-3 w-3 mr-1" />
                {/* {task.dueDate.toLocaleDateString()} */}
              </Badge>
            )}
            {!!task.estimatedTime && task.estimatedTime > 0 && (
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                <Timer className="h-3 w-3 mr-1" />
                {convertMinutesToHoursAndMinutes(task.estimatedTime)}
              </Badge>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <IconButton>
                <EllipsisVertical className="w-5 h-5" />
              </IconButton>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-1.5 items-center">
                <PencilIcon /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-1.5 items-center" onClick={onRemoveTask}>
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TaskRenderer;
