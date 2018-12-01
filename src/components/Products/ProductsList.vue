<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <h1 class="text--secondary mb-3">Products:</h1>
                <v-card class="elevation-10 mb-2"
                    v-for="(product,i) in products" :key="i"
                >
                    <v-layout>
                        <v-flex xs4>
                            <v-card-media :src="product.imageSrc">
                                
                            </v-card-media>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">
                                    {{product.title}}
                                </h2>
                                <p>
                                    {{product.description}}
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="primary" :to="'/product/' + product.id">Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data (){
            return {
                products:[
                    {
                        id:'1',
                        title:'Comouflage Parka',
                        vendor:'Inflation HK',
                        colors:[],
                        type:'Coat&Jacket',
                        description:'Зимняя хлопковая комуфляжная парка',
                        price: 21000,
                        promo:false,
                        imageSrc:'https://ae01.alicdn.com/kf/HTB1W0AgXOrxK1RkHFCcq6AQCVXaF/2018.jpg'
                    },
                    {
                        id:'2',
                        title:'Letter Sleeve Hoodies',
                        vendor:'Inflation HK',
                        colors:[],
                        type:'Hoodies',
                        description:'Уличный лоскутный свитер, с белым капюшоном',
                        price: 12500,
                        promo:false,
                        imageSrc:'https://ae01.alicdn.com/kf/HTB13G3mJKuSBuNjSsziq6zq8pXa8/2018.jpg_640x640.jpg'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>