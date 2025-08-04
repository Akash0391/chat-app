import { login, register } from "@/services/authService";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { connectSocket, disconnectSocket } from "@/socket/socket";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {}, //login
  signUp: async () => {}, //register
  signOut: async () => {}, //logout
  updateToken: async () => {}, //update token
  //checkEmailExists: async () => false, //check email  
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null); //token
  const [user, setUser] = useState<UserProps | null>(null); //user  
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async (): Promise<void> => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken)
        if(decoded.exp && decoded.exp < Date.now() / 1000) {
          await AsyncStorage.removeItem("token");
          gotoWelcomePage();
          return;
        }
        setToken(storedToken);
        await connectSocket();  
        setUser(decoded.user);    
        gotoHomePage();
      } catch (error) {
        gotoWelcomePage();
        console.log("Error loading user", error);
      }
    } else {
      gotoWelcomePage();
    }
  };
  
  const gotoWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 2000);
  }

  const gotoHomePage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");
    }, 2000);
  }

  const updateToken = async (token: string) => {
    //update token
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      //decode token
      const decoded = jwtDecode<DecodedTokenProps>(token);
      setUser(decoded.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response.token);
    await connectSocket();  
    router.replace("/(main)/home");
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null
  ) => {
    const response = await register(email, password, name, avatar);
    await updateToken(response.token);
    await connectSocket();    
    router.replace("/(main)/home");
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    disconnectSocket();
    router.replace("/(auth)/welcome");
  };

  // const checkEmailExists = async (email: string): Promise<boolean> => {
  //   try {
  //     const response = await checkEmail(email);
  //     return response.exists;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  return (
    <AuthContext.Provider
        value={{ token, user, signIn, signUp, signOut, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
