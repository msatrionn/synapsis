import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import mongoose from "mongoose";
const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const { identityId } = req.query;
  try {
    let doc = await req.db
      .collection("identity")
      .findOne({ _id: mongoose.Types.ObjectId(identityId) });
    res.json(doc);
  } catch (error) {
    res.json("data not found");
  }
});

handler.delete(async (req, res) => {
  const { identityId } = req.query;
  let doc = await req.db
    .collection("identity")
    .deleteOne({ _id: mongoose.Types.ObjectId(identityId) });
  res.json({ message: "ok" });
});

handler.put(async (req, res) => {
  const { identityId } = req.query;
  const data = JSON.parse(req.body);
  let doc = await req.db
    .collection("identity")
    .updateOne(
      { _id: mongoose.Types.ObjectId(identityId) },
      { $set: data },
      { upsert: true }
    );
  res.json({ message: "ok" });
});

export default handler;
