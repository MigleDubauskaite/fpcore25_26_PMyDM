import axios from "axios";

export const apiClientes = axios.create(
    {
        baseURL: 'https://693fee63993d68afba6a3ed7.mockapi.io/api/v1',
        timeout: 5000,
        headers:{
            'Content-Type' : 'application/json'
        }
    }
);