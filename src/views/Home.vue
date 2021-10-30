<template>
  <div>
    <div class="field">
      <div class="control">
        <button
          class="button is-rounded is-primary is-uppercase is-fullwidth"
          @click="handleSignout"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const router = useRouter();

    const handleSignout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

    onBeforeMount(() => {
      if (!supabase.auth.user()) {
        router.replace("/login");
      }
    });

    return {
      handleSignout,
    };
  },
};
</script>
