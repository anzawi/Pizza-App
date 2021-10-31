import Modifier from "./Modifier";

export interface Product {
    id: string
    title: string
    description: string
    img: string
    modifiers: Modifier[]
}

export interface ProductForm {
    title: string
    description: string
    img: string
}

