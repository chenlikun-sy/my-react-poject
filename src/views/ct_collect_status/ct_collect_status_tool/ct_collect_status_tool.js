import React from 'react'
import { Select, Input, DatePicker, Button, Modal } from 'antd'

import { ExclamationCircleOutlined } from '@ant-design/icons';

import './ct_collect_status_tool.less'

import {
    getProvinceInfoByDic, getOmcInfoByDic, getOmcDataTypeInfoByDic
} from "../../../common/axios/sysService";

export default class CtCollectStatusTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceList: [],//省份集合
            provinceValue: '',//省份选中值
            omcAllList: [],//全部OMC集合
            omcList: [],//OMC集合
            omcValue: '',//OMC选中值
            typeList: [],//数据类型集合
            typeValue: '',//数据类型选中集合
            start_time: '',//开始时间
            end_time: '',//结束时间
            visible: false,//模态窗显示隐藏
            alertText: ''//alert提示信息
        }

    }

    componentDidMount() {
        this.getProvinceData();
        this.getTypeData();
    }

    //获取省编号数据集合
    getProvinceData() {
        getProvinceInfoByDic().then(res => {
            this.getProvinceDataCompleted(res);
        });
    }
    //获取OMC数据集合
    getOmcData() {
        getOmcInfoByDic().then(res => {
            this.getOmcDataCompleted(res);
        });
    }
    //获取OMC数据类型集合
    getTypeData() {
        getOmcDataTypeInfoByDic().then(res => {
            this.getTypeDataCompleted(res);
        });
    }

    getProvinceDataCompleted(data) {
        var list = [];
        data.forEach(item => {
            var obj = {
                province_id: item.province_id,
                province_name: item.province_name
            }
            list.push(obj);
        });
        this.setState({
            provinceList: list,
            provinceValue: list[0].province_id
        }, () => {
            this.getOmcData();
        })
    }

    getOmcDataCompleted(data) {
        var list = [];
        data.forEach(item => {
            var obj = {
                omc_id: item.omc_id,
                omc_name: item.omc_name,
                province_id: item.province_id,
                province_name: item.province_name
            }
            list.push(obj);
        });
        var prolist = list.filter((item) => {
            if (item.province_id === this.state.provinceValue) {
                return item;
            }
        })
        this.setState({
            omcAllList: list,
            omcList: prolist,
            omcValue: prolist[0].omc_id
        })
    }

    getTypeDataCompleted(data) {
        var list = [];
        data.forEach(item => {
            var obj = {
                type_id: item.type_id,
                type_name: item.type_name
            }
            list.push(obj);
        });
        this.setState({
            typeList: list,
            typeValue: list[0].type_id
        })
    }

    setNewOmc(value) {
        var prolist = this.state.omcAllList.filter((item) => {
            if (item.province_id === value) {
                return item;
            }
        })
        this.setState({
            omcList: prolist,
            omcValue: prolist[0].omc_id
        })
    }

    //省份下拉框点击事件
    provinceChange = (value) => {
        this.setState({ provinceValue: value })
        this.setNewOmc(value);
    }

    //OMC下拉框点击事件
    omcChange = (value) => {
        this.setState({ omcValue: value })
    }

    //数据类型下拉框点击事件
    typeChange = (value) => {
        this.setState({ typeValue: value })
    }

    //开始时间点击事件
    startTimeChange = (value, dateString) => {
        this.setState({
            start_time: dateString
        })
    }

    //结束时间点击事件
    endTimeChange = (value, dateString) => {
        this.setState({
            end_time: dateString
        })
    }

    // //模态窗关闭事件
    // handleCancel = () => {
    //     this.setState({
    //         visible: false
    //     })
    // }

    //查询
    searchData = () => {
        if (!this.state.start_time) {
            this.confirm('请选择开始时间！')
            // this.setState({
            //     visible: true,
            //     alertText: '请选择开始时间！'
            // })
            return
        }
        if (!this.state.end_time) {
            this.confirm('请选择结束时间！')
            return
        }
        if (new Date(this.state.start_time).getTime() >= new Date(this.state.end_time).getTime()) {
            this.confirm('开始时间不能大于结束时间！')
            return
        }
        this.props.toolClick(this.state.provinceValue, this.state.omcValue, this.state.typeValue, this.state.start_time, this.state.end_time);
    }

    confirm(text) {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: text,
            okText: '确认'
        });
    }

    render() {
        const { Option } = Select;
        const { RangePicker } = DatePicker;
        return (
            <div className="ct-collect-status-tool">
                <div className="ct-collect-status-tool-title">省份</div>
                <Select className="ct-collect-status-tool-select" value={this.state.provinceValue} onChange={this.provinceChange} showSearch optionFilterProp="children">
                    {this.state.provinceList.map((item) => {
                        return <Option value={item.province_id} key={item.province_id}>{item.province_name}</Option>;
                    })}
                </Select>
                <div className="ct-collect-status-tool-title">OMC名称</div>
                <Select className="ct-collect-status-tool-select" value={this.state.omcValue} onChange={this.omcChange} showSearch optionFilterProp="children">
                    {this.state.omcList.map((item) => {
                        return <Option value={item.omc_id} key={item.omc_id}>{item.omc_name}</Option>;
                    })}
                </Select>
                <div className="ct-collect-status-tool-title">数据类型</div>
                <Select className="ct-collect-status-tool-select" value={this.state.typeValue} onChange={this.typeChange} showSearch optionFilterProp="children">
                    {this.state.typeList.map((item) => {
                        return <Option value={item.type_id} key={item.type_id}>{item.type_name}</Option>;
                    })}
                </Select>
                <div className="ct-collect-status-tool-title">时间范围</div>
                <DatePicker className="ct-collect-status-tool-time" showTime onChange={this.startTimeChange} />
                {/* <RangePicker
                    className="ct-collect-status-tool-time"
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={this.timeOnChange}
                    defaultValue={[moment(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString(), 'YYYY-MM-DD'), moment(new Date().toLocaleDateString(), 'YYYY-MM-DD')]}
                /> */}
                <div className="ct-collect-status-tool-title">至</div>
                <DatePicker className="ct-collect-status-tool-time" showTime onChange={this.endTimeChange} />
                <Button className="ct-collect-status-tool-button" type="primary" onClick={this.searchData}>查询</Button>

                {/* <Modal
                    title="提示"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleCancel}
                    wrapClassName={'ct-collect-status-tool-modal'}
                >
                    {this.state.alertText}

                </Modal> */}
            </div>
        )
    }
}