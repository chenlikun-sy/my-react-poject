// 系统状态查询详情// 系统状态查询
import React from 'react'
import './ct_sys_oper_status_detail.css'
import {
    getSystemRunStateQueryByInfo
} from "../../../common/axios/sysService"
class SysOperStatusDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.parameter,
            dataList: [],
            propertyList: []
        }
        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        //this.valueChange = this.valueChange.bind(this);
    }
    //执行开始 在第一次渲染后调用，只在客户端。
    componentDidMount() {
        this.setTable(this.props.parameter.data, "data");
        this.setTable(this.props.parameter.property, "property");
    }

    // 回收内存
    componentWillUnmount() {


    }
    //调用方法
    valueChange = (e) => {
        this.setState({
            textValue: e.target.value
        })
    }

    getDataXmlToListInfo(obj, type) {
        getSystemRunStateQueryByInfo().then((obj)=> {
            let list = [];
            let oParser = new DOMParser();
            let xmlDoc = oParser.parseFromString(obj[0].property, "text/xml");
            for (let j = 0; j < xmlDoc.documentElement.childNodes.length; j++) {
                let node = xmlDoc.documentElement.childNodes[j];
                list.push({
                    name: node.tagName,
                    value: node.textContent
                })
            }
            this.getDataXmlToListInfoCompleted(list, type);

        });

    }
    getDataXmlToListInfoCompleted(list, type) {
        if (list !== null) {
            if (type === "property") {
                this.setState({
                    propertyList: list
                });
            } else {
                this.setState({
                    dataList: list
                });
            }


        }
    }
    setTable(datas, type) {
        this.getDataXmlToListInfo(datas, type);
    }

    setDataDOM() {

        if (this.state.dataList) {
            let dataDOM = this.state.dataList.map((item, index) => {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                    </tr>
                )
            })

            return dataDOM;
        }
    }

    setpropertyListDOM() {

        if (this.state.propertyList) {
            let dataDOM = this.state.propertyList.map((item, index) => {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                    </tr>
                )
            })

            return dataDOM;
        }
    }



    render() {
        let text = null;
        let datas = this.state.dataSource;

        return (
            <div className="cy-sys-opter-detail-main">
                <table className="table-ex">
                    <tr>
                        <td>IP主机</td>
                        <td>{datas.host_ip}</td>
                    </tr>
                    <tr>
                        <td>主机名称</td>
                        <td>{datas.host_name}</td>
                    </tr>
                    <tr>
                        <td>检查时间</td>
                        <td>{datas.check_time}</td>
                    </tr>
                    <tr>
                        <td>所属组</td>
                        <td>{datas.entity_group}</td>
                    </tr>
                    <tr>
                        <td>状态</td>
                        <td>{datas.severity_txt}</td>
                    </tr>
                    <tr>
                        <td>数据</td>
                        <td> <table>
                            {this.setDataDOM()}

                        </table></td>
                    </tr>
                    <tr>
                        <td>属性</td>
                        <td> <table>
                            {this.setpropertyListDOM()}

                        </table>
                        </td>
                    </tr>
                    <tr>
                        <td>描述</td>
                        <td>{datas.description}</td>
                    </tr>
                </table>
            </div>
        )
    }
}
export default SysOperStatusDetail;
