const generateRandomNumber = (len = 100) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = '';
    for(let i = 1; i<=len; i++){
        let pos = Math.floor(Math.random()*chars.length);
        random += chars[pos];
    }
    return random;
}

module.exports = {generateRandomNumber}