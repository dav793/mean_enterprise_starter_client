
class IdGenerator {

    protected lastId = 0;

    constructor() {}

    generateUniqueId(): number {
        this.lastId++;
        return this.lastId;
    }

}

export default new IdGenerator();
