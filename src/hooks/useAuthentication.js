import { HOME } from "../constants/routes";
import { auth } from "../firebase-config";
import { toast } from 'react-hot-toast';
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
            toast.error(error);
            return;
        }

        if (!user) {
            console.log('No user');
        };

        // return history.replace(path);
    }, [user, loading, error, history, path]);

    return [user, loading, error];
}

export default useAuthentication