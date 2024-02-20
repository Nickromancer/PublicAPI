import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/getCharacter", async (req, res) => {
  try {
    const data = req.query;
    const response = await axios.get(
      `https://www.dnd5eapi.co/api/classes/${data["classes"]}/levels`
    );

    console.log(response.data);
    const result = response.data;
    res.render("index.ejs", { result: result, level: req.query["level"] });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
