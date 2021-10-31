import axios, {AxiosError, AxiosResponse} from "axios";
import {Product} from "../models/Product";
import {User, UserFormValues} from "../models/user";
import {toast} from "react-toastify";
import {store} from "../store/store";

axios.defaults.baseURL = 'http://anzawi-001-site1.itempurl.com/public/api'
// axios.defaults.baseURL = 'https://server.test/api'

axios.interceptors.request.use(config => {
    config.headers = {
        Accept : 'application/json'
    }

    const token = store.commonStore.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axios.interceptors.response.use(async response => {
    return response
}, (error: AxiosError) => {
    const {status} = error.response!
    switch (status) {
        case 400:
            toast.error('bad request')
            break
        case 401:
            toast.error('unauthorised')
            break
        case 404:
            toast.error('not found')
            break
        case 500:
            toast.error('server error')
            break
    }
})

// @ts-ignore
const responseBody = <T>(response: AxiosResponse<T>) => response.data.data

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post <T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put <T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch <T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete <T>(url).then(responseBody),
}

const Products = {
    list: () => requests.get<Product[]>('/products'),
    show: (id: string) => requests.get<Product>(`/products/${id}`),
    //details: (id: string) => requests.get<Product>(`/products/${id}`),
    create: (product: any) => requests.post<void>('products', product),
    update: (product: Product) => requests.put<void>(`/products/${product.id}`, product),
    delete: (id: string) => requests.del<void>(`/products/${id}`),
    upload: (file: Blob) => {
        let formData = new FormData()
        formData.append('img', file)
        return axios.post('/img', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    }
}

const Auth = {
    current: () => requests.get<User>('/auth/me'),
    login: (body: UserFormValues) => requests.post<User>('/auth/login', body),
    register: (body: UserFormValues) => requests.post<User>('/auth/register', body),
}

const agent = {
    Products,
    Auth
}

export default agent