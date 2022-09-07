import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post<AuthState>('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut(): Promise<void> {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const selectedUser = await userCollection.find(data.id);
        await selectedUser.destroyPermanently();
      });
      setData({} as User);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User): Promise<void> {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });

        setData(user);
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData(): Promise<void> {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.common.authorization = `Bearer ${userData.token}`;

        setData(userData);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
