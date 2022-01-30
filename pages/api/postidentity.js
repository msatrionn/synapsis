import nextConnect from "next-connect";
import middleware from "../../middleware/database";
const handle = async (req, res) => {
  const handler = nextConnect();
  handler.use(middleware);
  handler.get(async (req, res) => {
    let doc = await req.db.collection("identity").findOne();
    // console.log(doc);
    if (doc) {
      res.json(doc);
    } else {
      res.json("data not found");
    }
  });
};

const identity = () => {
  return (
    <div>
      <form>
        <button onClick={handle}>tombol</button>
      </form>
    </div>
  );
};

export default identity;
