import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: () =>({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useGetProductsQuery} = productApiSlice;