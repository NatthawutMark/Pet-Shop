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
            // const res = await api.get(`/mastStatus?id=${id}`);
            // return res;
            return await api.get(`/mastStatus?id=${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    };
}

class MastItem {


}

export { MastStatus, MastItem };