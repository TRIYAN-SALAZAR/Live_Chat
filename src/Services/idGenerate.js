function generateRandomID() {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        id += letters.charAt(randomIndex);
    }

    for (let i = 0; i < 7; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        id += randomDigit;
    }

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        id += letters.charAt(randomIndex);
    }

    return id;
}

module.exports = generateRandomID;
