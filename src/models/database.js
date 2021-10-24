let database;

class Database {

    collectionName;
    collection;

    static setDatabase(db) {
        database = db;
    }

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collection = database.collection(collectionName);
    }

    find(filters) {
        return this.collection.find();
    }

    findOne(filters) {
        console.log('f: ', filters);
        return this.collection.findOne(filters);
    }

    insertOne(filters) {
        return this.collection.insertOne(filters);
    }
}

module.exports = Database;