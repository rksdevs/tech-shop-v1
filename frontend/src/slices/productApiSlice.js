import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ({keyword, pageNumber}) =>({
                url: PRODUCTS_URL,
                params: { keyword, pageNumber,}
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
        }),
        createProductReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: ()=> ({
                url: `${PRODUCTS_URL}/topProducts`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/allCategories`,
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useGetProductsByCategoryQuery, useUpdateProductStockMutation, useCreateProductReviewMutation, useGetTopProductsQuery, useGetAllCategoriesQuery} = productApiSlice;