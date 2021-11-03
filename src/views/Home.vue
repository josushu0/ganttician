<template>
  <div class="grid">
    <Navbar id="navbar" />
    <main id="main" class="has-background-primary"></main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import supabase from '../supabase';

export default {
  name: 'HomeView',
  components: { Navbar },
  setup() {
    const router = useRouter();

    if (!supabase.auth.session()) {
      router.replace('/login');
    }
  },
};
</script>

<style scoped>
.grid {
  display: grid;
}
#navbar {
  grid-area: navbar;
}
#main {
  grid-area: main;
}

@media only screen and (min-width: 756px) {
  .grid {
    grid-template-columns: 70px auto;
    grid-template-areas: "navbar main";
  }
  #signOut {
    width: 100%;
    padding: 1.7rem 0rem;
  }
}

@media only screen and (max-width: 756px) {
  .grid {
    grid-template-rows: calc(100vh - 60px) 60px;
    grid-template-columns: 100vw;
    grid-template-areas:
      "main"
      "navbar";
  }
  #signOut {
    width: auto;
    height: 100%;
    padding: 0rem 1.5rem;
  }
}
</style>
