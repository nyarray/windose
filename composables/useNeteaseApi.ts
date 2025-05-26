import CryptoJS from 'crypto-js'

const encryptedParam = (text: string) => {
    if (text == null) {
        return "params=null&encSecKey=null";
    }
    const modulus = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7" +
            "b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280" +
            "104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932" +
            "575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b" +
            "3ece0462db0a22b8e7";
            const nonce = "0CoJUm6Qyw8W8jud";
            const pubKey = "010001";
            const secKey = getRandomString();
            const encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
            const encSecKey = rsaEncrypt(secKey, pubKey, modulus);
    // return "params=" + URLEncoder.encode(encText, "UTF-8") + "&encSecKey=" + URLEncoder.encode(encSecKey, "UTF-8");
    return "params=" + encodeURI(encText) + "&encSecKey=" + encodeURI(encSecKey);
}

const getRandomString = () => {
    return ''
}
const rsaEncrypt = (secKey: string, pubKey: string, modulus: string) => {
    return ''
}

const aesEncrypt = (text?: string, nonce?: string) => {
    // const iv = CryptoJS.lib.WordArray(Buffer.alloc('0102030405060708'))
    // const ivParameterSpec = Buffer.alloc(16, iv);
    // const key = ''
    // CryptoJS.AES.encrypt('0102030405060708', key, { mode: CryptoJS.mode.CBC, iv: iv })



    // CryptoJS.AES.encrypt(ivParameterSpec, '')
    //  const secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "AES");
    //     Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    //     cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
    //     byte[] encrypted = cipher.doFinal(text.getBytes());
    //     return Base64.encodeBase64String(encrypted);
    return ''
}
export {
}