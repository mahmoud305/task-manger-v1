var { writeFileSync, existsSync, readFileSync, unlink } = require('fs');

class LocalStorage {
 
    // initialCall(){
    //     console.log("hello");
    //     if (existsSync(__dirname+'localStorage.json')) {
    //         var txt = readFileSync(__dirname+'localStorage.json');
    //         this.items = JSON.parse(txt);
    //     } else {
    //         this.items = {};
    //     }
    // }
    constructor() {
        console.log("hello");
        console.log(__dirname);
        if (existsSync(__dirname+'/localStorage.json')) {
            var txt = readFileSync(__dirname+'/localStorage.json');
            this.items = JSON.parse(txt);
        } else {
            this.items = {};
        }
    }

    getItem(key) {
        return this.items[key];
    }

    async setItem(key, value) {
        this.items[key] = value;
        this.writeItemsToLocalstorage();
    }

    clear() {
        this.items = {};
        unlink(__dirname+'/localStorage.json', () => {
            console.log('localStorage file is removed');
        })
    }

    writeItemsToLocalstorage() {
        writeFileSync(__dirname+'/localStorage.json', JSON.stringify(this.items), error => {
            if (error) {
                console.log('Error occurred during writing file');
            }else{
                console.log("data stored in localstorage successfully.");
            }
        })
    }

    print() {
        console.log(this.items);
    }
}

module.exports = new LocalStorage();