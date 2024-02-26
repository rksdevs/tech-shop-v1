import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {
    cpu: "",
    motherboard: "",
    coolingSystem: "",
    ram: "",
    hdd: "",
    sdd: "",
    gpu: "",
    cabinet: "",
    psu: "",
    monitor: "",
    mouse: "",
    keyboard: "",
    mousepad: "",
    headset: "",
}

const pcBuilderSlice = createSlice({
    name: 'customPc',
    initialState,
    reducers: {
        
    }
})