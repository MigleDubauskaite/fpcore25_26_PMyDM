import axios from "axios";

export const apiUsers = axios.create(
    {
        baseURL: 'https://jsonplaceholder.typicode.com',
        timeout: 5000,
        headers:{
            'Content-Type': 'application/json'
        }
    }
);

export const apiProducts = axios.create(
    {
        baseURL: 'https://fakestoreapi.com',
        timeout: 5000,
        headers:{
            'Content-Type': 'application/json'
        }
    }
);

export const apiFotos = axios.create(
    {
        baseURL: 'https://picsum.photos/',
        timeout: 5000,
        headers:{
            'Content-Type': 'application/json'
        }
    }
);