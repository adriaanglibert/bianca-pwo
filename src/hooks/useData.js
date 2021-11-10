import { USERS_COLLECTION, db } from 'firebase-config';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from 'context';
import { toast } from 'react-hot-toast';

const useData = (dt = null, callback = null) => {
    const d = useContext(UserContext);
    const [data, setData] = useState(dt);

    useEffect(() => {
        async function fetchData() {
            try {
                await db.collection(USERS_COLLECTION).doc(d.uid).update(data);
            } catch (e) {
                toast.error(e.message);
                console.error(e);
            } finally {
                callback();
            }
        };

        if (data) {
            fetchData();
        }
    }, [data, d, dt, callback]);

    return [data, setData];
}

export default useData;