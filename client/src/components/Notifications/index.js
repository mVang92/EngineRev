import React from "react";
import styled from "styled-components";
import EventEmitter from "event-emitter";

const Contianer = styled.div`
    background: green;
    color: white;
    padding: 16px;
    top: ${props => props.top}px;
    right: 16px;
    z-index: 99;
    position: absolute;
    transition: top 0.5s ease;
    > i {
        margin-left: 8px;
    }
`;

const emitter = new EventEmitter()

export const notify = (message) => {
    emitter.emit("notification", message);
};

export const VehicleProps = props => {
    return (
        <div>
            {/* {console.log(props.state.year)}
            {console.log(props.state.make)}
            {console.log(props.state.model)} */}
        </div>
    );
};

export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            top: -75,
            message: ""
        };

        this.timeout = null;
        emitter.on("notification", (message) => {
            this.onShow(message)
        });
    };

    onShow = (message) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.setState({ top: -75 }, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(message);
                }, 500);
            });
        } else {
            this.showNotification(message);
        };
    };

    showNotification = (message) => {
        this.setState({
            top: 75,
            message
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -75,
                });
            }, 4000);
        });
    };

    render() {
        return (
            <Contianer top={this.state.top}>
                Vehicle Added Successfully<i className="fa fa-bell"></i>
            </Contianer>
        );
    };
};