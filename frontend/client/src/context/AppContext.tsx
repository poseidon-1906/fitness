import { createContext, useContext, useEffect, useState } from 'react';
import { type ActivityEntry, type FoodEntry, initialState, type Credentials, type User } from '../types';
import { useNavigate } from 'react-router-dom';
import mockApi from '../assets/mockApi';

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User>(null);
    const [isUserFetched, setIsUserFetched] = useState(false);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry []>([]);
    const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([]);

    const signup = async (credentials: Credentials) => {
        // Signup logic here
        const {data} = await mockApi.auth.register(credentials);
        setUser(data.user);
       if (data?.user?.age && data?.user?.weight && data?.user?.goal) {
        setOnboardingCompleted(true);
         }
         localStorage.setItem('token', data.jwt);
    }

    const login = async (credentials: Credentials) => {
        // Login logic here
        const {data} = await mockApi.auth.login(credentials);
        setUser({...data.user, token: data.jwt});
        if (data?.user?.age && data?.user?.weight && data?.user?.goal) {
            setOnboardingCompleted(true);
             }
        localStorage.setItem('token', data.jwt);
    } 

    const fetchUser = async (token: string) => {
        const {data} = await mockApi.user.me();
        setUser({...data.user, token});
        if (data?.age && data?.weight && data?.goal) {
            setOnboardingCompleted(true);
             }
             setIsUserFetched(true);
    }

    const fetchUserFoodLogs = async () => {
        const {data} = await mockApi.foodLogs.list();
        setAllFoodLogs(data);
    }
    const fetchUserActivityLogs = async () => {
        const {data} = await mockApi.activityLogs.list();
        setAllActivityLogs(data);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            (async () => {
                await fetchUser(token);
                await fetchUserFoodLogs();
                await fetchUserActivityLogs();
            })();
        }
        else {
            setIsUserFetched(true);
        }

    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setOnboardingCompleted(false);
        navigate('/');
    }
    const value = {
        user,
        setUser,
        login,
        signup,
        fetchUser,
        isUserFetched,
        logout,
        onboardingCompleted,
        setOnboardingCompleted,
        allFoodLogs,
        allActivityLogs,
        setAllFoodLogs,
        setAllActivityLogs
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}


export const useAppContext = () => useContext(AppContext);