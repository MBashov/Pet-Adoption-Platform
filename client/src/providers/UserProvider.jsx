import PropTypes from 'prop-types';
import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";
import { getAll } from '../api/adoptApi';

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

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};