<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel hide-controls>
                        <v-carousel-item
                        v-for="(item,i) in images"
                        :key="i"
                        :src="item.src"
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap align-space-around justify-space-around>
                <v-flex xs12 md4 sm6
                    v-for="(product,i) in products" :key="i"
                >
                    <router-link 
                        :aria-label="product.title"
                        :to="'/product/' + product.id"
                    >
                        <v-card-media
                            :src="product.imageSrc"
                            aspect-ratio="1.">
                        </v-card-media>
                    </router-link>
                    <v-card class="custom_v-card" >
                    
                        <v-card-title primary-title>
                            <div>
                                <h3 class="card_heading heading">{{ product.title }}</h3>
                                <div class="card_describe">
                                    <p class="subheading"> {{product.description.substring(0,60)}}... </p>
                                    <p class="subheading card_price"> <span class="title">{{product.price}}₸</span></p>
                                </div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn dark color="orange" :to="'/product/'+ product.id">Открыть</v-btn>
                            <v-btn flat class="primary">Купить</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    
</template>

<script>
    export default {
        data (){
            return {
                images:[
                    
                    { src:'https://ae01.alicdn.com/kf/HTB1GG0uX2LsK1Rjy0Fbq6xSEXXaw.jpg'},
                    { src:'https://ae01.alicdn.com/kf/HTB1UkpxXZfrK1Rjy0Fmq6xhEXXa2.jpg'},
                    { src:'https://ae01.alicdn.com/kf/HTB1iFJyX5zxK1Rjy1zkq6yHrVXa0.jpg'},
                    { src:'https://ae01.alicdn.com/kf/HTB1MR0wXZnrK1RkHFrdq6xCoFXa9.jpg'}
                ],
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
                    {
                        id:'3',
                        title:'Drawstring Ankle Strap Pants',
                        vendor:'Inflation HK',
                        colors:['Black','Grey','Purple'],
                        type:'Bottoms',
                        description:'Уличные брюки-ветровки.',
                        price: 11500,
                        promo:false,
                        imageSrc:'https://ae01.alicdn.com/kf/HTB1tx4sXcTxK1Rjy0Fgq6yovpXat.jpg'
                    },
                    {
                        id:'4',
                        title:'Freedom Shirt',
                        vendor:'Inflation HK',
                        colors:['Black'],
                        type:'Shirt&Sweater',
                        description:'Уличная рубашка "Refuse Freedom"',
                        price: 9000,
                        promo:false,
                        imageSrc:'https://ae01.alicdn.com/kf/HTB1YuvalqAoBKNjSZSyq6yHAVXaS/2018-FW-Reflctive.jpg'
                    },
                    {
                        id:'5',
                        title:'Leaf Sleeve Hoodies',
                        vendor:'Inflation HK',
                        colors:[],
                        type:'Hoodies',
                        description:'Уличный худи Sleeve Graphic Printed Fleece Hoodies',
                        price: 12000,
                        promo:false,
                        imageSrc:'https://ae01.alicdn.com/kf/HTB1bR4vB3KTBuNkSne1q6yJoXXaY/-.jpg'
                    },
                    {
                        id:'6',
                        title:'Down Jacket',
                        vendor:'Inflation HK',
                        colors:['Grey','Yellow','Purple','Black'],
                        type:'Coat&Jacket',
                        description:'Зимняя куртка с высококачественным хлопковой тканью',
                        price: 19000,
                        promo:false,
                        imageSrc:'https://ae01.alicdn.com/kf/HTB1UXIGXOLrK1Rjy1zdq6ynnpXaw/INFLATION-2018-Winter-Jackets-Coat-Fashion-High-Quality-Cotton-Padded-Windproof-Thick-Warm-Soft-Brand-Clothing.jpg'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .card_heading{
        font-weight: bold;
        word-wrap: break-word;
        text-align: center;
        margin-bottom: 1.3rem;
    }
    .card_describe{
        margin-top: auto;
        padding-left: 1rem;

    }
    .card_price{
        color:#c00f1b;
        font-size: 18px;
        margin-bottom: 0;
    }
    .custom_v-card{
        margin-bottom: 15px;
    }
</style>