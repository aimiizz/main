<template>
    <div>
      <h1>Login</h1>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="loginUser">Login</button>
      
      <!-- Display loading and error messages -->
      <div v-if="loading">Logging in...</div>
      <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import type { AuthError } from 'firebase/auth';
  
  export default {
    name: 'Login',
    setup() {
      // Reactive state
      const email = ref('');
      const password = ref('');
      const loading = ref(false);
      const errorMessage = ref('');
  
      // Login function
      const loginUser = async () => {
        loading.value = true;
        errorMessage.value = '';
        
        try {
          const auth = getAuth();
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          const user = userCredential.user;
          
          // Retrieve user token
          const token = await user.getIdToken();
          
          // Store token and userId in localStorage (or sessionStorage)
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user.uid);
          
          // Optionally, navigate to the profile page
          // You can use Vue Router's useRouter() here to navigate programmatically if needed.
          // For example: this.$router.push('/profile');
  
          console.log('User logged in:', user);
          console.log('Token:', token);
          
          // Clear loading state
          loading.value = false;
        } catch (error) {
          // Handle error
          loading.value = false;
          const authError = error as AuthError;
          errorMessage.value = authError.message;
          console.error('Login error:', authError.code, authError.message);
        }
      };
  
      return {
        email,
        password,
        loginUser,
        loading,
        errorMessage
      };
    }
  };
  </script>
  
  