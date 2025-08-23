import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@todoist:users';

export type User = {
  id: string;
  name: string;
  email: string;
  age: string;
  passwordHash: string; 
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar usuários:", e);
    return [];
  }
};

const saveUsers = async (users: User[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USER_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar usuários:", e);
  }
};

export const login = async (email: string, password: string): Promise<User | null> => {
  const users = await getUsers();

  const userFound = users.find(user => user.email.toLowerCase() === email.toLowerCase());
  if (!userFound) {
    return null;
  }
  if (userFound.passwordHash === password) {
    return userFound; 
  }

  return null;
};

  export const register = async (userData: Omit<User, 'id' | 'passwordHash'> & { password: string }): Promise<User | { error: string }> => {
  const users = await getUsers();


  if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
    return { error: 'Este e-mail já está em uso.' };
  }

  const newUser: User = {
    id: new Date().getTime().toString(),
    name: userData.name,
    email: userData.email,
    age: userData.age,
    passwordHash: userData.password, 
  };

  const newUserList = [...users, newUser];
  await saveUsers(newUserList);

  return newUser;
};