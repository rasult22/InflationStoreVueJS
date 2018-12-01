<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text-secondary mb-3"
                    
                    >Orders</h1>
                <v-list
                    subheader
                    two-line
                >
                

                    <v-list-tile avatar
                        v-for="(order,i) in orders" :key="i"
                    >
                        <v-list-tile-action>
                        <v-checkbox 
                            color="success"
                            @change="markDone(order)"
                            :input-value="order.done"
                        ></v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-content @click="notifications = !notifications">
                        <v-list-tile-title>{{order.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn class="primary" :to="'/product/' + order.productId">Open</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>

                
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data (){
            return {
                orders:[
                    {
                        id:'test',
                        name:'Rasul',
                        phone:'22-222-22-2',
                        productId:'1',
                        done: false
                    }
                ]
            }
        },
        methods:{
            markDone (order){
                order.done = true;
            }
        }
    }
</script>

<style scoped>

</style>