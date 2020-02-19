import React, { Component } from 'react';
import Chart from "react-apexcharts";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFound from '../common/notFound';
 
class QuestionGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories:[],
            data: [],
        }
    }

    

    UNSAFE_componentWillReceiveProps(props){
        const {questionId} = props.post_question;

        let categories = [];
        questionId.data.map(answer => categories.push(answer.answer));

        let data = [];
        questionId.data.map(answer => data.push(answer.total));

        this.setState({   
            categories: categories,
            data: data
        })
       
    }

    render() {
       let options = {
            chart: {
                background: '#FFFFFF',
                foreColor: '#333'
            },
            xaxis: {
                categories: this.state.categories
            },
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            fill: {
                colors: ['#c62828']
            },
            dataLabels: {
                enabled: true
            },
            title: {
                text: 'Poshto Profiling Analysis of Questions',
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
            pageContent = <NotFound />;
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

QuestionGraph.propTypes = {
    post_question: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post_question: state.post_question
})

export default connect( mapStateToProps )( QuestionGraph );
