<template>
  
  <v-dialog v-model="dialog" width="400px">
    <v-btn  class="primary" slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary"> Do you want to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
               <v-text-field
                color="#373277"
                name="name"
                label="Your name"
                type="text"
                v-model="name"
               ></v-text-field>
               <v-text-field
                color="#373277"
                name="phone"
                label="Your phone number"
                type="number"
                v-model="phone"
               ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark 
                    color="primary darken" 
                    outline 
                    @click="onCancel" 
                    :disabled="localLoading"
                > Close
              </v-btn>
              <v-btn dark 
                  color="primary darken" 
                  @click="onSave"
                  :disabled="localLoading"
                  :loading="localLoading"
                  > Buy it!</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
  
</template>

<script>
  export default {
    props: ['product'],
    data () {
      return {
        dialog: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      onSave () {
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            productId: this.product.id,
            ownerId: this.product.ownerId
          })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.dialog = false
          })
        }
      },
      onCancel () {
        this.name = ''
        this.phone = ''
        this.dialog = false
      }
    }
  }
</script>

<style scoped>

</style>