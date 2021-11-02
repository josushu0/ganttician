<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand"></div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link to="/">
          <span class="icon is-medium">
            <fa class="fas fa-lg" icon="th-large" />
          </span>
        </router-link>
      </a>

      <a class="navbar-item">
        <router-link to="/">
          <span class="icon is-medium">
            <fa class="fas fa-lg" icon="plus-square" />
          </span>
        </router-link>
      </a>

      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <slot></slot>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>
