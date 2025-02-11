// const express = require("express");
// const serverResponses = require("../utils/helpers/responses");
// const messages = require("../config/messages");
// const { Todo } = require("../models/todos/todo");

// const routes = (app) => {
//   const router = express.Router();

//   router.post("/todos", (req, res) => {
//     const todo = new Todo({
//       text: req.body.text,
//     });

//     todo
//       .save()
//       .then((result) => {
//         serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
//       })
//       .catch((e) => {
//         serverResponses.sendError(res, messages.BAD_REQUEST, e);
//       });
//   });

//   router.get("/", (req, res) => {
//     Todo.find({}, { __v: 0 })
//       .then((todos) => {
//         serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
//       })
//       .catch((e) => {
//         serverResponses.sendError(res, messages.BAD_REQUEST, e);
//       });
//   });

//   //it's a prefix before api it is useful when you have many modules and you want to
//   //differentiate b/w each module you can use this technique
//   app.use("/api", router);
// };
// module.exports = routes;
const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");

// Mock dữ liệu giả cho todos
const mockTodos = [
  { id: 1, text: "Buy groceries" },
  { id: 2, text: "Learn Node.js" },
  { id: 3, text: "Write blog post" }
];

const routes = (app) => {
  const router = express.Router();

  // Route POST /api/todos (Mock)
  router.post("/todos", (req, res) => {
    const todo = {
      id: mockTodos.length + 1, // Tạo id mới giả
      text: req.body.text
    };

    mockTodos.push(todo); // Thêm vào mock data

    // Trả về kết quả thành công
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, todo);
  });

  // Route GET /api (Mock)
  router.get("/", (req, res) => {
    // Trả về danh sách todos đã mock
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, mockTodos);
  });

  app.use("/api", router);
};

module.exports = routes;
