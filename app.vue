<template>
  <div>
      <NuxtPage />
  </div>
</template>

<script setup>
// get token from runtime config
const { githubToken } = useRuntimeConfig();

// init cookie for github token
const cookie = useCookie("github-token");

// set cookie value if not set
cookie.value = cookie.value || githubToken;
</script>