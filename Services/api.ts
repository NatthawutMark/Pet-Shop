import axios from 'axios';
import { requestFormReset } from 'react-dom';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

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

class MastPet {
    static async getAll() {
        try {
            return await api.get(`/mastPet`).then((response) => {
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    };
}

class MastCategories {
    static async getAll() {
        try {
            return await api.get(`/mastCategories`).then((response) => {
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    };

    static async insertData(data: any) {
        try {
            return await api.post<any>(`/mastCategories`, data).then((response) => {
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    };
}

class MastItem {
    static async insertItem(data: any) {
        try {
            return api.post<any>('/mastItem', data).then((res) => {
                console.log('check api:', res);

                return res.data;
            })

        }
        catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    }
}


export { MastStatus, User, MastPet, MastCategories, MastItem };