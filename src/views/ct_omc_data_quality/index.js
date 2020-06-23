// 电信入围测试-OMC原始数据质量报告
import React from 'react'
import {
    getSystemRunStateQueryByCount
} from "../../common/axios/sysService";
import './index.less'
import omcJson from '../../../static/config/omc_config.json'
import { Modal } from 'antd'

export default class ResumeIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            omcData: omcJson,
            visible:false,
            title:""
        }

        this.ClickPic = this.ClickPic.bind(this);
    }

    componentDidMount() {
        this.getDataByAreaId();
    }


    getDataByAreaId() {
        getSystemRunStateQueryByCount(1, 2, 3).then(res => {
            this.getDataCompleted(res);
        });
    }

    getDataCompleted(data) {
        var res = data;
    }

    ClickPic(element) {
        this.setState(
            {
                visible:true,
                title:element.name
            }
        );
        // window.location.href="www.baidu.com"

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
        var datas = this.state.omcData.OMC;
        return (
            <div className="ct_ocm_div">
                {datas.map(element => {
                    return <div key={element.id} onClick={this.ClickPic.bind(this,element)}>
                        <img src="static\img\goole.png"></img>
                        <div>{element.name}</div>
                    </div>
                })}

                <Modal
                    title={this.state.title}
                    wrapClassName={'ant-model-div'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}