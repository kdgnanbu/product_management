<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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

const formLeft = ref('50%')

const updateFormPosition = () => {
  const w = window.innerWidth
  const wideWidth = 1000
  const narrowWidth = 500

  const maxLeft = 50
  const minLeft = 25
  
  let leftPercent
  if (w >= wideWidth) {
    leftPercent = maxLeft
  } else if (w <= narrowWidth) {
    leftPercent = minLeft
  } else {
    leftPercent = minLeft + (maxLeft - minLeft) * (w - narrowWidth) / (wideWidth - narrowWidth)
  }
  formLeft.value = `${leftPercent}%`
}

onMounted(() => {
  updateFormPosition()
  window.addEventListener('resize', updateFormPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateFormPosition)
})
</script>

<template>
    <div class="body">
    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
  <div class="main">
    
    <div class="welcome">
      <h1>Welcome</h1>
      <p class="subtitle">Make Today Bright</p>
      <img src="../img/main.png" alt="main画像" />
    </div>
    <div class="form" :style="{ left: formLeft }">
        <div class="box">
            <h1>ログイン</h1>
            <div class="form-item">
                <label>ユーザーID：</label><br>
                <input type="text" v-model="id" placeholder="例：12345" maxlength="5" />
            </div>
            <div class="form-item">
                <label>パスワード：</label><br>
                <input type="password" v-model="password" placeholder="英数字8文字以上" />
            </div>
        <button class="submit-btn" @click="goLoginComplete">ログイン</button>

        <p class="login">※アカウントをお持ちでない方は <router-link to="/new">こちら</router-link></p>
        </div>
    </div>
  </div>
</div>
</template>

<style>
body {
  min-height: 100vh;
  margin: 0;
  background-color: #c2f6f0;
}
.body{
    background-color:#5ebcc3;
    width:70%;
    height:700px;
      border-top-right-radius: 100vh;
  border-bottom-right-radius: 100vh;
}

.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  height: 400px;
  background-color:rgb(17, 137, 141);
  border-radius: 12px;
  overflow: hidden;
}

.subtitle {
    position: absolute;
  top: 300px;
  left: 100px;
  font-size: 22px;
  letter-spacing: 1.5px;
  opacity: 0.9;
  white-space: nowrap;

}

.welcome {
  width: 50%;
  background-color: rgb(17, 137, 141);
  color: rgb(157, 206, 241);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: relative;
}

.welcome h1 {
  position: absolute;
  top: 150px;
  left: -40px;
  transform: translateY(-50%) rotate(90deg);
  margin: 0;
  font-size: 40px;
  z-index: 2;
}

.welcome img {
  position: absolute;
  top: 200px;
  left: 300px;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: 280px;
  opacity: 0.9;
  z-index: 1;
}

.form {
  position: absolute;
  top: 0;
  width: 46%;
  min-width:300px;
  height:340px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: left 0.2s ease;
  z-index: 2;
  margin:30px 0px 30px 0;
}

.box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form h1 {
  margin: 0 0 10px;
  text-align: center;
  font-size: 22px;
  color: #333;
}

.form-item input {
  height: 38px;
  width:200px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-item input:focus {
  outline: none;
  border-color: rgb(17, 137, 141);
  box-shadow: 0 0 0 2px rgba(17, 137, 141, 0.2);
}

.form-item input {
  width: 100%;
  max-width: 260px;
  box-sizing: border-box;
}

.submit-btn {
    display: block;     /* ← これが重要 */
  margin: 10px auto 0;
  height: 40px;
  width:50%;
  border-radius: 20px;
  border: none;
  background-color: rgb(68, 109, 213);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.submit-btn:hover {
  background-color: rgb(48, 86, 190);
}

.submit-btn:active {
  transform: scale(0.98);
}

.error-msg {
    position:absolute;
    top:10%;;
    width:50%;
      transform: translate(46%, -50%);
  color: #ff4d4f;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  /* margin: 10px 0; */
  z-index:100;
}

.login {
  margin-top: 6px;
  font-size: 11px;
  text-align: right;
  color: #555555;
}

.login a {
  color: rgb(17, 137, 141);
  text-decoration: none;
}

.login a:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .form-item input {
  width: 90%;
  }
}
</style>
