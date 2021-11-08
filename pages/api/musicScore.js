import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
    const client = await clientPromise;
    const db = await client.db();

    const score1 = await db
        .collection("score1")
        .find({})
        .toArray();

    res.json(score1);
    console.log(res.json(score1))
    return res.json(score1);
};
