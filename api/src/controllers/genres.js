const { getGenresApiDb, getGenresFromDb } = require('./index.js');

const getAllGenres = async(req,res) =>{
    try{
        await getGenresApiDb();
        let genres = await getGenresFromDb();
        genres = genres.map(g =>{
            return {
                id: g.id,
                name: g.name,
            }
        })
        res.send(genres)
    }catch(err){
        res.send({errMsg: err});
    }
}

module.exports = {
    getAllGenres,
};