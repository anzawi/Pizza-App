import {User, UserFormValues} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {history} from "../../index";

export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get isLogin() {
        return !!this.user
    }

    getUser = async () => {
        try {
            const user = await agent.Auth.current()
            runInAction(() => {
                this.user = user
            })
        } catch (err) {
            console.log(err)
        }
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Auth.login(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push('/dashboard')
        }
        catch (err) {
            throw err
        }
    }

    register = async (data: UserFormValues) => {
        try {
            const user = await agent.Auth.register(data)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push('/dashboard')
        }
        catch (err) {
            throw err
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        history.push('/')
    }
}