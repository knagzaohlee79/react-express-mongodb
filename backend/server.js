/**
 * Created by Syed Afzal
 */
require("./config/config");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();

//connection from db here
db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  adding routes
require("./routes")(app);

const port = process.env.PORT || 3000; // Sử dụng cổng do Azure cung cấp, nếu không có thì dùng cổng mặc định 3000 cho local
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
