import { ListPlus, Tag, Timer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datePicker';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface AddTaskProps {
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const AddTaskDialog: React.FC<AddTaskProps> = ({ open, onChange }) => {
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <form className="flex flex-col gap-5">
            <div className="space-y-2">
              <Label htmlFor="task-title">
                Task Title <span className="text-red-700">*</span>
              </Label>
              <Input id="task-title" placeholder="What needs to be done ?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea placeholder="Add more details about your task..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      <div className="h-3 w-3 rounded-full bg-red-600"></div>High
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>Medium
                    </SelectItem>
                    <SelectItem value="low">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="estimated-time">Estimated Time (min)</Label>
                <div className="relative">
                  <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input type="number" min={0} id="estimated-time" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="tags" className="pl-10" placeholder="development,client,etc" />
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-end">
                <Label>Subtasks</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setShowSubtaskInput(true)}
                >
                  <ListPlus className="h-4 w-4 mr-1" />
                  Add Subtask
                </Button>
              </div>
            </div>

            {showSubtaskInput && (
              <div className="flex gap-2 h-8 items-center">
                <Input
                  placeholder="Enter subtask..."
                  className="flex-1 h-8 border-gray-200 focus:border-blue-500 transition-all duration-200"
                  autoFocus
                />
                <Button
                  type="button"
                  className="px-2 h-7  bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  Add
                </Button>
                <Trash2 />
              </div>
            )}
          </form>
        </div>
        <DialogFooter className="mt-4">
          {/* <Button className="text-red-500 border-red-500" variant="outline">
            Cancel
          </Button> */}
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
