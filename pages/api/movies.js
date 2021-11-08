import clientPromise from '../../lib/mongodb';

// from the tutorial https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/

export default async (req, res) => {
    const client = await clientPromise;
    const db = await client.db();

    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    // from https://github.com/vercel/next.js/issues/29891

    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    res.json(movies);
};
