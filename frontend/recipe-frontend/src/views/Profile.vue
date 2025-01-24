<template>
    <div>
      <h1>Hello - {{ userId }}</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    name: "Profile",
    setup() {
      const userId = ref<string>('');
  
      // onMounted hook to get user_id from localStorage
      onMounted(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
          userId.value = storedUserId;
        }
      });
  
      // Return reactive data so it can be used in the template
      return {
        userId
      };
    }
  };
  </script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}
body {
  background-color: #030e1b;
  color: #FFF;
}
a {
  color: #2aeb74;
  text-decoration: none;
}

button {
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;

  background-color: #2aeb74;
  font-size: 1.125rem;
  color: #030e1b;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
</style>

  