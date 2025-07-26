import { ListPlus, Tag, Timer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datePicker';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { NewTask } from '@/pages/TaskManager';

interface AddTaskProps {
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  onAddTask: (task: NewTask) => void;
}

const AddTaskDialog: React.FC<AddTaskProps> = ({ open, onChange, onAddTask }) => {
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [subtaskText, setSubtaskText] = useState('');

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      setSubtasks((prev) => [...prev, subtaskText]);
      setSubtaskText('');
      setShowSubtaskInput(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <Formik
            initialValues={{
              title: '',
              description: '',
              priority: '' as 'high' | 'low' | 'medium',
              dueDate: undefined,
              estimatedTime: 0,
              tags: '',
              subtasks: [] as Array<{ id: number; title: string }>, // for now using this because storing the tasks in localStorage. will remove this when use db
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Title is required'),
              priority: Yup.string()
                .oneOf(['high', 'medium', 'low'], 'Select a priority')
                .required('Priority is required'),
            })}
            onSubmit={(values) => {
              values.subtasks = subtasks.map((subtask, index) => ({ id: index, title: subtask }));
              const tagsArray = values.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag);

              const taskToStore = {
                ...values,
                tags: tagsArray,
              };
              onAddTask(taskToStore);
              setSubtasks([]);
              onChange(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Task Title <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="What needs to be done ?"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && (
                    <p className="text-xs text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add more details about your task..."
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      onValueChange={(val) => setFieldValue('priority', val)}
                      value={values.priority}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">
                          <div className="h-3 w-3 rounded-full bg-red-600 inline-block mr-2" />
                          High
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="h-3 w-3 rounded-full bg-yellow-500 inline-block mr-2" />
                          Medium
                        </SelectItem>
                        <SelectItem value="low">
                          <div className="h-3 w-3 rounded-full bg-green-500 inline-block mr-2" />
                          Low
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.priority && touched.priority && (
                      <p className="text-xs text-red-500">{errors.priority}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <DatePicker
                      date={values.dueDate}
                      onChange={(val: Date) => {
                        setFieldValue('dueDate', val);
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedTime">Estimated Time (min)</Label>
                    <div className="relative">
                      <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="number"
                        min={0}
                        id="estimatedTime"
                        name="estimatedTime"
                        className="pl-10"
                        value={values.estimatedTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="tags"
                        name="tags"
                        className="pl-10"
                        placeholder="development,client,etc"
                        value={values.tags}
                        onChange={handleChange}
                      />
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
                      value={subtaskText}
                      onChange={(e) => setSubtaskText(e.target.value)}
                      autoFocus
                    />
                    <Button
                      type="button"
                      className="px-2 h-7 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleAddSubtask}
                    >
                      Add
                    </Button>
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => {
                        setShowSubtaskInput(false);
                        setSubtaskText('');
                      }}
                    />
                  </div>
                )}

                {subtasks.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                    {subtasks.map((sub, index) => (
                      <li key={index}>{sub}</li>
                    ))}
                  </ul>
                )}

                <DialogFooter className="mt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Create Task
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
