<template>
  <nav id="navbar" class="has-background-dark">
    <div id="flex" class="is-flex is-align-items-center">
      <img id="logo" class="image is-32x32" src="../assets/logo.png" alt="logo">
      <button class="button is-dark" @click="hideDrawer">
        <span class="icon is-large">
          <fa class="fas fa-lg" icon="list-ul" />
        </span>
      </button>

      <button class="button is-dark">
        <span class="icon is-large">
          <fa class="fas fa-lg" icon="layer-group" />
        </span>
      </button>

      <button class="button is-dark">
        <span class="icon is-large">
          <fa class="fas fa-lg" icon="plus-square" />
        </span>
      </button>

      <button class="button is-dark" @click="handleSignout">
        <span class="icon is-large">
          <fa class="fas fa-lg" icon="sign-out-alt" />
        </span>
      </button>
    </div>
  </nav>
</template>

<script>
import supabase from '../supabase';

export default {
  name: 'NavbarComponent',
  emits: ['hideDrawer'],
  setup(_props, { emit }) {
    let hiddenDrawer = false;

    async function handleSignout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    }

    const hideDrawer = () => {
      hiddenDrawer = !hiddenDrawer;
      emit('hideDrawer', hiddenDrawer);
    };

    return {
      handleSignout,
      hiddenDrawer,
      hideDrawer,
    };
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  #navbar {
    height: 100vh;
  }
  #flex {
    flex-direction: column;
    height: 100%;
  }
  #logo {
    margin: 1rem 0rem;
  }
  button {
    width: 100%;
    padding: 1.7rem 0rem;
  }
}

@media only screen and (max-width: 1023px) {
  #navbar {
    height: 60px;
    width: 100vw;
  }
  #flex {
    flex-direction: row;
    height: 100%;
  }
  #logo {
    display: none;
  }
  button {
    width: auto;
    height: 100%;
    padding: 0rem 1.5rem;
  }
}
</style>
