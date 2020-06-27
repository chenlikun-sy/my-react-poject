import React from 'react'
import { Table, Pagination, Modal, Tooltip } from 'antd'

import './ct_collect_status_table.less'

import theadJson from '../config/tableThead.json'
import {
    getCollectStateQueryByCount,
    getCollectStateQueryByInfo,
    getCollectStateTextByUrl
} from "../../../common/axios/sysService";

export default class CtCollectStatusTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [],

            pageSize: 10,//每页10条数据
            page: 1,//当前页数
            count: 0,//总条数,
            visible: false//模态窗显示隐藏

        }
        this.provId = null;
        this.omcId = null;
        this.typeId = null;
        this.beginTime = null;
        this.endTime = null;
    }

    componentDidMount() {
        this.props.onRef(this)
        this.setTableColumns()
    }

    getData(provId, omcId, typeId, beginTime, endTime) {
        this.provId = provId;
        this.omcId = omcId;
        this.typeId = typeId;
        this.beginTime = beginTime;
        this.endTime = endTime;
        getCollectStateQueryByCount(provId, omcId, typeId, beginTime, endTime).then(res => {
            this.getDataCountCompleted(res);
        });
    }
    getDataCountCompleted(count) {
        this.setState({
            count: count
        }, () => {
            this.getDataInfo(this.provId, this.omcId, this.typeId, this.beginTime, this.endTime, 1, this.state.pageSize)
        })
    }

    getDataInfo(provId, omcId, typeId, beginTime, endTime, beginIndex, endIndex) {
        getCollectStateQueryByInfo(provId, omcId, typeId, beginTime, endTime, beginIndex, endIndex).then(res => {
            this.getDataCompleted(res);
        });
    }

    getDataCompleted(data) {
        var list = [];
        data.forEach((item, index) => {
            var obj = {}
            obj.key = index;
            obj.dc_count = item.dc_count;
            obj.dc_data_time = item.dc_data_time;
            obj.dc_info = item.dc_info;
            obj.dc_ip = item.dc_ip;
            obj.dc_rows = item.dc_rows;
            obj.log_path = item.log_path;
            obj.omc_file_info = item.omc_file_info;
            obj.omc_file_num = item.omc_file_num;
            obj.omc_file_rows = item.omc_file_rows;
            obj.omc_id = item.omc_id;
            obj.omc_name = item.omc_name;
            obj.province_name = item.province_name;
            obj.run_secs = item.run_secs;
            obj.task_run_time = item.task_run_time;
            obj.type_name = item.type_name;

            list.push(obj);
        })
        this.setState({
            dataSource: list
        })
    }

    getHttpTextData(item) {
        getCollectStateTextByUrl(url).then(res => {
            this.getHttpTextDataCompleted(res);
        });
    }
    getHttpTextDataCompleted(data) {
        this.setState({
            visible: true,
            urlData: '1111111111111111111'
        })
    }

    //表格点击事件
    clickTableData = (text, record) => {
        //this.getHttpTextData();
        this.getHttpTextDataCompleted()
    }
    //翻页事件
    pageOnclick = (page, pageSize) => {
        this.setState({
            page: page
        })
        this.getDataInfo(this.provId, this.omcId, this.typeId, this.beginTime, this.endTime, (page - 1) * this.state.pageSize + 1, page * this.state.pageSize)
    }
    //分页条数改变触发事件
    onShowSizeChange = (current, pageSize) => {
        this.setState({
            page: 1,
            pageSize: pageSize
        }, () => {
            this.getDataInfo(this.provId, this.omcId, this.typeId, this.beginTime, this.endTime, (this.state.page - 1) * this.state.pageSize + 1, this.state.page * this.state.pageSize)
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }



    render() {
        return (
            <div className="ct-collect-status-table">
                <div className="ct-collect-status-tablecontent">
                    <Table
                        className="ct-collect-status-tabletop"
                        columns={this.state.columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: '100vw', y: 'calc(100% - 46px)' }}

                    />
                </div>
                <div className="ct-collect-status-page">
                    <Pagination
                        showSizeChanger
                        onChange={this.pageOnclick}
                        onShowSizeChange={this.onShowSizeChange}
                        defaultCurrent={this.state.page}
                        pageSize={this.state.pageSize}
                        total={this.state.count}
                        showTotal={(total, range) => `共  ${total}  条数据`}
                    />
                </div>
                <Modal
                    title="采集日志"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    wrapClassName={'ct-collect-status-modal'}
                >
                    <div>{this.state.urlData}</div>
                </Modal>
            </div>
        )
    }

    //配置表头
    setTableColumns() {
        var columns = [{
            title: '省名称',
            dataIndex: 'province_name',
            key: 'province_name',
            width: 100,
            ellipsis: true,
            align: "center",
            sorter: (a, b) => a.province_name.length - b.province_name.length,
            render: province_name => (
                <Tooltip placement="topLeft" title={province_name}>
                    {province_name}
                </Tooltip>
            ),
        }, {
            title: '采集机IP地址',
            dataIndex: 'dc_ip',
            key: 'dc_ip',
            align: "center",
            width: 150,
            ellipsis: true,
            sorter: (a, b) => a.dc_ip.length - b.dc_ip.length,
            render: dc_ip => (
                <Tooltip placement="topLeft" title={dc_ip}>
                    {dc_ip}
                </Tooltip>
            ),
        }, {
            title: 'OMC名称',
            dataIndex: 'omc_name',
            key: 'omc_name',
            align: "omc_name",
            width: 100,
            align: "center",
            ellipsis: true,
            sorter: (a, b) => a.omc_name.length - b.omc_name.length,
            render: omc_name => (
                <Tooltip placement="topLeft" title={omc_name}>
                    {omc_name}
                </Tooltip>
            ),
        }, {
            title: '数据类型',
            dataIndex: 'type_name',
            key: 'type_name',
            width: 100,
            ellipsis: true,
            align: "center",
            sorter: (a, b) => a.type_name.length - b.type_name.length,
            render: type_name => (
                <Tooltip placement="topLeft" title={type_name}>
                    {type_name}
                </Tooltip>
            ),
        }, {
            title: '数据时间',
            dataIndex: 'dc_data_time',
            key: 'dc_data_time',
            align: "center",
            width: 100,
            ellipsis: true,
            sorter: (a, b) => new Date(a.dc_data_time) - new Date(b.dc_data_time),
            render: dc_data_time => (
                <Tooltip placement="topLeft" title={dc_data_time}>
                    {dc_data_time}
                </Tooltip>
            ),
        }, {
            title: '任务运行开始时间',
            width: 200,
            ellipsis: true,
            dataIndex: 'task_run_time',
            key: 'task_run_time',
            align: "center",
            sorter: (a, b) => new Date(a.task_run_time) - new Date(b.task_run_time),
            render: task_run_time => (
                <Tooltip placement="topLeft" title={task_run_time}>
                    {task_run_time}
                </Tooltip>
            ),
        }, {
            title: '运行时长',
            dataIndex: 'run_secs',
            key: 'run_secs',
            width: 100,
            align: "center",
            ellipsis: true,
            sorter: (a, b) => a.run_secs - b.run_secs,
            render: run_secs => (
                <Tooltip placement="topLeft" title={run_secs}>
                    {run_secs}
                </Tooltip>
            ),
        }, {
            title: '采集次数',
            dataIndex: 'dc_count',
            key: 'dc_count',
            width: 100,
            align: "center",
            ellipsis: true,
            sorter: (a, b) => a.dc_count - b.dc_count,
            render: dc_count => (
                <Tooltip placement="topLeft" title={dc_count}>
                    {dc_count}
                </Tooltip>
            ),
        }, {
            title: '采集数据条数',
            dataIndex: 'dc_rows',
            key: 'dc_rows',
            width: 150,
            align: "center",
            ellipsis: true,
            sorter: (a, b) => a.dc_rows - b.dc_rows,
            render: dc_rows => (
                <Tooltip placement="topLeft" title={dc_rows}>
                    {dc_rows}
                </Tooltip>
            ),
        }, {
            title: '采集结果说明',
            width: 150,
            ellipsis: true,
            dataIndex: 'dc_info',
            key: 'dc_info',
            align: "center",
            sorter: (a, b) => a.dc_info.length - b.dc_info.length,
            render: dc_info => (
                <Tooltip placement="topLeft" title={dc_info}>
                    {dc_info}
                </Tooltip>
            ),
        }, {
            title: 'OMC上文件数',
            width: 150,
            ellipsis: true,
            dataIndex: 'omc_file_num',
            key: 'omc_file_num',
            align: "center",
            sorter: (a, b) => a.omc_file_num.length - b.omc_file_num,
            render: omc_file_num => (
                <Tooltip placement="topLeft" title={omc_file_num}>
                    {omc_file_num}
                </Tooltip>
            ),
        }, {
            title: '数据文件总记录条数',
            width: 200,
            ellipsis: true,
            dataIndex: 'omc_file_rows',
            key: 'omc_file_rows',
            align: "center",
            sorter: (a, b) => a.omc_file_rows - b.omc_file_rows,
            render: omc_file_rows => (
                <Tooltip placement="topLeft" title={omc_file_rows}>
                    {omc_file_rows}
                </Tooltip>
            ),
        }, {
            title: 'OMC文件信息',
            width: 150,
            ellipsis: true,
            dataIndex: 'omc_file_info',
            key: 'omc_file_info',
            align: "center",
            sorter: (a, b) => a.omc_file_info.length - b.omc_file_info.length,
            render: omc_file_info => (
                <Tooltip placement="topLeft" title={omc_file_info}>
                    {omc_file_info}
                </Tooltip>
            ),
        }, {
            title: '采集日志文件',
            width: 150,
            ellipsis: true,
            dataIndex: 'log_path',
            key: 'log_path',
            align: "center",
            sorter: (a, b) => a.log_path.length - b.log_path.length,
            render: log_path => (
                <Tooltip placement="topLeft" title={log_path}>
                    <a style={{ cursor: 'pointer' }} onClick={() => this.clickTableData(log_path)}> {log_path}</a >
                </Tooltip>
            ),
        }]
        this.setState({
            columns: columns
        })
        // var theadList = [];
        // theadJson.forEach((item) => {
        //     var obj = {};
        //     obj.title = item.name;
        //     obj.dataIndex = item.id;
        //     obj.with = 800;
        //     obj.textWrap = 'word-break';
        //     obj.ellipsis = {
        //         showTitle: false,
        //     };
        //     obj.key = item.id;
        //     obj.align = 'center';
        //     obj.render = (text, record) => (
        //         <Tooltip placement="topLeft" title={text}>
        //             {text}
        //         </Tooltip>
        //     );
        //     // obj.sorter = {
        //     //     compare: (a, b) => a[item.name] - b[item.name],
        //     //     multiple: 3,
        //     // }

        //     if (item.id === "log_path") {
        //         obj.render = (text, record) =>
        //             <Tooltip placement="topLeft" title={text}>
        //                 <a style={{ cursor: 'pointer' }} onClick={() => this.clickTableData(text, record)}> {text}</a >
        //             </Tooltip >
        //     }
        //     theadList.push(obj);
        // })
        // this.setState({
        //     columns: theadList
        // })

    }
}