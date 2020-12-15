import React, { Component } from "react";
//import styled from "styled-component";

import Calendar from '../../component/Calendar/Calendar';

class CalendarControl extends Component {

    state = {
        dateOfFirstDay: '',
        datesDetail: [],
        //    {
                //1: {
                //    checked: false,
                //    dayOftheWeek: 'monday',
                //    words: {
                //        competition: '경쟁'
                //    }
                //}
        //    },
        //    {
        //        2: {
        //            checked: false,
        //            dayOftheWeek: 'tuesday',
        //            words: {
        //                perpetual: '끊임없이 반복되는'
        //            }
        //        }
        //    }
        //],
        datesOfMonth: 0,
        thisMonth: 0
    }

    componentDidMount() {
        const today = new Date();

        const thisMonth = today.getMonth();
        const firstDay = new Date(today.getFullYear(), today.getMonth());
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const datesDetail = [];
        const dateObj = {}

        for (let date = 1 ; date <= lastDay.getDate(); date++) {

            const dayOfTheWeek = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${date}`);

            dateObj[date] = {
                date,
                checked: false,
                dayOfTheWeek: dayOfTheWeek.getDay(),
                words: {
                    competition: '경쟁'
                }
            }

            datesDetail.push(dateObj[date]);
        }

        this.setState({ 
            datesOfMonth: lastDay, 
            datesDetail: datesDetail,
            thisMonth: thisMonth
        });
    }

    render() {

        console.log(this.state.datesDetail);

        return (
            <Calendar 
            datesDetail={this.state.datesDetail}/>
        )
    }

}

export default CalendarControl;