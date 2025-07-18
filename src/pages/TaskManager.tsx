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
import { useState } from 'react';

type Priority = 'high' | 'medium' | 'low';
const todos = [
  {
    title: 'Implement user authentication system',
    description: `Build secure login/signup with JWT tokens and password hashing. This includes setting
              up middleware, creating secure routes, implementing password validation, and ensuring
              proper session management.`,
    is_starred: true,
    is_completed: false,
    priority: 'high' as Priority,
    subtasks: [
      { id: 1, title: 'Setup JWT library', is_completed: true },
      { id: 2, title: 'Create auth middleware', is_completed: true },
      { id: 3, title: 'Build login component', is_completed: false },
      { id: 4, title: 'Add password validation', is_completed: false },
    ],
    tags: ['backend', 'security', 'auth'],
    estimatedTime: 480,
    dueDate: new Date(Date.now() + 86400000),
  },
  {
    title: 'Design system documentation',
    description:
      'Create comprehensive documentation for the design system components including color palettes, typography guidelines, spacing rules, and component usage examples. This will help maintain consistency across the entire application.',
    is_starred: false,
    is_completed: false,
    priority: 'low' as Priority,
    subtasks: [
      { id: 1, title: 'Component guidelines', is_completed: true },
      { id: 2, title: 'Color palette docs', is_completed: false },
      { id: 3, title: 'Typography guide', is_completed: false },
    ],
    tags: ['backend', 'security', 'auth'],
    estimatedTime: 480,
    dueDate: new Date(Date.now() + 86400000),
  },
  {
    title: 'Performance optimization',
    description:
      'optimize app performance and reduce bundle size through code splitting, lazy loading, and asset optimization.',
    is_starred: false,
    is_completed: true,
    priority: 'medium' as Priority,
    tags: ['backend', 'security', 'auth'],
    estimatedTime: 480,
    dueDate: new Date(Date.now() + 86400000),
  },
];

const TaskManager = () => {
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
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
                  All Tasks (7)
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Active (2)
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Completed (4)
                </TabsTrigger>
                <TabsTrigger
                  value="starred"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Starred (1)
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="px-6">
              <div className="grid grid-cols-1 gap-4">
                {todos.map((todo, index) => (
                  <Todo key={index} todo={todo} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active" className="px-6">
              <div className="grid grid-cols-1 gap-4">
                {todos.slice(0, 1).map((todo, index) => (
                  <Todo key={index} todo={todo} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="px-6">
              <div className="grid grid-cols-1 gap-4">
                {todos.slice(0, 2).map((todo, index) => (
                  <Todo key={index} todo={todo} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="starred" className="px-6">
              starred tasks.
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddTaskDialog onChange={setIsAddingTask} open={isAddingTask} />
    </CommonPage>
  );
};

export default TaskManager;
