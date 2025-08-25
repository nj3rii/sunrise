<template>
  
    <!-- HERO SECTION -->
    <v-parallax src="public/images/pexels-guilhermealmeida-1858175.jpg" height="500">
      <v-row class="fill-height" align="center" justify="center">
        <v-col class="text-center text-white">
          <h1 class="text-h2 font-weight-bold">Empowering Second Chances</h1>
          <p class="text-subtitle-1">Providing Jobs, Legal Aid, and Training for Ex-Convicts & the Unemployed</p>
          <v-btn color="deep-purple accent-4" class="mr-4" to="/jobs">View Opportunities</v-btn>
          <v-btn outlined color="white" to="/legalaid">Get Legal Support</v-btn>
        </v-col>
      </v-row>
    </v-parallax>

    <!-- ABOUT SECTION -->
<!-- ABOUT SECTION -->
<!-- ABOUT SECTION -->
<v-container class="my-12 pa-0">
  <!-- Top Banner Image with "About Tosha Link" Overlay -->
  <v-img
    src="public/images/pexels-rdne-6069349.jpg"
    height="1000"
    cover
  >
  <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" class="text-center text-white">
        <h2 class="text-h3 font-weight-bold">About Tosha Link</h2>
      </v-col>
    </v-row>
  </v-img>

  <!-- Text and Side Image -->
  <v-row class="mt-8">
    <v-col cols="12" md="6">
      <p>
        Tosha Link is a community-driven platform that empowers individuals — especially ex-convicts and the unemployed — by linking them to food support, jobs, and skill-building opportunities.
        Our mission is to create second chances through access and dignity.
        We are all about empowering the community and the youth in society...Our organisation supports growth of every individual at their best interests.
        Also, Tosha Link is designed to offer opportunities to all whether a convict or not — so long as you are unemployed there's always room.
        And for those who want to apply to certain institutions for handy skills, our website has a platform for that.
      </p>
    </v-col>
<
   
      <v-img
        src="public/images/Black Orange Modern Job Vacancy Poster.png"
        height="1000"
        cover
      
      ></v-img>
    
  </v-row>
</v-container>

    <!-- WHAT WE DO SECTION -->
    <v-container class="my-12">
      <h2 class="text-center mb-8">What We Do</h2>
      <v-row>
        <v-col cols="12" sm="4">
          <v-card>
            <v-img src="public/images/fotos-k-xzciw_mnY-unsplash.jpg" height="300"></v-img>
            <v-card-title>Job Opportunities</v-card-title>
            <v-card-text>We partner with companies to connect job-ready individuals to openings.</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-img src="public/images/pexels-safari-consoler-3290243-16850246.jpg" height="300"></v-img>
            <v-card-title>Training Programs</v-card-title>
            <v-card-text>We offer skill development courses for long-term growth.</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-img src="public/images/pexels-ekaterina-bolovtsova-6077476.jpg" height="300"></v-img>
            <v-card-title>Legal Aid</v-card-title>
            <v-card-text>Free consultations and support to ensure a fair start.</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- SUCCESS STORIES SECTION -->
    <v-container class="my-12">
      <h2 class="text-center mb-8">Success Stories</h2>
      <v-carousel height="300">
        <v-carousel-item v-for="(item, i) in successStories" :key="i">
          <v-card class="pa-6">
            <blockquote>"{{ item.quote }}"</blockquote>
            <footer>— {{ item.name }}</footer>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <!-- GET INVOLVED SECTION -->
    <v-container class="my-12">
      <h2 class="text-center mb-8">Get Involved</h2>
      <v-row>
        <v-col cols="12" sm="4" class="text-center">
          <v-icon size="64" color="pink-darken-4">mdi-hand-heart</v-icon>
          <h3 class="text-deep-purple-darken-4">INSTITUTIONS</h3>
          <p>Join our team and make a difference in someone’s life.</p>
          <v-btn color="cyan-accent-2" to="click here">To offer skills</v-btn>
        </v-col>
        <v-col cols="12" sm="4" class="text-center">
          <v-icon size="64">mdi-currency-usd</v-icon>
          <h3>Donate</h3>
          <p>Your support helps us reach more people.</p>
        </v-col>
        <v-col cols="12" sm="4" class="text-center">
          <v-icon size="64" color="teal-lighten-2">mdi-handshake</v-icon>
          <h3 class="text-deep-purple-darken-4" >PARTNER</h3>
          <p>We work with businesses and legal bodies to offer opportunities.</p>
          <v-btn color="cyan-accent-2" to="partners">To view Partner ships</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- FOOTER -->
    <v-footer color="deep-purple accent-4" class="white--text">
      <v-col class="text-center">&copy; 2025 Tosha Link | Empowering Lives</v-col>
    </v-footer>
</template>

<script>
export default {
  data() {
    return {
      successStories: [
        { quote: 'Thanks to Tosha Link, I got a job and my life is back on track.'
                   , name: 'James Kibee' },
        { quote: 'The training gave me skills I never thought I’d have.', name: 'KImani Karanja' },
        { quote: 'Legal aid helped me settle and move forward.', name: 'Peter Nyoro' },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
