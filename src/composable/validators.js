export function useValidators() {

  const isFiveDigits = (value) => /^\d{5}$/.test(value);
//   整数五文字
  const isNumber = (value) => /^\d+$/.test(value);
//   整数判別
  const isName = (value) => /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/.test(value);
// 漢字、ひらがな、カタカナ
const isPassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
// 半角英数八文字以上
  return { isFiveDigits, isNumber, isName, isPassword };
}
