export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
  }
  
  // Mock DB (array of users)
  export const users: User[] = [];
  
  
  export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
  };
  
  export const findUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };