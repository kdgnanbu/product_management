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


        <div class="main">
<div class="welcome">
 <h1>Welcome</h1>
 <img src="../img/main.png" alt="main画像" />
</div>
 <div class="form">
            <h1>ログイン</h1>
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

           </div>

</template>
<style>

    .main {
  display: flex;
  position: relative; /* 絶対配置の基準 */
  width: 100%;
  height: 400px;
  max-width: 1000px;
  margin: auto;
}

/* 左側のウェルカムエリア */
.welcome {
  width: 50%;
  background-color: rgb(17, 137, 141);
  color: rgb(157, 206, 241);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden; /* はみ出す要素を隠す */
}

/* 文字を縦に回転 */
.welcome h1 {
  position: absolute;
  top: 50%;           /* 中央寄せ */
  left: -40px;        /* 少し左に出す */
  transform: translateY(-50%) rotate(90deg);
  margin: 0;
  font-size: 40px;
  z-index: 2;
}

/* 背景画像 */
.welcome img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: 300px;
  opacity: 0.6;
  z-index: 1;
}

/* ログインフォーム */
.form {
  position: absolute; /* 上に重ねる */
  top: 0;
  left: 40%;         /* ウェルカムの上に少し右寄せで重ねる */
  width: 50%;        /* 固定幅 */
  background-color: #fafafa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  z-index: 3;
}

/* 画面幅が狭くなるとフォームを少し右に寄せて自然に重なる */
@media (max-width: 900px) {
  .form {
    left: 30%;
    width: 60%;
  }
}

@media (max-width: 600px) {
  .form {
    left: 20%;
    width: 70%;
  }
  .welcome h1 {
    left: -30px;
    font-size: 32px;
  }
}

</style>
