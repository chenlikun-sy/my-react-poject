// 电信入围测试-OMC原始数据质量报告
import React from 'react'
import {
    getSystemRunStateQueryByCount
  } from "../../common/axios/sysService";
import './index.css'
import {Button}  from 'antd'

export default class ResumeIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getDataByAreaId()
    }

    getDataByAreaId() {
        getSystemRunStateQueryByCount(1,2,3).then(res => {
          this.getDataCompleted(res);
        });
      }

      getDataCompleted(data){
          var res = data;
      }

    render(){
        return (
            <div className="ocm_div">
                <div></div>
                {/* <Button type='primary'>123</Button> */}
            </div>
        )
    }
}