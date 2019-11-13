import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

class App extends Component {
    state = {
        values: []
    };
    componentDidMount() {
        axios.get("https://localhost:5001/WeatherForecast").then(response => {
            this.setState({
                values: response.data
            });
        });
    }
    render() {
        return (
            <div>
                <Header as="h2" icon="users" content="Reactivities" />
                <List>
                    {this.state.values.map((value: any) => (
                        <List.Item key={value.temperatureC + value.date}>
                            {value.summary}
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }
}

export default App;
