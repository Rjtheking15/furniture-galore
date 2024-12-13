import { useEffect, useState } from 'react';
import { db } from '../firebase.config.jsx';
import { collection, onSnapshot } from 'firebase/firestore';


// Custom hook to fetch data from a Firestore collection
const useGetData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);

    // Map the snapshot to extract data and add document ID to each item

    useEffect(() => {
         onSnapshot(collectionRef, (snapshot) => {
            setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        });

    }, [collectionRef]); 

    return { data, loading };
};

export default useGetData;
