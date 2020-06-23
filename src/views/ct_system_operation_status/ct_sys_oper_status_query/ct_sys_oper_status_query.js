// 系统状态查询
import React from 'react'
import { Space, Button, Input, Modal, Table,Tooltip  } from 'antd'
import './ct_sys_oper_status_query.css'
import SysOperStatusDetail from '../ct_sys_oper_status_detail/ct_sys_oper_status_detail.js'
import {
    getSystemRunStateQueryByInfo, getSystemRunStateQueryByCounts
} from "../../../common/axios/sysService"

class SysOperStatusQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parameter:{},
            visible: false,
            textValue: '10.10.0.18',
            columns: [{
                title: '主机IP',
                dataIndex: 'host_ip',
                key: 'host_ip',
                width: 150,
                render: host_ip => (
                    <Tooltip placement="topLeft" title={host_ip}>
                        {host_ip}
                    </Tooltip>
                ),
            }, {
                title: '主机名称',
                dataIndex: 'host_name',
                key: 'host_name',
                width: 150,
                render: host_name => (
                    <Tooltip placement="topLeft" title={host_name}>
                        {host_name}
                    </Tooltip>
                ),
            }, {
                title: '更新时间',
                dataIndex: 'check_time',
                key: 'check_time',
                render: check_time => (
                    <Tooltip placement="topLeft" title={check_time}>
                        {check_time}
                    </Tooltip>
                ),
            }, {
                title: '检查项组',
                dataIndex: 'entity_group',
                key: 'entity_group',
                render: entity_group => (
                    <Tooltip placement="topLeft" title={entity_group}>
                        {entity_group}
                    </Tooltip>
                ),
            }, {
                title: '检查项',
                dataIndex: 'entity_name',
                key: 'entity_name',
                render: entity_name => (
                    <Tooltip placement="topLeft" title={entity_name}>
                        {entity_name}
                    </Tooltip>
                ),
            }, {
                title: '告警级别',
                dataIndex: 'severity_txt',
                key: 'severity_txt',
                render: severity_txt => (
                    <Tooltip placement="topLeft" title={severity_txt}>
                        {severity_txt}
                    </Tooltip>
                ),
            }, {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                width: 300,
                render: description => (
                    <Tooltip placement="topLeft" title={description}>
                        {description}
                    </Tooltip>
                ),
            }, {
                title: '属性',
                dataIndex: 'data',
                className:"data-show",
                key: 'data',
            }, {
                title: '数据',
                dataIndex: 'property',
                className:"property-show",
                key: 'property',
            }

            ],
            data: []
        };
        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.valueChange = this.valueChange.bind(this);
    }
    //执行开始 在第一次渲染后调用，只在客户端。
    componentDidMount() {
        this.getSystemRunStateQuery(0, 1, 2, 0, 500);

    }

    // 回收内存
    componentWillUnmount() {


    }
    getSystemRunStateQuery(ipText, beginTime, endTime, beginIndex, endIndex) {
        getSystemRunStateQueryByInfo(ipText, beginTime, endTime, beginIndex, endIndex).then(res => {
            this.getSystemRunStateQueryByInfoCompleted(res);
        });
    };

    getSystemRunStateQueryByInfoCompleted(result) {
        var data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                host_ip: result[i].host_ip,
                host_name: result[i].host_name,
                check_time: result[i].check_time,
                entity_group: result[i].entity_group,
                entity_name: result[i].entity_name,
                severity_txt: result[i].severity_txt,
                description: result[i].description,
                data: result[i].data,
                property: result[i].property,

            });
            
        }
        if (data !== null) {
            this.setState({
                data: data
            });
        }
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //调用方法
    valueChange = (e) => {
        this.setState({
            textValue: e.target.value
        });
        this.getSystemRunStateQuery(0, 1, 2, 0, 500);
    }


    render() {
        let text = null;

        return (
            <div className="sys-oper-status-query-main">
                <div className="sys-oper-status-query-top">
                    <Space>
                        <Input placeholder="请输入主机号" value={this.state.textValue} onChange={this.valueChange} />
                        <Button type='primary' onClick={this.valueChange}>查询</Button>
                    </Space>

                </div>

                <div className="sys-oper-status-query-content">
                    <Table onRow={record => {
                        return {
                            onClick: event => { }, // 点击行
                            onDoubleClick: event => { 
                                if (record !== null) {
                                    this.setState({
                                        parameter: record
                                    });
                                }
                                this.showModal();
                            },
                            onContextMenu: event => { },
                            onMouseEnter: event => { }, // 鼠标移入行
                            onMouseLeave: event => { },
                        };
                    }}
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        pagination={{ pageSize: 50 }}
                        scroll={{ x: 1600, y: 'calc(700px + 100%)', }}
                    ></Table>

                </div>
                <Modal
                    title="详情"
                    width="400"
                    height="1200"
                    visible={this.state.visible}
                    destroyOnClose="true"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <SysOperStatusDetail parameter={this.state.parameter}></SysOperStatusDetail>
                </Modal>
            </div>
        )
    }
}
export default SysOperStatusQuery;
