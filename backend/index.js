const express = require("express");
const rootRouter = require("./routes/api/v1/index.routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
