<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStorage } from '@/composable/storage';
import { useValidators } from '@/composable/validators';

const { isPassword } = useValidators();
const { load, save } = useStorage();

const route = useRoute()
const errorMessage = ref('')
const password = ref('')
const newPassword = ref('')
const users = ref(load('users'));
const findUsers = users.value.find((x) => x.id === route.query.id);

const editPass = () => {
  errorMessage.value = ""
  if (password.value === "" || newPassword.value === "") {
    errorMessage.value = "全ての項目を入力してください"
  }
  if (password.value !== findUsers.password) {
    errorMessage.value = "認証に失敗しました。もう一度入力ください"
  }
if(!isPassword(newPassword.value)) errorMessage.value = "※新しいパスワードは英数字を含む8文字以上で入力してください。";
  if (errorMessage.value) {
    return;
  }
  findUsers.password = newPassword.value;
  save('users', users.value);
  alert("変更しました")
  password.value = "";
  newPassword.value = "";
}
</script>

<template>
  <div class="add-area">
    <h1>パスワード変更画面</h1>
    <div class="form-item">
      <label>今のパスワード：</label>
      <input type="password" v-model="password" />
    </div>
    <div class="form-item">
      <label>新しいパスワード：</label>
      <input type="password" v-model="newPassword" />
    </div>
    <button class="submit-btn" @click="editPass">変更</button>
    <p class="error-msg" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
