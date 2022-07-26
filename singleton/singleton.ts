class Singleton {
    static instance: Singleton;
    id: number;

    constructor(id: number) {
        this.id = id;
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
}

const obj1 = new Singleton(5);
const obj2 = new Singleton(52);

console.log(" obj1 - ", obj1)
console.log(" obj2 - ", obj2)
console.log(obj1 === obj2);