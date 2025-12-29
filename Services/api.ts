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

    static async login(dataForm: any) {
        try {
            return await api.post<any>(`/user/login`, dataForm).then((results) => {
                return results.data;
            })
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

    static async createUserCus(dataForm: any) {
        try {
            return await api.post<any>(`/user/register`, dataForm).then((results) => {
                return results.data;
            })
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }
}

export { MastStatus, User };