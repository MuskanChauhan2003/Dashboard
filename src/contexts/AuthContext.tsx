import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  categories: {
    technology: boolean;
    sports: boolean;
    entertainment: boolean;
    finance: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  preferences: UserPreferences;
  login: (email: string, password: string, name?: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const defaultPreferences: UserPreferences = {
  darkMode: false,
  notifications: true,
  categories: {
    technology: true,
    sports: true,
    entertainment: false,
    finance: true,
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Load user data from localStorage on mount
      const savedUser = localStorage.getItem('contenthub_user');
      const savedPreferences = localStorage.getItem('contenthub_preferences');
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
      
      if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        setPreferences(parsedPreferences);
        
        // Apply dark mode immediately
        if (parsedPreferences.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
      // Reset to defaults if there's an error
      setUser(null);
      setPreferences(defaultPreferences);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      // Simulate API call
      const users = JSON.parse(localStorage.getItem('contenthub_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (existingUser) {
        const userData = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name
        };
        setUser(userData);
        localStorage.setItem('contenthub_user', JSON.stringify(userData));
        
        // Load user's preferences
        const userPreferences = localStorage.getItem(`contenthub_preferences_${existingUser.id}`);
        if (userPreferences) {
          const parsedPreferences = JSON.parse(userPreferences);
          setPreferences(parsedPreferences);
          localStorage.setItem('contenthub_preferences', JSON.stringify(parsedPreferences));
          
          // Apply dark mode
          if (parsedPreferences.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('contenthub_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        return false; // User already exists
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name
      };
      
      users.push(newUser);
      localStorage.setItem('contenthub_users', JSON.stringify(users));
      
      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      
      setUser(userData);
      localStorage.setItem('contenthub_user', JSON.stringify(userData));
      
      // Set default preferences for new user
      setPreferences(defaultPreferences);
      localStorage.setItem('contenthub_preferences', JSON.stringify(defaultPreferences));
      localStorage.setItem(`contenthub_preferences_${newUser.id}`, JSON.stringify(defaultPreferences));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('contenthub_user');
    localStorage.removeItem('contenthub_preferences');
    document.documentElement.classList.remove('dark');
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    try {
      const updatedPreferences = { ...preferences, ...newPreferences };
      setPreferences(updatedPreferences);
      localStorage.setItem('contenthub_preferences', JSON.stringify(updatedPreferences));
      
      if (user) {
        localStorage.setItem(`contenthub_preferences_${user.id}`, JSON.stringify(updatedPreferences));
      }
      
      // Apply dark mode changes immediately
      if ('darkMode' in newPreferences) {
        if (newPreferences.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const value: AuthContextType = {
    user,
    preferences,
    login,
    signup,
    logout,
    updatePreferences,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
