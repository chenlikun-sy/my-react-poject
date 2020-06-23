import React from 'react'
import {Button}  from 'antd'

import './ct_collect_status.css'

import CtCollectStatusTool from './ct_collect_status_tool/ct_collect_status_tool'
import CtCollectStatusTable from './ct_collect_status_table/ct_collect_status_table'

export default class CtCollectStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNum: 1
        }

    }

    componentDidMount() {

     
    }

    render(){
        return (
            <div className="ct-collect-status">
                <CtCollectStatusTool></CtCollectStatusTool>
                <CtCollectStatusTable></CtCollectStatusTable>
            </div>
        )
    }
}