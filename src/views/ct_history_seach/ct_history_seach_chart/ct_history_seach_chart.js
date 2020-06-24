import React from 'react';
import ReactEchart from '../../../common/Component/echarts/ReactEchart'
import './ReactEchartTest.css'
import {
    getSystemHistoryQuery
} from "../../../common/axios/sysService";

export default class ReactEchartTestHeart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataSource: props.dataSource,
            entityName: ""
        }
    }

    componentDidMount() {
        // this._getHistoryQuery();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            entityName: nextProps.entityName
        });
        if (nextProps.dataSource.length > 0) {
            this._getHistoryQuery(nextProps.dataSource);
        }
    }

    _getHistoryQuery(datas) {
        let data = [];
        let tempModel = {
            title: this.state.entityName +"(G)",
            chartType: "line",
            color: "#303030",
            lineWidth:1,
            opacity: 0.8,
            data: []
        }


        datas.forEach(item => {
            let obj = {};
            obj.name = item.check_time;
            obj.value = item.value;
            tempModel.data.push(obj);
        });

        data.push(tempModel);

        this.setState({
            data: data
        })
    }
    render() {
        return (
            
            <div className="ReactEchartTest">
                <div className="ct-history-chart-title">系统监控进程检查历史曲线</div>
                <div>
                    <ReactEchart 
                    dataSource={this.state.data} 
                    showLegend="true" 
                    showLegendX="left" 
                    legendFontSize="12"
                    legendHeight="10"
                    legendIcon='rect'
                    axisLineColor='#303030'
                    labelColor='#fff'
                    symbolSize='10'
                    symbolType='diamond'
                    splitLineWidth='1'
                    isRotate='20'
                    itemStyleLabel='#fff'
                    ></ReactEchart>
                </div>
            </div>
        );
    }
}
