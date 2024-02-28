import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: () =>({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                // url: 'api/upload',
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            })
        }),
        getProductsByCategory: builder.query({
            query: (category) =>({
                url: `${PRODUCTS_URL}/category/${category}`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        updateProductStock: builder.mutation({
            query: (order) => ({
                url: `${PRODUCTS_URL}/updateProductStock`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useGetProductsByCategoryQuery, useUpdateProductStockMutation} = productApiSlice;