import {makeAutoObservable, runInAction} from "mobx";
import {Product} from "../models/Product";
import agent from "../api/agent";
import Modifier from "../models/Modifier";

export default class ProductStore {
    products = new Map<number, Product>()
    product: Product | undefined = undefined
    modifiers: string[] = []
    uploading: boolean = false;
    imagUri: string = ''

    setModifiers = (value: string) => {
        this.modifiers.push(value)
    }

    constructor() {
        makeAutoObservable(this)
    }

    get productsList() {
        return Array.from(this.products.values())
    }

    loadProducts = async () => {
        try {
            const products = await agent.Products.list()
            runInAction(() => {
                // @ts-ignore
                products.forEach(product => {
                    this.products.set(product.id, product)
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    loadProduct = async (id: string) => {
        try {
            const product = await agent.Products.show(id)

            runInAction(() => {
                product.modifiers = product.modifiers.data

                product.modifiers.forEach((el: Modifier) => {
                    // @ts-ignore
                    el.modifierDetails = el.modifierDetails.data[0]
                })

                this.product = product
            })
        } catch (err) {
            console.log(err)
        }
    }


    create = async (data: any, modifiers: {}) => {
        data.image = this.imagUri
        await agent.Products.create({data, modifiers})
    }

    setImagUri = (path: string) => {
        this.imagUri = `/public/images/${path}`
    }

    uploadImg = async (file: Blob | null) => {
        if (file === null) return;

        this.uploading = true

        try {
            const response = await agent.Products.upload(file)
            const photo = response.data
            runInAction(() => this.uploading = false)
            this.setImagUri(photo.data.img)
            return photo.data.img
        } catch (err) {
            console.log(err)

            runInAction(() => this.uploading = false)
        }
    }
}