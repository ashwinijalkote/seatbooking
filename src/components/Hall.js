import React from "react";
import Seat from "./Seat"

export default class Hall extends React.Component {
    constructor(props) {
        super(props);
        let rows =10, cols=15;

        this.state = {
            rows: rows,
            cols: cols,
            hall: Array.from(new Array(rows), () => new Array(cols).fill(
                {status: 'available', class: 'executive', price: '236'}
            ))
        }
        for(let i=0;i< rows; i++) {
            let rowId = String.fromCharCode(65+i);
            let seatClass =  ["A","B"].indexOf(rowId) > -1 ? "CLUB" : "EXECUTIVE";
            let seatPrice =  ["A","B"].indexOf(rowId) > -1 ? 250 : 236;
            for(let j=0; j<cols; j++) {
                this.state.hall[i][j].rowId = rowId;
                this.state.hall[i][j].seatId = rowId + ' ' + (j+1);
                this.state.hall[i][j].class = seatClass;
                this.state.hall[i][j].price = seatPrice;
                this.state.hall[i][j].status = ((["C", "D", "E", "F"].indexOf(rowId) > 1 && j < 7) || (rowId != 'A' && j<2)) ? 'void': 'available'
                //console.log(this.state.hall[i][j]);
            }
        }
    }

    handleClick(seatId){
        alert(seatId);
    }

    render() {
        const seats = [], rows = [];
        for(let i = 0; i< this.state.rows; i++) {
            for(let j=0; j<this.state.cols; j++) {
                let seat = this.state.hall[i][j];
                console.log(seat);
                seats.push(<Seat
                    key={seat.seatId}
                    label={seat.seatId.split(' ')[1]}
                    seatId={seat.seatId}
                    seatClass={seat.class}
                    seatPrice={seat.price}
                    handleClick={this.handleClick.bind(this)}
                />)
            }
            rows.push(<div className={'row'}>
                <span className={'rowName'}>{this.state.hall[i][0].rowId}</span>
                {seats}
            </div>);
        }



        /*let rows = [];
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
        }*/
        return(<div>
            {rows}
        </div>)
    }
}