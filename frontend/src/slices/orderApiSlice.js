import {apiSlice} from './apiSlice';
import { ORDERS_URL, RAZORPAY_URL } from '../constants';

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...orderData}
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) =>({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details}
            })
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`
            }),
            keepUnusedDataFor: 5
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            })
        }),
        initiateRazorpayPayment: builder.mutation({
            query: (details) => ({
                url: `${RAZORPAY_URL}/payment`,
                method: 'POST',
                body: {...details}
            })
        }),
        getRazorpayKey: builder.query({
            query: () => ({
                url:`${RAZORPAY_URL}/rzp-key` 
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation, useInitiateRazorpayPaymentMutation, useGetRazorpayKeyQuery} = orderApiSlice;