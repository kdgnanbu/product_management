<script setup>
import { ref } from 'vue'
import { useValidators } from '@/composable/validators';
import { useStorage } from '@/composable/storage';

const { isFiveDigits, isName, isPassword } = useValidators();
const { load, save } = useStorage();

const name = ref('')
const id = ref('')
const password = ref('')
const errorMessage = ref('')
const isEdit = ref(true);

const users = ref(load('users'));

const saveUser = () => {
    const findUsers = users.value.find((x) => x.id === id.value);
    errorMessage.value = "";
    if (name.value === "" || id.value === "" || password.value === "") {
        errorMessage.value += "※全ての項目を入力してください"
        return
    }
    if (!isName(name.value)) errorMessage.value += "※名前は漢字・ひらがな・カタカナで入力してください。\n";
    if (findUsers) {
        errorMessage.value += "※このユーザーIDは利用されています。\n";
    } else if (!isFiveDigits(id.value)) errorMessage.value += "※ユーザーIDは5桁の半角数字で入力してください。\n";
    if (!isPassword(password.value)) errorMessage.value += "※パスワードは英数字を含む8文字以上で入力してください。";
    if (errorMessage.value) {
        return;
    }
    errorMessage.value = "";
    const userData = {
        name: name.value,
        id: id.value,
        password: password.value
    }
    users.value.push(userData)
    save('users', users.value);
    alert('保存しました！');
    name.value = "";
    id.value = "";
    password.value = "";
};
</script>

<template>
    <div class="add-area">
        <h1>新規登録画面</h1>
        <div class="description">
            <p>
                以下の項目を入力して新規登録を行ってください。<br /><br />
                ・名前は <strong>漢字または平仮名またはカタカナ</strong> で入力してください。<br />
                ・ユーザーIDは <strong>5桁の半角数字</strong> で設定してください。<br />
                ・パスワードは <strong>英数字を含む8文字以上</strong> を入力してください。<br /><br />
                入力内容を確認のうえ、「登録」ボタンを押してください。
            </p>
            <p class="login">
                ※アカウントをお持ちの方は
                <router-link to="/login">こちら</router-link><br>
                ※登録されているアカウントは
                <router-link to="/user-list">こちら</router-link>
            </p>
        </div>
        <div class="form-item">
            <label>名前：</label>
            <input type="text" v-model="name" placeholder="例：山田たろう" />
        </div>
        <div class="form-item">
            <label>ユーザーID：</label>
            <input type="text" v-model="id" placeholder="例：12345" maxlength="5" />
        </div>
        <div class="form-item" v-show="isEdit">
            <label>パスワード：</label>
            <input type="password" v-model="password" placeholder="英数字8文字以上" />
        </div>
        <p v-if="errorMessage" class="error-msg" style="white-space: pre-line;">{{ errorMessage }}</p>
        <button class="submit-btn" @click="saveUser">
            新規登録
        </button>
    </div>
</template>
