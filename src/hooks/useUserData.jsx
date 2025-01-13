import { useState, useEffect } from 'react';
import userServices from '../services/user.services';
import { useParams } from 'react-router-dom';

const useUserData = (userId, loggedUser) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const idToFetch = userId || loggedUser?._id;
        if (!idToFetch) {
            setError('No user ID available');
            setLoading(false);
            return;
        }

        const fetchUserData = () => {
            userServices
                .getUser(idToFetch)
                .then((response) => {
                    const { data: userData } = response;
                    setData(userData);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Error fetching user data');
                    setLoading(false);
                });
        };

        fetchUserData();
    }, [userId, loggedUser]);

    return { data, loading, error };
};

export default useUserData;

