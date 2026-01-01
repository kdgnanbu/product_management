<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useValidators } from '@/composable/validators';
import { useStorage } from '@/composable/storage';
import { useShowItem,useEditState,useEditItem,useDeleteItem  } from '@/composable/useCrud'; 

const { isFiveDigits, isNumber} = useValidators();
const { load, save } = useStorage();
const {isEdit,editId} = useEditState()
const { deleteItem } = useDeleteItem();

const router = useRouter();
const route = useRoute();

const name = ref('');
const id = ref('');
const selectedCategory = ref('');
const unitPrice = ref('');
const minLot = ref('');
const remarks = ref('');
const errorMessage = ref('');

const category = ref(load('category'));
const product = ref(load('product'));

const saveProduct = () => {
    errorMessage.value = "";
    if (name.value === "" || id.value === "" || selectedCategory.value === "" || unitPrice.value === "" || minLot.value === "") {
        errorMessage.value = "※全ての項目を入力してください。\n";
        return;
    }
    const findId = product.value.find((x) => x.id === id.value);
    if (findId) {
        errorMessage.value += "※この商品IDは利用されています。\n";
    } else if(!isFiveDigits(id.value)) errorMessage.value += "※商品IDは5桁の半角数字で入力してください。\n";
    if(!isNumber(unitPrice.value)) errorMessage.value += "商品単価は半角数字で入力してください。\n";
    if(!isNumber(minLot.value)) errorMessage.value += "※仕入時最低ロットは半角数字で入力してください。\n";
    if (errorMessage.value) {
        return;
    };
    const productData = {
        name: name.value,
        id: id.value,
        selectedCategory: selectedCategory.value,
        unitPrice: unitPrice.value,
        minLot: minLot.value,
        remarks: remarks.value
    };
    product.value.push(productData);
    save('product', product.value);
    alert('保存しました！');
};

const handleDeleteUser = (id) => {
  deleteItem(
    product,
    id,
    findProduct => `「ID:${findProduct.id}/名前:${findProduct.name}」を削除しますか`,
    list => save('product', list)
  );
};

const editState = { isEdit, editId };
const { showItem: showProduct } = useShowItem(
  product,
{ name, id, selectedCategory, unitPrice, minLot, remarks },
  editState
);

const { applyEdit } = useEditItem(list => save('product', list));
const editProduct = () => {
    errorMessage.value = ""
    const duplicate = product.value.some(
        (product) => product.id === id.value && product.id !== editId.value
    );
    const findProduct = product.value.find((x) => x.id === editId.value);
    const idx = product.value.findIndex((x) => x.id === editId.value);
    if (duplicate) {
        errorMessage.value += "※商品IDは利用されています。\n";
    } else if(!isFiveDigits(id.value)) errorMessage.value += "※商品IDは5桁の半角数字で入力してください。\n";
    if(!isNumber(unitPrice.value)) errorMessage.value += "商品単価は半角数字で入力してください。\n";
    if(!isNumber(minLot.value)) errorMessage.value += "※仕入時最低ロットは半角数字で入力してください。\n";
    if (errorMessage.value) {
        return;
    };
        applyEdit(product, editId, { name: name.value, id: id.value,selectedCategory:selectedCategory.value,unitPrice:unitPrice.value,minLot:minLot.value,remarks:remarks.value });
        name.value = "";
        id.value = "";
        selectedCategory.value = "";
        unitPrice.value = "";
        minLot.value = "";
        remarks.value = "";
        isEdit.value = true;
}
</script>

<template>
    <div class="add-area">
<button 
  class="back-btn"
  @click="$router.push({ path: '/login-complete', query: { id: route.query.id } })"
>
  ← 戻る
</button>
        <h1>商品情報追加、編集画面</h1>
        <div class="form-item">
            <label>商品ID：</label>
            <input type="text" v-model="id" placeholder="例：00001" maxlength="5" />
        </div>
        <div class="form-item">
            <label>商品名：</label>
            <input type="text" v-model="name" placeholder="例：チョコレート" />
        </div>
        <div class="form-item">
            <label>商品カテゴリー：</label>
            <select v-model="selectedCategory">
                <option value="">選択してください</option>
                <option v-for="(c, index) in category" :key="index" :value="c">
                    {{ c }}
                </option>
            </select>
        </div>
        <div class="form-item">
            <label>単価：</label>
            <input type="text" v-model="unitPrice" placeholder="例：100" />円
        </div>
        <div class="form-item">
            <label>仕入時最低ロット：</label>
            <input type="text" v-model="minLot" placeholder="例：10" />
        </div>
        <div class="form-item">
            <label>備考：</label>
            <textarea v-model="remarks" rows="4" cols="50" placeholder="備考を入力してください"></textarea>
        </div>
        <button class="submit-btn" @click="saveProduct" v-if="isEdit">
            新規登録
        </button>
        <button class="submit-btn green" @click="editProduct" v-else>
            変更
        </button>
        <p class="error-msg" v-if="errorMessage" style="white-space: pre-line;">{{ errorMessage }}</p>
        <h1>商品情報一覧</h1>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>カテゴリー</th>
                    <th>商品名</th>
                    <th>商品ID</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in product" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.selectedCategory }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.id }}</td>
                    <td>
                        <button class="edit-btn" @click="showProduct(item.id)">編集</button>
                        <button class="delete-btn" @click="handleDeleteUser(item.id)">削除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
