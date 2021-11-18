import { HOME } from "../constants/routes";
import { auth } from "../firebase-config";
import { toast } from 'react-hot-toast';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const useAuthentication = (path = HOME) => {
    const [user, loading, error] = useAuthState(auth);

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
            console.log('There is no user signed in.', loading);
        };
    }, [user, loading, error, path]);

    return [user, loading, error];
}

export default useAuthentication