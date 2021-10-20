import { HOME } from "../constants/routes";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useAuthentication = (path = HOME) => {
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (loading) {
            console.log('Loading...')
            // maybe trigger a loading screen
            return;
        }

        if (error) {
            // trigger error screen
            alert(error);
            return;
        }

        if (user) {
            return history.replace(HOME);
        };

        return history.replace(path);
    }, [user, loading, error, history, path]);

    return [user, loading, error];
}

export default useAuthentication