import React from 'react'
import { Table, Pagination } from 'antd'

import './ct_collect_status_table.css'

import theadJson from '../config/tableThead.json'
import {
    getCollectStateQueryByInfo
} from "../../../common/axios/sysService";

export default class CtCollectStatusTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: []
        }

    }

    componentDidMount() {
        this.setTableColumns()
        this.getData()

    }
    getData() {
        getCollectStateQueryByInfo(1, 2, 3).then(res => {
            this.getDataCompleted(res);
        });
    }

    getDataCompleted(data) {
        var res = data;
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
    clickTableData = () => {

    }
    //翻页事件
    pageOnclick = (page, pageSize) => {
        console.log(page, pageSize);
    }
    //分页条数改变触发事件
    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    }

    setTableColumns() {
        var theadList = [];
        theadJson.forEach((item) => {
            var obj = {};
            obj.dataIndex = item.id;
            obj.title = item.name;
            obj.align = 'center';
            if (item.id === "log_path") {
                obj.render = (text, record) => <a style={{ cursor: 'pointer' }} onClick={() => this.clickTableData(text, record)
                }> {text}</a >
            }
            theadList.push(obj);
        })
        this.setState({
            columns: theadList
        })
        //this.columns = theadList;
        //表格表头配置
        // this.columns = [{
        //     title: 'Name',
        //     dataIndex: 'name',
        //     sorter: {
        //         compare: (a, b) => a.age - b.age,
        //         multiple: 3,
        //     },
        // },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     sorter: {
        //         compare: (a, b) => a.age - b.age,
        //         multiple: 3,
        //     },
        // },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     sorter: {
        //         compare: (a, b) => a.age - b.age,
        //         multiple: 3,
        //     },
        //     render: (text, record) => <a onClick={() => this.clickTableData(text, record)}>delete</a>
        // },
        // ];
    }

    render() {
        return (
            <div className="ct-collect-status-table">
                <Table className="ct-collect-status-tabletop" columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
                <div className="ct-collect-status-page">
                <Pagination
                    
                    showSizeChanger
                    onChange={this.pageOnclick}
                    onShowSizeChange={this.onShowSizeChange}
                    defaultCurrent={3}
                    total={500}
                />
                </div>
                
            </div>
        )
    }
}