import React from "react";
import styled from "styled-components";
import EventEmitter from "event-emitter";
import CheckMarkImage from "../../../images/checkmark.png";

const Contianer = styled.div`
    background: rgb(16, 192, 16);
    font-weight: bold;
    color: white;
    padding: 16px;
    top: ${props => props.top}px;
    right: 16px;
    z-index: 99;
    border-radius: 7px 7px 7px 7px
    position: absolute;
    transition: top 0.5s ease;
`;

const emitter = new EventEmitter()

export const DeleteOneVehicleNotify = (message) => {
    console.log(message)
    emitter.emit("notification", message);
};

export default class DeleteOneVehicleNotification extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            top: -75,
            message: ""
        };

        this.timeout = null;
        emitter.on("notification", (message) => {
            this.onShow(message);
        });
    };

    onShow = (message) => {
        console.log("onShow in Delete")
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
        console.log("showNotification in Delete")
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
                Vehicle Deleted Successfully<img alt="checkmark" className="checkMarkImage" src={CheckMarkImage}></img>
            </Contianer>
        );
    };
};