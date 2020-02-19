import React, { Component } from 'react';
import Chart from "react-apexcharts";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFound from '../common/notFound';

class ResponseGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }        
    }

    UNSAFE_componentWillReceiveProps(props){
        let data = [];
        let female = 0;
        let male = 0;

        props.response_analysis.data.map((val, index) => {
            if(val.gender === 0){
                female = val.total;
            }else if(val.gender === 1){
               male = val.total;
            }
            
            if(props.response_analysis.data.length == Number(index + 1)){
                let total = female + male;
                data = [total, male, female]

                this.setState({
                    data: data
                })

                return data;
            }
        })
       
    }
    render() {
        
            let options = {
                chart: {
                    background: '#FFFFFF',
                    foreColor: '#333'
                },
                xaxis: {
                    categories: ['Total','Male','Female'],
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                fill: {
                    colors: ['#0054A2']
                },
                dataLabels: {
                    enabled: true
                },
                title: {
                    text: 'Poshto Profiling Analysis of Responses',
                    align: 'center',
                    margin: 20,
                    offsetY: 20,
                    style: {
                        fontSize: '20px'
                    }
                }
            }
           let series = [
                {
                    name: 'No. of Users',
                    data: this.state.data
                }
            ];

            //conditional rendering
            let pageContent;
            if(this.state.data.length === 0){
                pageContent = <NotFound />
            }else{
                pageContent = <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height="450"
                    width="100%"
                />
            }
        
        return (
            <div>
                { pageContent }
            </div>
        )
    }
}

ResponseGraph.protoTypes = {
    response_analysis: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    response_analysis: state.response_analysis.responseData
})

export default connect( mapStateToProps )( ResponseGraph );
