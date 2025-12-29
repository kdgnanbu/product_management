<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const id = ref('');
const password = ref('');
const errorMessage = ref('')
const users = ref([])
let ls = localStorage.users;
users.value = ls ? JSON.parse(ls) : [];
const router = useRouter()

const goLoginComplete = () => {
    if (!id.value || !password.value) {
        errorMessage.value = '※会員IDとパスワードを入力してください'
        return
    }
    const findUsers = users.value.find((x) => x.id === id.value);
    const findPass = users.value.find((x) => x.password === password.value);
    if (findUsers && findPass) {
        router.push({
            path: '/login-complete',
            query: {
                id: findUsers.id
            }
        })
    } else {
        errorMessage.value = '※ログインに失敗しました'
        return
    }
    id.value = "";
    password.value = "";
}
</script>

<template>
    <div class="add-area">
        <h1>ログイン画面</h1>
        <div class="form-item">
            <label>ユーザーID：</label>
            <input type="text" v-model="id" placeholder="例：12345" maxlength="5" />
        </div>
        <div class="form-item">
            <label>パスワード：</label>
            <input type="password" v-model="password" placeholder="英数字8文字以上" />
        </div>
        <button class="submit-btn" @click="goLoginComplete">ログイン</button>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        <p class="login">※アカウントをお持ちでない方は <router-link to="/new">こちら</router-link></p>
    </div>
</template>
