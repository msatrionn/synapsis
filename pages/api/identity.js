import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import mongoose from "mongoose";
const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  const curPage = req.query.page || 1;
  const perPage = 5;

  try {
    const users = await req.db
      .collection("identity")
      .find()
      .skip((curPage - 1) * perPage)
      .limit(perPage)
      .sort({ _id: -1 })
      .toArray();
    const totalData = await req.db.collection("identity").find().count();
    res.status(200).json({
      message: "Fetched users",
      users: users,
      curPage: curPage,
      total: totalData,
      maxPage: Math.ceil(totalData / perPage)
    });
  } catch (err) {
    res.status(400).json({ status: err });
  }
});
handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  let doc = await req.db.collection("identity").insertOne(data);
  res.json({ message: "ok" });
});

export default handler;
