<template>
  <v-sheet class="mx-auto" width="500" color="pink-lighten-4">

    <v-form ref="form">
      <v-text-field
        v-model="first_name"
        :counter="10"
        :rules="first_name"
        label="FirstName"
        required
      ></v-text-field>

            <v-text-field
        v-model="last_name"
        :counter="10"
        :rules="last_nameRules"
        label="LastName"
        required
      ></v-text-field>


       
      <v-text-field
        v-model="email"
        :counter="10"
        :rules="emailaddressRules"
        label="EmailAddress"
        required
      ></v-text-field>

            <v-text-field
        v-model="phonenumber"
        :counter="10"
        :rules="phonenumberRules"
        label="PhoneNumber"
        required
      ></v-text-field>

     
<v-file-input label="Attach  Cv" color=""></v-file-input>



     

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="success"
          block
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          class="mt-4"
          color="error"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          class="mt-4"
          color="warning"
          block
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref } from 'vue'

const form = ref(null) // <-- Needed

const first_name= ref('')


const email = ref('')
const emailaddressRules = ref([
  v => !!v || 'Email Address is required',
  v => (v && v.length <= 20) || 'Email must be 20 characters or less',
])

const phonenumber = ref('')
const phonenumberRules = ref([
  v => !!v || 'Phone Number is required',
  v => (v && v.length <= 10) || 'Phone must be 10 digits or less',
])

const checkbox = ref(false)

async function validate() {
  const { valid } = await form.value.validate()
  if (valid) alert('Form is valid')
}

function reset() {
  form.value.reset()
}

function resetValidation() {
  form.value.resetValidation()
}
</script>
]