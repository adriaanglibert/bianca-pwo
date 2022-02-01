import { USERS_COLLECTION, db } from 'firebase-config';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from 'context';
import { toast } from 'react-hot-toast';

const useData = (dt = null, callback = null, document) => {
    const [d, setD] = useContext(UserContext);
    const [data, setData] = useState(dt);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function postData() {
            try {
                setLoading(true);
                const doc = document ? document : db.collection(USERS_COLLECTION).doc(d.uid);
                await doc.set(data, {merge: true});

                setD({
                    ...d,
                    ...data
                });
            } catch (e) {
                toast.error(e.message);
                console.error(e);
            } finally {
                if (callback) {
                    callback();
                }
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
    }, [data, d, dt, callback, setD, document]);

    return [data, setData, loading];
}

export default useData;