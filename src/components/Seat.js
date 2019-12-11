import React from "react";

export default class Seat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status:null
        }
    }

    handleClick = (e)=>{
        this.props.handleClick(this.props.seatId);
    }
    render() {
        let classString = 'seat '+this.props.seatId +' '+ (this.props.status || 'available')
        return <span onClick={this.handleClick} className={classString}  id={this.props.seatId}>
            {this.props.label}
        </span>
    }
}