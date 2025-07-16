import CommonPage from '@/components/layouts/CommonPage';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Circle, CheckCircle2, Star, Timer, AlertTriangle, Clock } from 'lucide-react';

const TaskManager = () => {
  return (
    <CommonPage>
      <div className="p-5 flex flex-col gap-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-lg p-8">
          <div className="flex justify-baseline">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">Task Manager</h1>
              <p className="text-lg text-blue-100">Professional productivity workspace</p>
            </div>
            <div className="text-right">
              <div className="flex gap-2 items-center mb-2">
                <TrendingUp className="text-green-300" />
                <span className="text-lg text-blue-100">Completion Rate</span>
              </div>
              <div className="text-2xl font-bold text-white">55%</div>
            </div>
          </div>

          {/* count of active, completed, starred tasks and the remaining time for active tasks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Circle className="h-5 w-5 text-cyan-300" />
                <span className="font-medium text-blue-100">Active Tasks</span>
              </div>
              <div className="text-2xl font-bold text-white pl-1">2</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <span className="font-medium text-blue-100">Completed</span>
              </div>
              <div className="text-2xl font-bold text-white pl-1">4</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="font-medium text-blue-100">Starred</span>
              </div>
              <div className="text-2xl font-bold text-white pl-1">1</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="h-5 w-5 text-purple-300" />
                <span className="font-medium text-blue-100">Time Remaining</span>
              </div>
              <div className="text-2xl font-bold text-white pl-1">12 hrs 27 mins</div>
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
      </div>
    </CommonPage>
  );
};

export default TaskManager;
