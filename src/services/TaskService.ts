import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todoist:tasks';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string; 
  updatedAt: string;
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    console.log("DADOS LIDOS DO STORAGE:", jsonValue);
    
    if (jsonValue === null) {
      return [];
    }
    
    return JSON.parse(jsonValue);
  } catch (e) {
    
    console.error("Erro ao buscar tarefas:", e);
    return [];
  }
};

const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    
    const jsonValue = JSON.stringify(tasks);
    console.log("DADOS SENDO SALVOS NO STORAGE:", jsonValue);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar tarefas:", e);
  }
};

export const createTask = async (title: string): Promise<Task> => {
  
  const currentTasks = await getTasks();
  const now = new Date().toISOString(); 

  
  const newTask: Task = {
    id: new Date().getTime().toString(), 
    title: title,
    done: false, 
    createdAt: now,
    updatedAt: now,
  };

  const newTasksList = [...currentTasks, newTask];

  await saveTasks(newTasksList);

  return newTask;
};

export const updateTask = async (taskId: string, dataToUpdate: Partial<Omit<Task, 'id'>>): Promise<void> => {
  const currentTasks = await getTasks();
  const now = new Date().toISOString();

  
  const updatedTasksList = currentTasks.map(task => 
    task.id === taskId 
      ? { ...task, ...dataToUpdate, updatedAt: now } 
      : task 
  );

  await saveTasks(updatedTasksList);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const currentTasks = await getTasks();

  
  const remainingTasks = currentTasks.filter(task => task.id !== taskId);

  await saveTasks(remainingTasks);
};