// Task Interface
export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  createdAt: Date;
}
// Task Interface
export interface createTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'Select Priority';
}
