// 电信入围测试-OMC原始数据质量报告
import React from 'react'
import {
    getSystemHistoryQuery
} from "../../common/axios/sysService";
import './index.less'
import omcJson from '../../../static/config/omc_config.json'
import { Table, Space, Button, Input, Select } from 'antd'
import CtHistorySeachChart from './ct_history_seach_chart/ct_history_seach_chart'

export default class ResumeIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: '1',
                    Name: 'John',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    Name: 'Jim',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    Name: 'Joe',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ],
            columns: [{
                title: '检查时间',
                dataIndex: 'Name',
                key: 'Name',
                width: 200
            },
            {
                title: '告警级别',
                dataIndex: 'age',
                key: 'age',
                width: 200
            },
            {
                title: '虚拟内存',
                dataIndex: 'address',
                key: 'address',
                width: 200
            },
            {
                title: '描述',
                dataIndex: 'address',
                key: 'address'
            }],
            visible: false,
            title: ""
        }

        this.ClickPic = this.ClickPic.bind(this);
    }

    componentDidMount() {
        this.getHistoryByInfo();
    }


    getHistoryByInfo() {
        getSystemHistoryQuery().then(res => {
            this.getHistoryDataCompleted(res);
        });
    }

    getHistoryDataCompleted(data) {
        var mm = data;
    }

    ClickPic(element) {
        this.setState(
            {
                visible: true,
                title: element.name
            }
        );
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };



    render() {
        const { Column, ColumnGroup } = Table;
        return (
            <div className="ct-history-div">
                <div className="ct-history-div-seach">
                    <Space className="ct-history-div-seach-first">
                        主机号：<Select style={{ width: 120 }} value={this.state.textValue} onChange={this.valueChange} />
                    </Space>

                    <Space className="ct-history-div-seach-second">
                        检查项：<Select  style={{ width: 120 }} value={this.state.textValue} onChange={this.valueChange} />
                    </Space>

                    <Space className="ct-history-div-seach-three">
                       开始时间： <Select  style={{ width: 180 }} value={this.state.textValue} onChange={this.valueChange} />
                    </Space>

                    <Space className="ct-history-div-seach-four">
                        结束时间：<Select   style={{ width: 180 }} value={this.state.textValue} onChange={this.valueChange} />
                    </Space>
                    <Space>
                        <Button type='primary' onClick={this.valueChange}>查询</Button>
                    </Space>


                </div>
                <div className="ct-history-div-table">
                    <Table bordered="true" columns={this.state.columns} dataSource={this.state.data} />
                </div>
                <div className="ct-history-div-chart">
                    <CtHistorySeachChart></CtHistorySeachChart>
                </div>


            </div>
        )
    }
}