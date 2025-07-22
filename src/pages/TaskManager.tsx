import CommonPage from '@/components/layouts/CommonPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  TrendingUp,
  Circle,
  CheckCircle2,
  Star,
  Timer,
  AlertTriangle,
  Clock,
  Plus,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Todo from '@/components/TaskManager/Todo';
import AddTaskDialog from '@/components/TaskManager/AddTaskDialog';
import { useLayoutEffect, useState } from 'react';

export interface TodoType {
  title: string;
  description?: string;
  is_starred?: boolean;
  is_completed?: boolean;
  priority: 'high' | 'medium' | 'low';
  subtasks?: { id: number; title: string; is_completed?: boolean }[];
  dueDate?: Date;
  tags?: string[];
  estimatedTime?: number;
}

const TaskManager = () => {
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<TodoType>>([]);

  useLayoutEffect(() => {
    const existingTasks = localStorage.getItem('tasks');
    const parsedExistingTasks = existingTasks ? JSON.parse(existingTasks) : [];
    setTasks(parsedExistingTasks);
  }, []);
  return (
    <CommonPage>
      <div className="p-5 flex flex-col gap-6">
        {/* Hero Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-baseline gap-6 items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold e">Task Manager</h1>
              <p className="text-secondary-foreground">Professional productivity workspace</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-2 rounded-full bg-green-100">
                <TrendingUp className="text-green-300 w-[1.125rem] h-[1.125rem]" />
              </div>
              <span className="text-md ">Completion Rate</span>
              <span className="text-lg font-bold ">55%</span>
            </div>

            {/* Create Task Button */}
            <Button
              className="w-fit flex items-center gap-1.5 mx-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white/90 cursor-pointer"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus /> Create New Task
            </Button>
          </div>

          {/* count of active, completed, starred tasks and the remaining time for active tasks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <div className="bg-gray-50 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-cyan-100 rounded-full">
                  <Circle className="h-5 w-5 text-cyan-300" />
                </div>
                <span className="font-medium ">Active Tasks</span>
              </div>
              <div className="text-2xl font-bold pl-3">2</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
                <span className="font-medium">Completed</span>
              </div>
              <div className="text-2xl font-bold pl-3">4</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <span className="font-medium">Starred</span>
              </div>
              <div className="text-2xl font-bold pl-3">1</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Timer className="h-5 w-5 text-purple-400" />
                </div>
                <span className="font-medium">Time Remaining</span>
              </div>
              <div className="text-2xl font-bold pl-3">12 hrs 27 mins</div>
            </div>
          </div>
        </div>

        {/* Task Priority Priority Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-lg bg-rose-100/70">
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-500 rounded-lg shadow-lg">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-red-800 text-lg">High Priority</p>
                    <p className="text-2xl font-bold text-red-900 mt-1">1</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-yellow-100">
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-500 rounded-lg shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-yellow-800 text-lg">Medium Priority</p>
                    <p className="text-2xl font-bold text-yellow-900 mt-1">1</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-green-100">
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-500 rounded-lg shadow-lg">
                    <Circle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800 text-lg">Low Priority</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">0</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="all" className="shadow-md bg-white rounded-md gap-6 pb-6">
            <div className="p-6 bg-gray-50">
              <TabsList className="h-auto grid grid-cols-4 w-full max-w-[600px] bg-white py-1.5">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All Tasks ({tasks.length})
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Active ({tasks.filter((todo: TodoType) => !todo.is_completed).length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Completed ({tasks.filter((todo: TodoType) => todo.is_completed).length})
                </TabsTrigger>
                <TabsTrigger
                  value="starred"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Starred ({tasks.filter((todo: TodoType) => todo.is_starred).length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="px-6">
              <div className="grid grid-cols-1 gap-4">
                {tasks.map((todo, index) => (
                  <Todo key={index} todo={todo} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active" className="px-6">
              <div className="grid grid-cols-1 gap-4">
                {tasks
                  .filter((todo: TodoType) => !todo.is_completed)
                  .map((todo, index) => (
                    <Todo key={index} todo={todo} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="px-6">
              <div className="grid grid-cols-1 gap-4">
                {tasks
                  .filter((todo: TodoType) => todo.is_completed)
                  .map((todo, index) => (
                    <Todo key={index} todo={todo} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="starred" className="px-6">
              {tasks
                .filter((todo: TodoType) => todo.is_starred)
                .map((todo, index) => (
                  <Todo key={index} todo={todo} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddTaskDialog
        onChange={setIsAddingTask}
        open={isAddingTask}
        onAddTask={(task: TodoType) => {
          const existingTasks = localStorage.getItem('tasks');
          const parsedExistingTasks = existingTasks ? JSON.parse(existingTasks) : [];
          localStorage.setItem('tasks', JSON.stringify([...parsedExistingTasks, task]));
          setTasks((prev: Array<TodoType>) => [...prev, task]);
        }}
      />
    </CommonPage>
  );
};

export default TaskManager;
