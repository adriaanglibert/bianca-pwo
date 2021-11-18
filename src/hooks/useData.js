import { USERS_COLLECTION, db } from 'firebase-config';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from 'context';
import { toast } from 'react-hot-toast';

const useData = (dt = null, callback = null) => {
    const [d, setD] = useContext(UserContext);
    const [data, setData] = useState(dt);

    console.log('Data ✨', d);

    useEffect(() => {
        async function postData() {
            try {
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
            }
        };

        if (data) {
            postData();
        }
    }, [data, d, dt, callback, setD]);

    return [data, setData];
}

export default useData;