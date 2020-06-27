import React from 'react'
import moment from 'moment';

import './ct_data_quality.less'

import CtDataQualityCircle from './ct_data_quality_circle/ct_data_quality_circle';

import { getQualityQueryByInfo } from "../../common/axios/sysService";

import omcJson from './config/omc.json'

export default class CtDataQuality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            omcList: [],
            headList: [],
        }
    }

    componentDidMount() {
        this.setState({
            headList: this.getThead(),
            omcList: this.getOmcList()
        })
        this.getDataInfo()
    }

    //获取数据
    getDataInfo() {
        getQualityQueryByInfo().then(res => {
            this.getDataInfoCompleted(res);
        });
    }
    getDataInfoCompleted(data) {
        //测试数据
        var time = '2020-05-05 00:00:00'
        var date = new Date(time)
        //获取某个时间之前9个小时的数据形成集合
        var timeList = []
        for (var i = 0; i < 10; i++) {
            timeList.push(moment(new Date(date.getTime() - i * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD"))
        }
        timeList.reverse()

        var list = []
        timeList.forEach((item, index) => {
            var objLine = {}
            objLine.id = index
            objLine.name = item
            objLine.list = []
            var oneDataList = data.filter(function (dataItem) {
                if (dataItem.data_start_time.indexOf(item) !== -1) {
                    return dataItem;
                }
            })
            this.state.headList.forEach((headItem) => {
                var timeDataItem = oneDataList.find(function (dataItem) {
                    var dateStr = dataItem.data_start_time.substr(11, 2);
                    if (dateStr.indexOf(headItem.name) !== -1) {
                        return dataItem;
                    }
                })
                var obj = {}
                obj.isNoData = true
                obj.color = '#fff'
                if (timeDataItem) {
                    obj.isNoData = false
                    obj.data_rows = timeDataItem.data_rows
                    obj.data_start_time = timeDataItem.data_start_time
                    obj.description = timeDataItem.description
                    obj.integrity_rate = timeDataItem.integrity_rate
                    obj.omc_id = timeDataItem.omc_id
                    obj.omc_name = timeDataItem.omc_name
                    obj.province_name = timeDataItem.province_name
                    obj.type_name = timeDataItem.type_name
                    obj.color = this.getAlarmColor(timeDataItem.integrity_rate)
                }
                objLine.list.push(obj)
            })
            list.push(objLine)
        })
        this.setState({
            dataSource: list
        })
    }

    //返回告警颜色
    getAlarmColor(num) {
        var color = '';
        if (Number(num) > 99) {
            color = 'green';
        } else if (Number(num) > 95 && Number(num) <= 99) {
            color = 'GreenYellow';
        } else if (Number(num) > 90 && Number(num) <= 95) {
            color = 'Yellow';
        } else {
            color = 'red';
        }
        return color;
    }
    //获取头部数据
    getOmcList() {
        var list = []
        omcJson.forEach((item) => {
            var obj = {
                id: item.id,
                name: item.name,
                img1: item.img1,
                img2: item.img2
            }
            list.push(obj)
        })
        return list
    }
    //生成表头
    getThead() {
        var list = [];
        for (var i = 0; i < 24; i++) {
            var obj = {
                id: i,
                name: '' + i
            }
            if (i < 10) {
                obj.name = '0' + i;
            }
            list.push(obj);
        }
        return list;
    }

    //头部omc点击事件
    omcClick(item) {
        this.state.omcList.map((eachItem) => { eachItem.selected = false })
        item.selected = true;
        this.setState({
            omcList: this.state.omcList
        }, () => {
            this.changeOmcData(item)
        })
    }
    changeOmcData(item) {

    }



    render() {
        return (
            <div className="ct-data-quality">
                <div className="ct-data-quality-tool">
                    {this.state.omcList.map((item) => {
                        return <div className="ct-data-quality-eachImg" onClick={() => this.omcClick(item)} key={item.id}>
                            <div>
                                <img src={item.img1}></img>
                                <img src={item.img2}></img>
                            </div>
                            <span className={`ct-data-quality-span ${item.selected ? 'ct-data-quality-span-color' : ''}`} >{item.name}</span>
                        </div>
                    })}

                </div>
                <div className="ct-data-quality-table">
                    <div className="ct-data-quality-thead">
                        <div className="ct-data-quality-thead-title-first"></div>
                        {
                            this.state.headList.map((item) => {
                                return <div className="ct-data-quality-thead-title"> <span>{item.id}</span> </div>
                            })
                        }
                    </div>
                    {
                        this.state.dataSource.map((item) => {
                            return <div className="ct-data-quality-tbody-row">
                                <div className="ct-data-quality-tbody-row-first">{item.name}</div>
                                {
                                    item.list.map((items, index) => {
                                        return <div className="ct-data-quality-thead-title" key={index}>
                                            <CtDataQualityCircle param={items} index={index}></CtDataQualityCircle>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }


}