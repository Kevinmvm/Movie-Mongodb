import { MongoClient } from 'mongodb';

console.log("Starting main")
const uri = "mongodb+srv://kevinmvm:kevinmvm@cluster0.fthbn.mongodb.net/test";
const client = new MongoClient(uri);

class Movies {
    constructor() {
        this.movies = this.main()
    }

    async main() {
        try {
            console.log("moviesMongo entro en la conexion")
            //Connect to the MongoDB cluster
            await client.connect();
            const database = client.db("movies");
            const collection = database.collection("movie");
            const moviesCursor = await collection.find({});
            const moviesA = await moviesCursor.toArray();
            //console.log(movies);
            return moviesA;
        }
        catch (error) {
            console.error(error);
        }
        db.close();
    }

    async getMovies() {
        console.log("moviesMongo estoy en getMovies")
        const moviesAll = await this.movies
        console.log(moviesAll)
        //return allMovies;
        return await this.movies;
    }
    async getMovieById(id) {
        console.log(`---> moviesMongo::getMovieById = ${id} Mongo`);
        const moviesAll = await this.movies
        //console.log(moviesAll)
        const movieID = moviesAll.find(element => element.id == id);
        return movieID;
    }
    async createMovie(req) {
        console.log(`---> moviesMongo::createMovie = ${req.id}`);
        /* EN MEMORIA
        const moviesAll = await this.movies;
        moviesAll.push(req);
        console.log(moviesAll)
        return req;*/

        try {
            console.log("entro en la conexion")
            //Connect to the MongoDB cluster
            await client.connect();
            const database = client.db("movies");
            const collection = database.collection("movie");
            await collection.insertOne(req)
            return req;
        }
        catch (error) {
            console.error(error);
        }
        db.close();
    }

    async removeMovie(id) {
        console.log(`---> moviesMongo::removeMovie = ${id}`);
        /* En memoria
        const moviesAll = await this.movies;
        const index = moviesAll.findIndex(element => element.id == id);
        if (index != -1) moviesAll.splice(index, 1);
        return index;*/

        try {
            console.log("entro en la conexion")
            //Connect to the MongoDB cluster
            const moviesAll = await this.movies
            const index = moviesAll.find(element => element.id == id);

            await client.connect();
            const database = client.db("movies");
            const collection = database.collection("movie");
            await collection.deleteOne(index)
            //console.log(id);
            //console.log (index);
            return index
        }
        catch (error) {
            console.error(error);
        }
        db.close();
    }


    async updateMovie(req) {
        console.log(`---> moviesMongo::updateMovie`);
        /* EN MEMORIA
        const movie = await this.getMovieById(req.id);
        if (typeof movie != 'undefined') {
            await this.removeMovie(req.id);
            await this.createMovie(req);
        }
        return movie;*/
        try {
            console.log("entro en la conexion")
            //Connect to the MongoDB cluster
            const moviesAll = await this.movies
            const movie = moviesAll.find(element => element.id == req.id);
            console.log("movie de Update", movie)
            const newMov = req;

            await client.connect();
            const database = client.db("movies");
            const collection = database.collection("movie");
            /*await client.connect();
            const database = client.db("movies");
            const collection = database.collection("movie");*/
            /*const findID = req.id;
            const movie = await collection.findOne({id: findID})*/
            //const moviesA = await movie.toArray();
            //console.log("movie update", movie)
            if (typeof movie != 'undefined') {
                //await this.removeMovie(req.id);
                //await collection.deleteOne(req.id)
                //await this.createMovie(req);
                //await collection.insertOne(req)
                console.log("entro en la conexion")
                //Connect to the MongoDB cluster
                await collection.deleteOne(movie)
                await collection.insertOne(newMov)
                return movie;
            }
        }
        catch (error) {
            console.error(error);
        }
        db.close();
    }
}


export default new Movies()
//console.log(Movies.main)

/*

constructor() {
    this.mng = {
        id: Number,
        title: String,
        genres: [],
        actors: [],
        year: Number,
        director: String
    }

            List databases
        let databasesList;
        databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));

getMovies() {
    let moviesCursor = await collection.find({});
    let movies = await moviesCursor.toArray();
    console.log("creo el array de movies");
    //console.log(movies);
    return movies;
}


class Movies {

    constructor() {
        this.mgfl = new ManagerFs('./data/movies.json');
        this.movies = this.mgfl.getData();

    constructor() {
        this.mongoClient = mongodb.MongoClient;
        this.movies = mongodb.ObjectID;
       }

    getMovies() {
        return this.movies;
    }
    getMovieById(id) {
        console.log(`---> movies::getMovieById = ${id}`);

        return this.movies.find(element => element.id == id);
    }

    getMovieBy(elem) {
        console.log(`---> movies::getMovieBy = ${elem.value}`);

        return this.movies.filter(element => element[elem.key] == elem.value);
    }

    removeMovie(id) {
        console.log(`---> movies::removeMovie = ${id}`);

        const index = this.movies.findIndex(element => element.id == id);
        if (index != -1) this.movies.splice(index, 1);
        return index;
    }

    createMovie(req) {
        console.log(`---> movies::removeMovie = ${req.id}`);

        this.movies.push(req);
        return req;
    }

    updateMovie(req) {
        console.log(`---> movies::updateMovie`);

        const movie = this.getMovieById(req.id);
        if (typeof movie != 'undefined') {
            this.removeMovie(req.id);
            this.createMovie(req);
        }
        return movie;
    }

}
*/