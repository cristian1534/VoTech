import express from "express";
import cors from "cors";
import userRoutes from "./user/infrastructure/routes/user.routes";
import path from "path";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'user/infrastructure/postgres')));


app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
