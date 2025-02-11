import React from "react";
import axios from "axios";
import "./App.scss";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const API_BASE_URL = "https://poc-apim-knagzaoh.azure-api.net"; // URL của APIM
const API_KEY = "76797dd100f84f619be00a8f595c5508"; // Thay bằng key thật

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_BASE_URL}`, {
        headers: { "Ocp-Apim-Subscription-Key": API_KEY },
      })
      .then((response) => {
        this.setState({
          todos: response.data.data,
        });
      })
      .catch((e) => console.log("Error: ", e));
  }

  handleAddTodo = (value) => {
    axios
      .post(
        `${API_BASE_URL}`,
        { text: value },
        {
          headers: { "Ocp-Apim-Subscription-Key": API_KEY },
        }
      )
      .then(() => {
        this.setState({
          todos: [...this.state.todos, { text: value }],
        });
      })
      .catch((e) => console.log("Error: ", e));
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
