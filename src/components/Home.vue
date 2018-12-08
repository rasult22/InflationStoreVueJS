<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel hide-controls>
            <v-carousel-item v-for="(item,i) in images" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap align-space-around justify-space-around>
        <v-flex xs12 md4 sm6 v-for="(product,i) in products" :key="i">
          <router-link :aria-label="product.title" :to="'/product/' + product.id">
            <v-card-media :src="product.imageSrc" aspect-ratio="1."></v-card-media>
          </router-link>
          <v-card class="custom_v-card">
            <v-card-title primary-title>
              <div>
                <h3 class="card_heading heading">{{ product.title }}</h3>
                <div class="card_describe">
                  <p class="subheading">{{product.description.substring(0,60)}}...</p>
                  <p class="subheading card_price">
                    <span class="title">{{product.price}}₸</span>
                  </p>
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
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular
            :size="100"
            class="mt-5"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      images: [
        { src: 'https://ae01.alicdn.com/kf/HTB1GG0uX2LsK1Rjy0Fbq6xSEXXaw.jpg' },
        { src: 'https://ae01.alicdn.com/kf/HTB1UkpxXZfrK1Rjy0Fmq6xhEXXa2.jpg' },
        { src: 'https://ae01.alicdn.com/kf/HTB1iFJyX5zxK1Rjy1zkq6yHrVXa0.jpg' },
        { src: 'https://ae01.alicdn.com/kf/HTB1MR0wXZnrK1RkHFrdq6xCoFXa9.jpg' }
      ]
    }
  },
  computed: {
    ...mapGetters('products', {
      promoProducts: 'promoProducts',
      products: 'products'
    }),
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
.card_heading {
  font-weight: bold;
  word-wrap: break-word;
  text-align: center;
  margin-bottom: 1.3rem;
}
.card_describe {
  margin-top: auto;
  padding-left: 1rem;
}
.card_price {
  color: #c00f1b;
  font-size: 18px;
  margin-bottom: 0;
}
.custom_v-card {
  margin-bottom: 15px;
}
</style>