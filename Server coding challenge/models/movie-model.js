const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieByID : function(movie){
        return moviesCollection
            .findOne({movie_ID : movie})
            .then(res => {
                return res
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    removeActorFromMovieList: function(movie, actor){
        return moviesCollection
            .findOneAndUpdate({movie_ID : movie}, {$pull : {actors: actor._id}})
            .then(() => {
                return moviesCollection
                    .findOne({movie_ID : movie})
                    .populate("actors", "lastName firstName")
            })
            .then(res => {
                return res
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    addActorFromMovieList: function(movie, actor){ // to populate the movies
        return moviesCollection
            .findOneAndUpdate({movie_ID : movie}, {$push : {actors: actor._id}})
            .then((res) => {
                console.log(res)
                return moviesCollection
                    .findOne({movie_ID : movie})
                    .populate("actors", "lastName firstName")
            })
            .then(res => {
                return res
            })
            .catch( err => {
                throw new Error( err );
            });
    }

}

module.exports = {
    Movies
};

