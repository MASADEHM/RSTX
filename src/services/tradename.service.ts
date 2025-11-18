import axios from "axios";

const apiUrl="http://localhost:8000/tradename"

export interface TradeNamePayload {
    messages: string[]
    thread_id: string
}

export const tradenameService = {

    check: async (payload: TradeNamePayload) => {
        console.log(["payload", payload]); 
        const response = await axios.post(`${apiUrl}`, payload);
        return response.data;
    }
}

