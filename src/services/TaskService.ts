import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todoist:tasks";

export type Task = {
  id: string;
  userId: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

const getAllTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar todas as tarefas:", e);
    return [];
  }
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  const allTasks = await getAllTasks();

  return allTasks.filter((task) => task.userId === userId);
};

const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao guardar tarefas:", e);
  }
};

export const createTask = async (
  title: string,
  userId: string
): Promise<Task> => {
  const allTasks = await getAllTasks();
  const now = new Date().toISOString();

  const newTask: Task = {
    id: new Date().getTime().toString(),
    userId: userId,
    title: title,
    done: false,
    createdAt: now,
    updatedAt: now,
  };

  const newTasksList = [...allTasks, newTask];

  await saveTasks(newTasksList);

  return newTask;
};

export const updateTask = async (
  taskId: string,
  dataToUpdate: Partial<Omit<Task, "id" | "userId">>
): Promise<void> => {
  const allTasks = await getAllTasks();
  const now = new Date().toISOString();

  const updatedTasksList = allTasks.map((task) =>
    task.id === taskId ? { ...task, ...dataToUpdate, updatedAt: now } : task
  );

  await saveTasks(updatedTasksList);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const allTasks = await getAllTasks();
  const remainingTasks = allTasks.filter((task) => task.id !== taskId);
  await saveTasks(remainingTasks);
};
