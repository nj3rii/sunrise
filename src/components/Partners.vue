<template>
  <v-container class="py-10">

    <!-- Partner Image -->
    <v-container class="d-flex justify-center mb-6">
      <v-avatar size="800" elevation="8">
        <v-img
          src="/images/naassom-azevedo-Q_Sei-TqSlc-unsplash.jpg"
          alt="partners image"
          height="800"
        ></v-img>
      </v-avatar>
    </v-container>

    <!-- Section Title -->
    <h2 class="text-h5 font-weight-bold mb-4 centtxt" color="purple-darken-4">
      Our Trusted Partners
    </h2>

    <!-- Section Description -->
    <p class="mb-10 text-center">
      We proudly collaborate with organizations and individuals who share our mission
      of creating positive impact through  employment, and support services.we collaborate with organisations
      to offer opportunities to the youth and those who have been convicted of mimor offences
    </p>

    <!-- Pyramid of Logos -->
    <v-row
      v-for="(row, rowIndex) in pyramidRows"
      :key="rowIndex"
      justify="center"
      class="mb-8"
    >
      <v-col
        v-for="logo in row"
        :key="logo.name"
        cols="6"
        sm="3"
        md="2"
        class="d-flex justify-center"
      >
        <v-img
          :src="logo.src"
          :alt="logo.name"
          contain
          class="partner-logo"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        { name: "United Nations", src: "/logo/Emblem_of_the_United_Nations.svg.png" },
        { name: "Building & Constructions", src: "/logo/Blue Green Business Architecture Design Logo - Logos.png" },
        { name: "Human Rights & Equality", src: "/logo/Office_of_the_United_Nations_High_Commissioner_for_Human_Rights_logo_in_black.png" },
        { name: "Villarosa", src: "/logo/villarosalogo (3).jpg" },
        { name: "Legalnet", src: "/logo/pexels-ekaterina-bolovtsova-6077181.jpg" },
        { name: "PeaceCorps", src: "/public/logo/1_b7VSOLyjhvKhJIvKkEhpog-e1600090260478.png" },
        { name: "WWW", src: "/public/logo/15-min-1.png" },
        { name: "Imperial leather", src: "/public/logo/imperial-leather.svg" },
        { name: "Bidco", src: "/public/logo/sddefault.jpg" },
        { name: "Menengai", src: "/public/logo/menengai-drilling-ltd-504962.jpg" },
        { name: "Anjarwalaa", src: "/public/logo/profile.png" },
        { name: "Anjarawalla", src: "/public/logo/Anjarwalla-Khanna-kenya-logo-600x600-1.png" },
        { name: "Aln", src: "/public/logo/anjarwalla-khanna-advocates-nairobi-523268.jpg" },
        { name: "kituo", src: "/public/logo/CXyoG2MM_400x400.jpg" },
        { name: "Fida", src: "/public/logo/FIDA-logo_400x400.jpg" },
        { name: "LG", src: "/public/logo/Gray Pink Minimalist Attorney Law Logo.mp4" },
        { name: "Usikimye", src: "/public/logo/Gold and White Minimalist Illustrative Law Firm Logo.png" },

      ]
    }
  },
  computed: {
    pyramidRows() {
      let rows = []
      let perRow = Math.ceil(this.logos.length / 3) // Top row has most logos
      let start = 0

      while (start < this.logos.length) {
        rows.push(this.logos.slice(start, start + perRow))
        start += perRow
        perRow = perRow - 1 > 0 ? perRow - 1 : 1
      }
      return rows
    }
  }
}
</script>

<style>
.centtxt {
  display: flex;
  justify-content: center;
}

.partner-logo {
  max-height: 80px;
  max-width: 120px;
  transition: transform 0.3s, filter 0.3s;
}

.partner-logo:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
}
</style>
