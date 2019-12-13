import React from "react";
import Seat from "./Seat"

export default class Hall extends React.Component {
    constructor(props) {
        super(props);
        let rows =10, cols=15;

        this.state = {
            rows: rows,
            cols: cols,
            hall: new Array(rows),
            noOfSeats: 0,
            confirmDisabled: true,
            totalPrice: 0
        };
        for(let i=0; i<rows; i++) {
            this.state.hall[i] = new Array(cols);
            let rowId = String.fromCharCode(65+i);
            let seatClass =  ["A","B"].indexOf(rowId) > -1 ? "CLUB" : "EXECUTIVE";
            let seatPrice =  ["A","B"].indexOf(rowId) > -1 ? 250 : 236;
            for(let j=0; j<cols; j++) {
                this.state.hall[i][j] = {status: 'available', class: 'executive', price: '236'};
                this.state.hall[i][j].rowId = rowId;
                this.state.hall[i][j].seatId = rowId + ' ' + (j+1);
                this.state.hall[i][j].class = seatClass;
                this.state.hall[i][j].price = seatPrice;
                this.state.hall[i][j].status = ((["C", "D", "E", "F"].indexOf(rowId) > -1 && j < 7) || (rowId != 'A' && j<2)) ? 'void': 'available'

            }
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleConfirmBooking = this.handleConfirmBooking.bind(this);
     }

    handleClick(seatId) {
        let rowNo = this.getRowNoFromSeatId(seatId);
        let colNo = this.getColNoFromSeatId(seatId);
        let i =0;
        this.deselectSelectedSeats();
        for (i = 0; i < this.state.noOfSeats && colNo + i < this.state.cols; i++) {
            if (this.state.hall[rowNo][colNo + i].status === 'available') {
                continue;
            } else {
                break;
            }
        }
        if (i === this.state.noOfSeats ) {
            for (let i = 0; i < this.state.noOfSeats; i++) {
                this.state.hall[rowNo][colNo+i].status = 'selected';
            }
            this.setState({confirmDisabled: false});
        }
    }

    deselectSelectedSeats() {
        for (let i = 0; i < this.state.rows; i++) {
            for (let j = 0; j < this.state.cols; j++) {
                if(this.state.hall[i][j].status === 'selected'){
                    this.state.hall[i][j].status = 'available';
                }
            }
        }
    }

    handleChange(e) {
        this.deselectSelectedSeats();
        this.setState({[e.target.name]: parseInt(e.target.value), totalPrice:0});
    }

    handleConfirmBooking() {
        let totalPrice =0;
        for (let i = 0; i < this.state.rows; i++) {
            for (let j = 0; j < this.state.cols; j++) {
                if(this.state.hall[i][j].status === 'selected'){
                    this.state.hall[i][j].status = 'booked';
                    totalPrice += this.state.hall[i][j].price;
                }
            }
        }
        this.setState({confirmDisabled: true, totalPrice});
    }

    getRowNoFromSeatId(seatId) {
        let rowStrToNo = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9};
        let rowStr = seatId.split(' ')[0];
        return rowStrToNo[rowStr];
    }

    getColNoFromSeatId(seatId) {
        return seatId.split(' ')[1] - 1;
    }

    render() {
        const rows = [];
        for(let i = 0; i< this.state.rows; i++) {
            const seats = [];

            for(let j=0; j<this.state.cols; j++) {
                let seat = this.state.hall[i][j];
                seats.push(<Seat
                    key={seat.seatId}
                    label={seat.seatId.split(' ')[1]}
                    seatId={seat.seatId}
                    seatClass={seat.class}
                    seatPrice={seat.price}
                    status={seat.status}
                    handleClick={this.handleClick.bind(this)}
                />)
            }
            if (i == 0) {
                rows.push(<div>
                    CLUB - {this.state.hall[i][0].price}
                <hr/></div>)
            }
            if (i === 2 ) {
                rows.push(<div>
                    EXECUTIVE - {this.state.hall[i][0].price}
                    <hr/></div>)

            }

            rows.push(<div className={'row'}>
                <span className={'rowName'}>{this.state.hall[i][0].rowId}</span>
                {seats}
            </div>);

        }


        return(<div className={'hall'}>
            {rows}
            <label>No of Seats </label>
            <input type="number" name='noOfSeats' min={0} max={10}
                   defaultValue={this.state.noOfSeats}
                   className="no-of-seats"
                   onChange={this.handleChange}
            />
            <button className="confirm"
                    disabled={this.state.confirmDisabled}
                    onClick={this.handleConfirmBooking}
                    >Confirm</button>

            <div className="price">
                Total Price: <label>{this.state.totalPrice}</label>
            </div>
        </div>)
    }
}