<style src="@/assets/styles/admin_panel/times.css"></style>

<template>
    <div class="times">
        <div class="text-center info_message">
            <h4>Escuchando tiempos de sensores</h4>
            <v-progress-circular indeterminate color="green" />
        </div>
        <div class="time" v-for="(time, index) in times" :key="index">
            <p><strong>Sensor:</strong> {{ time.id }}</p>
            <h2>HRS: MINS: SEGS: MS</h2>
            <h1>{{ time.time }}</h1>
            <button>Asignar Equipo</button>
        </div>
    </div>
</template>

<script lang="ts">
import {onMounted, ref } from 'vue';
import { useSocketIO } from '@/services/WebSocketPlugin';

interface Time {
    id: string,
    time: string
};

export default {
    name: "TimesComponent",

    setup() {
        const times: any = ref([]);
        const socketIO = useSocketIO();

        onMounted(() => {

            const storedTimes = localStorage.getItem('times');
            if (storedTimes) {
                try {
                    times.value = JSON.parse(storedTimes);
                } catch (error) {
                    console.info("No se han capturado tiempos aún");
                }
            }
            socketIO.socket.on("connect", () => {
                console.log("Connected")
            });

            socketIO.socket.on("onMessage", (data: Time) => {
                console.log("Received message:", data);
                times.value.push(data);
                localStorage.setItem('times', JSON.stringify(times.value));
            });
        });

        return { times };
    },
};
</script>

