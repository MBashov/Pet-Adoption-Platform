import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({ children }) {

    const [authData, setAuthData] = usePersistedState('auth', {});

    const authHandler = (resultData) => {
        setAuthData(resultData);
    }

    const logoutHandler = () => {
        setAuthData({});
    }

    return (
        <UserContext.Provider value={{ ...authData, authHandler, logoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}