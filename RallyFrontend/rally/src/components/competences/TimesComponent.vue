<template>
    <div class="times">
        <div class="text-center">
            <p style="color: white;">Escuchando tiempos de sensores</p>

            <v-progress-circular indeterminate color="green">
            </v-progress-circular>
        </div>
        <div class="time" v-for="(time, index) in times" :key="index">
            <p><strong>Sensor:</strong> {{ time.id }}</p>
            <h2>HRS: MINS: SEGS: MS</h2>
            <h1>{{ time.time }}</h1>
            <button>Asignar Conductor</button>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref, computed, type PropType } from 'vue';
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
                    //times.value = JSON.parse(storedTimes);
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
                // * TODO: uncomment this line
                //localStorage.setItem('times', JSON.stringify(times.value));

                // * TODO: remove this line
                localStorage.setItem('times', "");

            });
        });


        return { times };
    },
};
</script>

<style scoped src="@/assets/styles/admin_panel/times.css"></style>
