import React from "react";
import Seat from "./Seat"

export default class Hall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 10,
            cols: 15,
        }
    }

    handleClick(seatId){
        alert(seatId);
    }

    render() {


        let rows = [];
        for(let i = 0; i<this.state.rows; i++){
            let seats = [];
            let rowId = String.fromCharCode(65+i);
            let seatClass =  ["A","B"].indexOf(rowId) > -1 ? "CLUB" : "EXECUTIVE";
            let seatPrice =  ["A","B"].indexOf(rowId) > -1 ? 236 : 250;
            for(let j = 0; j<this.state.cols; j++){
                let seatId = rowId + ' ' + (j+1)
                seats.push(<Seat label={j+1} seatId={seatId} seatClass seatPrice handleClick={this.handleClick.bind(this)} />)
            }
            rows.push(<div className={'row'}>
                <span className={'rowName'}>{rowId}</span>
                {seats}
            </div>);
        }
        return(<div>
            {rows}
        </div>)
    }
}