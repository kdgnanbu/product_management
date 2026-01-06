<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 現在アクティブなメニューを管理
const activeMenu = ref(route.path.split('/').pop() || 'category')

// パスが変わったら activeMenu を更新
watch(() => route.path, (newPath) => {
    activeMenu.value = newPath.split('/').pop()
})

const go = (path) => {
    router.push(`/LoginComplete/${path}`)
}
const memberId = ref('')

// マウント時に読み込み
onMounted(() => {
    memberId.value = localStorage.getItem('memberId') || ''
})
</script>

<template>
    <div class="page">
        <div class="side-box">
            <ul class="menu">
                <li @click="go('category')" :class="{ active: activeMenu === 'category' }">カテゴリー管理</li>
                <li @click="go('product')" :class="{ active: activeMenu === 'product' }">商品管理</li>
                <li @click="go('user-list')" :class="{ active: activeMenu === 'user-list' }">会員管理</li>
                <li @click="go('pass')" :class="{ active: activeMenu === 'pass' }">パスワード変更</li>
            </ul>

        </div>
        <div class="main-box">
            <div class="top">
                <div class="top-text">
                    <span>ようこそ{{ memberId }}様</span>
                    <span class="logout" @click="$router.push('/login')">ログアウト<i class="fa-solid fa-arrow-right-from-bracket"></i></span>
                </div>

            </div>
            <router-view />
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 0;
}


.page {
    display: flex;
    height: 100vh;
    background-color: rgb(210, 242, 244);
    min-height: 500px;
    flex-direction: row;
}

.side-box {
    width: 20vw;
    background-color: rgb(17, 137, 141);
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 80px;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
}

.menu li {
    padding: 25px 20px;
    color: #fff;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s ease, padding-left 0.3s ease;
}

.menu li:hover {
    background-color: rgb(30, 180, 185);
    padding-left: 30px;
}

.menu li.active {
    background-color: rgb(50, 200, 200);
    padding-left: 30px;
    transform: scaleY(1);
    border-left: 5px solid #fff;
}

.menu li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background-color: #fff;
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.menu li:hover::before {
    transform: scaleY(1);
}

.menu li.active::before {
    display: none;
}

.main-box {
    width: 80vw;

}

.top {
    text-align: right;
    /* background-color: #65e2e2; */
    /* display: flex; */
    padding: 15px;
    cursor: pointer;
}

.top-text {
    display: flex;
    justify-content: flex-end;
    /* 右寄せ */
    align-items: center;
    /* 垂直中央揃え */
    gap: 20px;
}

/* モバイル用 */
@media (max-width: 768px) {
    .page {
        flex-direction: column-reverse;
    }

    .side-box {
        width: 100%;
        height: auto;
        padding-top: 0;
        flex-direction: row;
    }

    .main-box {
        width: 100%;
        height: 80vh;
        position: absolute;
        top: 0;
    }

    .menu {
        height:10vh;
        display: flex;
        flex: 1;
    }

    .menu li {
        padding: 15px 0 0 0;
        flex: 1;
        text-align: center;
    }

    .menu li:hover {
        padding-left: 0;
    }

    .menu li.active {
        padding-left: 0;
        border-left: 0;
        transform: scaleY(1);
        border-left: 0px solid #fff;
        border-top: 5px solid #fff;
    }
    .menu li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

}
</style>
