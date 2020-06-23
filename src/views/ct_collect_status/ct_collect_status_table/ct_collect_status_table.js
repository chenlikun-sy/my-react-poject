import React from 'react'
import { Table, Pagination } from 'antd'

import './ct_collect_status_table.css'

import theadJson from '../config/tableThead.json'
import {
    getCollectStateQueryByCount,
    getCollectStateQueryByInfo
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
        console.log(provId, omcId, typeId, beginTime, endTime);
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
        console.log(provId, omcId, typeId, beginTime, endTime);

        getCollectStateQueryByInfo(provId, omcId, typeId, beginTime, endTime, beginIndex, endIndex).then(res => {
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
        this.setState({
            page: page
        })
        this.getDataInfo(this.provId, this.omcId, this.typeId, this.beginTime, this.endTime, (page - 1) * this.state.pageSize + 1, page * this.state.pageSize)
    }
    //分页条数改变触发事件
    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        this.setState({
            page: 1,
            pageSize: pageSize
        }, () => {
            this.getDataInfo(this.provId, this.omcId, this.typeId, this.beginTime, this.endTime, (this.state.page - 1) * this.state.pageSize + 1, this.state.page * this.state.pageSize)
        })
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
                        defaultCurrent={this.state.page}
                        pageSize={this.state.pageSize}
                        total={this.state.count}
                        showTotal={(total, range) => `共  ${total}  条数据`}
                    />
                </div>

            </div>
        )
    }

    //配置表头
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
    }
}