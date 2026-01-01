<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const users = ref([])
let ls = localStorage.users
const loginId = route.query.id;
users.value = ls ? JSON.parse(ls) : []

const goCategory = () => {
      router.push({
    path: '/category',
    query: {
      id: loginId
    }
  })
}
const goProduct = () => {
    router.push({
    path: '/product',
    query: {
      id: loginId
    }
  })
}
const goPass = () => {
  router.push({
    path: '/pass',
    query: {
      id: loginId
    }
  })
}
const goHome = () => {
  router.push('/login')
}
</script>

<template>
  <div class="add-area">
    <h1>ログイン完了</h1>
    <p class="message">ようこそ、{{ route.query.id }}様</p>
    <p class="message">続けて操作してください</p>
    <button class="home-btn" @click="goCategory">
      カテゴリーを追加する
    </button>
    <button class="home-btn" @click="goProduct">
      商品の追加、編集をする
    </button>
    <button class="home-btn orange" @click="goPass">
      パスワードを変更する
    </button>
    <button class="home-btn orange" @click="goHome">
      ログアウトする
    </button>
  </div>
</template>

<style scoped>
.add-area {
  text-align: center;
}

.home-btn {
  width: 300px;
  padding: 12px;
  background-color: #6974d9;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px auto;
  display: block;
}

.home-btn:hover {
  opacity: 0.9;
}

.orange {
  width: 30%;
  background-color: rgb(255, 155, 33);
  font-size: 12px;
}
</style>
