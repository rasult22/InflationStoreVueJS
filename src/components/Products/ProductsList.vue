<template>
  <v-container>
    <v-layout row v-if="!loading && myProducts.length !== 0">
      <v-flex xs12 sm8 offset-sm2>
        <h1 class="text--secondary mb-3">Products:</h1>
        <v-card class="elevation-10 mb-2" v-for="(product,i) in myProducts" :key="i">
          <v-layout>
            <v-flex xs4>
              <v-card-media :src="product.imageSrc"></v-card-media>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{product.title}}</h2>
                <p>{{product.description}}</p>
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
    <v-layout v-else-if="!loading && myProducts.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h1 class="text-primary">Your have no products </h1>  
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
            :size="100"
            class="mt-5"
            color="primary"
            indeterminate
        ></v-progress-circular> 
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data () {
    return {}
  },
  computed: {
    myProducts () {
      console.log()
      return this.$store.getters.myProducts
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
</style>