import React from 'react'
import { Select, Input, DatePicker } from 'antd'

//import locale from 'antd/lib/date-picker/locale/zh_CN';

import './ct_collect_status_tool.css'

export default class CtCollectStatusTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceList: [],
            provinceValue: '',
            omcList: [],
            omcValue: '',
            numTypeList: [],
            numTypeValue: '',
        }

    }

    componentDidMount() {
        var provinceList = [{
            province_id: 1,
            province_name: '辽宁'
        },
        {
            province_id: 2,
            province_name: '北京'
        },
        {
            province_id: 3,
            province_name: '上海'
        }]
        this.setState({
            provinceList: provinceList,
            provinceValue: provinceList[0].province_id,
            omcList: provinceList,
            omcValue: provinceList[0].province_id,
            numTypeList: provinceList,
            numTypeValue: provinceList[0].province_id
        })


    }
    //省份下拉框点击事件
    provinceChange = (value) => {
        this.setState({
            provinceValue: value
        })

    }
    //数据类型下拉框点击事件
    numTypeChange = (value) => {
        this.setState({
            numTypeValue: value
        })

    }
    //开始时间结束时间点击事件
    timeOnChange = (dates, dateStrings) => {
        console.log(dates, dateStrings);


    }
    render() {
        const { Option } = Select;
        const { RangePicker } = DatePicker;
        return (
            <div className="ct-collect-status-tool">
                <Select className="ct-collect-status-tool-select" value={this.state.provinceValue} onChange={this.provinceChange} >
                    {this.state.provinceList.map((item) => {
                        return <Option value={item.province_id} key={item.province_id}>{item.province_name}</Option>;
                    })}
                </Select>
                <Select className="ct-collect-status-tool-select" value={this.state.omcValue} onChange={this.provinceChange} >
                    {this.state.omcList.map((item) => {
                        return <Option value={item.province_id} key={item.province_id}>{item.province_name}</Option>;
                    })}
                </Select>
                <Select className="ct-collect-status-tool-select" value={this.state.numTypeValue} onChange={this.numTypeChange} >
                    {this.state.numTypeList.map((item) => {
                        return <Option value={item.province_id} key={item.province_id}>{item.province_name}</Option>;
                    })}
                </Select>
                <RangePicker
                    className="ct-collect-status-tool-time"
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={this.timeOnChange}
                />
            </div>
        )
    }
}