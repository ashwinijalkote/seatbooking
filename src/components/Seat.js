import React from "react";

export default class Seat extends React.Component {

    handleClick = (e)=>{
        this.props.handleClick(this.props.seatId)
    }

    render() {
        let classString = 'seat '+this.props.seatId +' '+ (this.props.status )
        return <span onClick={this.handleClick} className={classString}  id={this.props.seatId}>
            {this.props.label}
        </span>
    }
}