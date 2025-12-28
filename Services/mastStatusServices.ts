
import { api } from './api';


class MastStatus {
    static async getMastStatusById(id: string) {
        try {
            const res = await api.get(`/mastStatus?id=${id}`);
            return res.data;
        } catch (error) {
            console.error('Error fetching mast status:', error);
            throw error;
        }
    };
}

export { MastStatus };