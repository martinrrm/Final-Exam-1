const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler')
const { Movies } = require('./models/movie-model')
const { Actors } = require('./models/actor-model')

const app = express();

app.patch('/api/delete-movie-actor/:movie_ID', jsonParser, async(req, res, next) => {
    const { id } = req.body

    // Id is missing in the body of the request - 406
    if(!id){
        next({code: 1})
    }

    const { movie_ID } = req.params

    // id and movie_ID do not match - 409
    if(id !== movie_ID){
        next({code: 2})
    }

    const {lastName, firstName} = req.body
    
    // You need to send both firstName and lastName of the actor to removefrom the movie list - 403
    if(!lastName || !firstName) {
        next({code: 3})
    }

    const movie = await Movies.getMovieByID(movie_ID).then((movie) => movie).catch((e)=>console.log(e))
    const actor = await Actors.getActorByName({lastName, firstName}).then((actor) => actor).catch((e)=>console.log(e))

    //console.log(movie)
    //console.log(actor)

    // The actor or movie do not exist - 404
    if(!movie || !actor){
        next({code: 4})
    }
    
    Movies.removeActorFromMovieList(movie_ID, actor._id)
        .then((movie) => {
            return res.status(201).json(movie)
        })
        .catch(e => {
            console.log(e)
        })

    // Movies.addActorFromMovieList(movie_ID, actor._id)
    //     .then((movie) => {
    //         return res.status(200).json(movie)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })

    //return res.status(201).json({'j': 1})
})

app.use(errorHandler)

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});