import React from "react";
import axios from "axios";
import "./App.scss";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    // Fetch todos from APIM
    axios
      .get("https://poc-apim-knagzaoh.azure-api.net/api", {
        headers: {
          "Ocp-Apim-Subscription-Key": "76797dd100f84f619be00a8f595c5508",
        },
      })
      .then((response) => {
        this.setState({
          todos: response.data.data,
        });
      })
      .catch((e) => console.error("Error while fetching todos: ", e));
  }

  handleAddTodo = (value) => {
    // Post new todo to APIM
    axios
      .post(
        "https://poc-apim-knagzaoh.azure-api.net/api/todos",
        { text: value },
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "76797dd100f84f619be00a8f595c5508",
          },
        }
      )
      .then(() => {
        this.setState({
          todos: [...this.state.todos, { text: value }],
        });
      })
      .catch((e) => console.error("Error while adding a todo: ", e));
  };

  render() {
    return (
      <div className="App container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
              <h1>Todos</h1>
              <div className="todo-app">
                <AddTodo handleAddTodo={this.handleAddTodo} />
                <TodoList todos={this.state.todos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
