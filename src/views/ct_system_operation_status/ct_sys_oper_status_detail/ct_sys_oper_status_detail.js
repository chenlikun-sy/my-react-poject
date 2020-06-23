// 系统状态查询详情// 系统状态查询
import React from 'react'
import {Table} from 'antd'
class SysOperStatusDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.parameter,
        }
        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        //this.valueChange = this.valueChange.bind(this);
    }
    //执行开始 在第一次渲染后调用，只在客户端。
    componentDidMount() {

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

    render() {
        let text = null;
        var datas= this.state.dataSource;

        return (
            <div>
                <table>
                    <tr>
                        <td>1</td>
                        <td>{datas.host_ip}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{datas.host_name}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{datas.check_time}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>{datas.entity_group}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>{datas.severity_txt}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>{datas.data}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>{datas.data}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>{datas.property}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>{datas.description}</td>
                    </tr>
                </table>
            </div>
        )
    }
}
export default SysOperStatusDetail;
