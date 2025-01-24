<template>
    <div>
        <h1>Register</h1>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button @click="registerNewUser">Register</button>
        
        <div v-if="loading">Registering...</div>
        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
        <div v-if="isRegistered" style="color: green;">Registration Successful!</div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import type { AuthError } from 'firebase/auth';

export default {
    name: "Register",
    setup() {
        const email = ref('');
        const password = ref('');
        const loading = ref(false);
        const errorMessage = ref('');
        const isRegistered = ref(false);

        const registerNewUser = async () => {
            const auth = getAuth();
            loading.value = true;
            errorMessage.value = '';
            isRegistered.value = false;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                const user = userCredential.user;
                const token = await user.getIdToken();
                console.log('User registered:', user);
                console.log('ID Token:', token);

                // After successful registration, update UI state
                isRegistered.value = true;
                loading.value = false;
            } catch (error) {
                loading.value = false;
                const authError = error as AuthError;
                errorMessage.value = authError.message;
                console.error('Registration error:', authError.code, authError.message);
            }
        };

        return {
            email,
            password,
            registerNewUser,
            loading,
            errorMessage,
            isRegistered
        };
    }
};
</script>
