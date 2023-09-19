export default isPalindrome;
function isPalindrome(phrase) {
    const re = /[^A-Za-z0-9]/g; // or var re = /[\W_]/g;
    phrase = phrase.toLowerCase().replace(re, '');
    // Paso 2. Crea el bucle FOR
    const len = phrase.length; // var len = "A man, a plan, a canal. Panama".length = 30
    for (var i = 0; i < len / 2; i++) {
        if (phrase[i] !== phrase[len - 1 - i]) { // Siempre y cuando los caracteres de cada parte coincidad, el bucle FOR debera seguir.
            return false; // Cuando los caracteres ya no coinciden, false es regresado y salimos del bucle FOR.
        }
    }
    return true;
}
