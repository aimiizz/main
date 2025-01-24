<template>
    <form @submit.prevent="loginUser">
        <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'Login',
    setup() {
        const username = ref('');
        const password = ref('');

        const loginUser = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/login', {
                    username: username.value,
                    password: password.value,
                });
                console.log('Login successful:', response.data);
                // Handle successful login (e.g., redirect or store token)
            } catch (error) {
                console.error('Login error:', error);
            }
        };

        return {
            username,
            password,
            loginUser,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
</style>
