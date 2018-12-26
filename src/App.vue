<template>
  <v-app>
    <Navbar/>
    <template v-if="error">
      <v-snackbar
        
        
       
        
        :timeout="5000"
        
        @input="closeError"
        
        color="#9e9ad6"
        :value="true"
      >
        {{ error }}
        <v-btn class="btn-c" flat @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  data () {
    return {}
  },
  components: {
    Navbar
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
<style scoped>
.btn-custom-color {
  background-color: #9e9ad6;
}
</style>