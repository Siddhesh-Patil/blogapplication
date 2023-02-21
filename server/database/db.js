import mongoose from 'mongoose';


const Connection = async(username, password) => {

    const  URL = `mongodb://${username}:${password}@ac-wskghz6-shard-00-00.f4jrits.mongodb.net:27017,ac-wskghz6-shard-00-01.f4jrits.mongodb.net:27017,ac-wskghz6-shard-00-02.f4jrits.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-8sr0bw-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        await mongoose.connect(URL, { useNewUrlParser:true });
        console.log('database connected successfully');
    }catch(error){
        console.log('Error while connecting with database', error);
    }
}

export default Connection;