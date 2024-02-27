import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0}; 



const pcBuilderSlice = createSlice({
    name: 'customPc',
    initialState,
    reducers: {
        addCpu: (state, action) => {
            const cpu = action.payload;
            state.cpu = cpu;
            state.totalBuildPrice += cpu.price * cpu.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.cpu = cpu;
            customPc.totalBuildPrice += cpu.price * cpu.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMotherboard: (state, action) => {
            const motherboard = action.payload;
            state.motherboard = motherboard;
            state.totalBuildPrice += motherboard.price * motherboard.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.motherboard = motherboard;
            customPc.totalBuildPrice += motherboard.price * motherboard.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addCoolingSystem: (state, action) => {
            const coolingSystem = action.payload;
            state.coolingSystem = coolingSystem;
            state.totalBuildPrice += coolingSystem.price * coolingSystem.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.coolingSystem = coolingSystem
            customPc.totalBuildPrice += coolingSystem.price * coolingSystem.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addRam: (state, action) => {
            const ram = action.payload;
            state.ram = ram;
            state.totalBuildPrice += ram.price * ram.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.ram = ram;
            customPc.totalBuildPrice += ram.price * ram.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addSsd: (state, action) => {
            const ssd = action.payload;
            state.ssd = ssd;
            state.totalBuildPrice += ssd.price * ssd.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.ssd = ssd;
            customPc.totalBuildPrice += ssd.price * ssd.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addHdd: (state, action) => {
            const hdd = action.payload;
            state.hdd = hdd;
            state.totalBuildPrice += hdd.price * hdd.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.hdd = hdd;
            customPc.totalBuildPrice += hdd.price * hdd.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addGpu: (state, action) => {
            const gpu = action.payload;
            state.gpu = gpu;
            state.totalBuildPrice += gpu.price * gpu.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.gpu = gpu;
            customPc.totalBuildPrice += gpu.price * gpu.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addPsu: (state, action) => {
            const psu = action.payload;
            state.psu = psu;
            state.totalBuildPrice += psu.price * psu.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.psu = psu;
            customPc.totalBuildPrice += psu.price * psu.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMonitor: (state, action) => {
            const monitor = action.payload;
            state.monitor = monitor;
            state.totalBuildPrice += monitor.price * monitor.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.monitor = monitor;
            customPc.totalBuildPrice += monitor.price * monitor.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addKeyboard: (state, action) => {
            const keyboard = action.payload;
            state.keyboard = keyboard;
            state.totalBuildPrice += keyboard.price * keyboard.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.keyboard = keyboard;
            customPc.totalBuildPrice += keyboard.price * keyboard.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMouse: (state, action) => {
            const mouse = action.payload;
            state.mouse = mouse;
            state.totalBuildPrice += mouse.price * mouse.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.mouse = mouse;
            customPc.totalBuildPrice += mouse.price * mouse.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMousepad: (state, action) => {
            const mousepad = action.payload;
            state.mousepad = mousepad;
            state.totalBuildPrice += mousepad.price * mousepad.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.mousepad = mousepad;
            customPc.totalBuildPrice += mousepad.price * mousepad.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addHeadphone: (state, action) => {
            const headphone = action.payload;
            state.headphone = headphone;
            state.totalBuildPrice += headphone.price * headphone.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.headphone = headphone;
            customPc.totalBuildPrice += headphone.price * headphone.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addCabinet: (state, action) => {
            const cabinet = action.payload;
            state.cabinet = cabinet;
            state.totalBuildPrice += cabinet.price * cabinet.qty;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            customPc.cabinet = cabinet;
            customPc.totalBuildPrice += cabinet.price * cabinet.qty;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        // calculateBuildPrice: (state, action) => {
            

        //     const totalBuildPrice = calculateTotalPrice(state);
        //     state.totalBuildPrice = totalBuildPrice;
        // }
    }
})

export const {addCpu, addGpu, addHdd, addPsu, addSsd, addCoolingSystem, addMotherboard, addCabinet, addMonitor, addRam, addHeadphone, addKeyboard, addMouse, addMousepad} = pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;