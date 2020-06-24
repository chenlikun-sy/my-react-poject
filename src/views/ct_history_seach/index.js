// 电信入围测试-OMC原始数据质量报告
import React from 'react'
import {
    getSystemHistoryQuery, getHostIpInfoByDic, getEntityNameInfoByDic
} from "../../common/axios/sysService";
import './index.less'
import { Table, Space, Button, DatePicker, Select } from 'antd'
import CtHistorySeachChart from './ct_history_seach_chart/ct_history_seach_chart'
import moment from 'moment';

export default class ResumeIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ipText: "",
            entityName: "虚拟内存",
            beginTime: moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
            endTime: moment().format('YYYY-MM-DD 00:00:00'),
            ipList: [],
            entityNameList: [],
            data: [],
            columns: [],
            visible: false,
            title: ""
        }

        this.onHostChange = this.onHostChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.seachClick = this.seachClick.bind(this);
        this.beginTimeClick = this.beginTimeClick.bind(this);
        this.endTimeClick = this.endTimeClick.bind(this);
    }

    componentDidMount() {
        //初始化模型
        var dates = this.state.startTime;
        this.getHostInfo();
        this.getEntityNameInfo();
    }
    //ip地址下拉值查询
    getHostInfo() {
        getHostIpInfoByDic().then(res => {
            this.getHostIpInfoByDicCompleted(res);
        });
    }

    getHostIpInfoByDicCompleted(data) {
        if (data && data.length > 0) {
            var list = [];
            data.forEach(item => {
                let obj = {};
                obj.ipName = item.ip_name;
                obj.ipId = item.ip_id;
                list.push(obj);
            });
            this.setState({
                ipList: list,
                ipText: list[0].ipId
            })
        }
    }

    //备选项字典值获取
    getEntityNameInfo() {
        getEntityNameInfoByDic().then(res => {
            this.getEntityNameInfoByDicCompleted(res);
        });
    }

    getEntityNameInfoByDicCompleted(data) {
        if (data && data.length > 0) {
            var list = [];
            data.forEach(item => {
                let obj = {};
                obj.typeName = item.type_name;
                obj.typeId = item.type_id;
                list.push(obj);
            });
            this.setState({
                entityNameList: list,
                entityName: list[0].typeName
            })
        }

        this._initColumnsModel(this.state.entityName);
        this._getSystemHistoryQuery(this.state.ipText, this.state.entityName, this.state.beginTime, this.state.endTime);
    }


    //host改变回调
    onHostChange(value) {
        this.setState({
            ipText: value
        })
    }

    //检查项改变回调
    onCheckChange(value) {
        this.setState({
            entityName: value
        })

        this._initColumnsModel(value);
    }

    _initColumnsModel(name) {
        this.setState({
            columns: [{
                title: '检查时间',
                dataIndex: 'check_time',
                key: 'check_time',
                width: 200,
                sorter: (a, b) => new Date(a.check_time) - new Date(b.check_time),
                ellipsis: true
            },
            {
                title: '告警级别',
                dataIndex: 'severity_txt',
                key: 'severity_txt',
                width: 200,
                sorter: (a, b) => a.severity_txt.length - b.severity_txt.length,
                ellipsis: true
            },
            {
                title: name,
                dataIndex: 'value',
                key: 'value',
                width: 200,
                sorter: (a, b) => a.value - b.value,
                ellipsis: true
            },
            {
                title: '描述',
                dataIndex: 'host_name',
                key: 'host_name',
                sorter: (a, b) => a.host_name.length - b.host_name.length,
                ellipsis: true
            }]
        });
    }

    beginTimeClick(value) {
        this.setState({
            beginTime: value.format('YYYY-MM-DD HH:mm:ss')
        })
    }
    endTimeClick(value) {
        this.setState({
            endTime: value.format('YYYY-MM-DD HH:mm:ss')
        })
    }

    seachClick() {
        this._getSystemHistoryQuery(this.state.ipText, this.state.entityName, this.state.beginTime, this.state.endTime);
    }

    _getSystemHistoryQuery(ipText, entityName, beginTime, endTime) {
        //点击查询按钮 进行sql查询
        getSystemHistoryQuery(ipText, entityName, beginTime, endTime).then(res => {
            this.getHistoryDataCompleted(res);
        });
    }


    getHistoryDataCompleted(data) {
        if (data && data.length > 0) {
            var list = [];
            data.forEach((item, index) => {
                if (this.state.entityName === item.entity_name) {
                    let obj = {};
                    obj.key = index;
                    obj.check_time = item.check_time;
                    obj.host_ip = item.host_ip;
                    obj.host_name = item.host_name;
                    obj.entity_name = item.entity_name;
                    obj.severity_txt = item.severity_txt;
                    obj.value = (item.value).toString();
                    list.push(obj);
                }
            });
            this.setState({
                data: list
            });
        }
    }


    render() {
        const { Column, ColumnGroup } = Table;
        const { Option } = Select;
        const dateFormat = 'YYYY/MM/DD HH:mm:ss';
        const ipList = this.state.ipList;
        const entityNameList = this.state.entityNameList;
        return (
            <div className="ct-history-div">
                <div className="ct-history-div-seach">
                    <Space className="ct-history-div-seach-first">
                        主机号<Select style={{ width: 120 }} value={this.state.ipText} onChange={this.onHostChange}>
                            {ipList.map(item => {
                                return <Option value={item.ipName}>{item.ipId}</Option>
                            })}

                        </Select>
                    </Space>

                    <Space className="ct-history-div-seach-second">
                        检查项<Select style={{ width: 120 }} defaultValue="虚拟内存" value={this.state.entityName} onChange={this.onCheckChange}>
                            {entityNameList.map(item => {
                                return <Option value={item.typeId}>{item.typeName}</Option>
                            })}
                        </Select>
                    </Space>

                    <Space className="ct-history-div-seach-three">
                        时间范围<DatePicker showTime defaultValue={moment(this.state.beginTime, dateFormat)} format={dateFormat} onChange={this.beginTimeClick} />
                    </Space>

                    <Space className="ct-history-div-seach-four">
                        至<DatePicker showTime defaultValue={moment(this.state.endTime, dateFormat)} format={dateFormat} onChange={this.endTimeClick} />
                    </Space>
                    <Space>
                        <Button type='primary' onClick={this.seachClick}>查询</Button>
                    </Space>


                </div>
                <div className="ct-history-div-table">
                    <Table bordered="true" columns={this.state.columns} dataSource={this.state.data} sortDirections={['ascend', 'descend']} pagination={false} />
                </div>
                <div className="ct-history-div-chart">
                    <CtHistorySeachChart dataSource={this.state.data} entityName={this.state.entityName}></CtHistorySeachChart>
                </div>
            </div>
        )
    }
}