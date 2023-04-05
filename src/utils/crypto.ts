// crypto the string
import CryptoJS from "crypto-js";

const KEY = "utool-clipboard";

export function encrypt(text: string, key = KEY) {
  const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
  const encodedCiphertext = window.btoa(ciphertext);
  return encodedCiphertext;
}

export function decrypt(encodedCiphertext: string, key = KEY) {
  const ciphertext = window.atob(encodedCiphertext);
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
}
