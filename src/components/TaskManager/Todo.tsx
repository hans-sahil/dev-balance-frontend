import { Calendar, Star, Timer } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import PriorityTag from './PriorityTag';
import type { TodoType } from '@/pages/TaskManager';

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  const { title, description, is_completed, is_starred, subtasks, priority } = todo;
  return (
    <div className="border border-gray-200 p-4 rounded-md">
      <div className="flex items-baseline gap-3">
        <div className="flex items-center gap-3 relative top-1">
          <Checkbox checked={is_completed} className="w-5 h-5" />
          <Star
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

          {subtasks && subtasks.length > 0 && (
            <div>
              <div className="flex justify-between mb-1.5 text-sm">
                <span>Progess</span>
                <span>50%</span>
              </div>
              <Progress indicatorColor="bg-blue-500" value={50} />
            </div>
          )}

          {/* Subtasks */}
          {todo.subtasks && todo.subtasks.length > 0 && (
            <div className="mb-4 p-3 bg-indigo-50 rounded-xl">
              <div className="space-y-2">
                {todo.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center space-x-2">
                    <Checkbox checked={subtask.is_completed} className="h-4 w-4 border-gray-400" />
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
            {todo.tags?.map((tag, index) => (
              <Badge key={index} variant={'outline'} className="text-xs border-gray-300">
                #{tag}
              </Badge>
            ))}
            {todo.dueDate && (
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                <Calendar className="h-3 w-3 mr-1" />
                {/* {todo.dueDate.toLocaleDateString()} */}
              </Badge>
            )}
            {todo.estimatedTime && (
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                <Timer className="h-3 w-3 mr-1" />
                {todo.estimatedTime}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
