import { USERS_COLLECTION, db } from 'firebase-config';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from 'context';
import { toast } from 'react-hot-toast';

const useData = (dt = null, callback = null) => {
    const [d, setD] = useContext(UserContext);
    const [data, setData] = useState(dt);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function postData() {
            try {
                setLoading(true);
                await db.collection(USERS_COLLECTION).doc(d.uid).update(data);

                setD({
                    ...d,
                    ...data
                });
            } catch (e) {
                toast.error(e.message);
                console.error(e);
            } finally {
                callback();
                setLoading(false);
            }
        };

        if (data) {
            postData();
        }

        return () => {
            setData(dt);
            setLoading(false);
        }
    }, [data, d, dt, callback, setD]);

    return [data, setData, loading];
}

export default useData;