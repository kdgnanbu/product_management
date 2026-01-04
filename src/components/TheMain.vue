<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goAbout = () => {
  router.push('/new')
}

const goHome = () => {
  router.push('/login')
}
</script>

<template>
  <!-- ✅ トップページのときだけ表示 -->
  <div class="page-container" v-if="['/'].includes(route.path)">
    <div class="card">
      <h1 >ようこそ！</h1>
      <p class="subtitle">ログインまたは新規登録を選択してください</p>
      <div class="nav">
        <button class="login-btn" @click="goHome">ログイン</button>
        <button class="register-btn" @click="goAbout">新規登録</button>
      </div>
    </div>
  </div>

  <!-- ✅ ページ内容 -->
  <router-view />
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  font-family: "Noto Sans JP", sans-serif;
  
}

/* カード本体 */
.card {
  background-color: #fafafa;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 360px;
      width: 500px;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fafafa;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  /* animation: fadeIn 0.6s ease-out; */
}

/* サブタイトル */
.subtitle {
  font-size: 14px;
  color: #777;
  margin-bottom: 2rem;
}

/* ボタンエリア */
.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

/* ログインボタン（青） */
.login-btn {
  background: #0078ff;
  color: #fff;
}

.login-btn:hover {
  background: #005fcc;
}

/* 新規登録ボタン（グレー） */
.register-btn {
  background-color:rgb(255, 155, 33);
  color:white;
}

.register-btn:hover {
  background: #c96100;
}


</style>
