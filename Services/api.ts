import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

class MastStatus {
    static async getMastStatusById(id: string) {
        try {
            return await api.get(`/mastStatus?id=${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    };
}

class User {

    static async loginUser(dataForm: any) {
        try {
            return await api.post<any>(`/auth/login`, dataForm).then((results) => {
                return results.data;
            })
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

    static async registerUser(dataForm: any) {
        try {
            return await api.post<any>(`/auth/register`, dataForm).then((results) => {
                return results.data;
            })
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }
}

export { MastStatus, User };