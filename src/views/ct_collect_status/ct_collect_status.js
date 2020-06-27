import React from 'react'
import { Button } from 'antd'

import './ct_collect_status.css'

import CtCollectStatusTool from './ct_collect_status_tool/ct_collect_status_tool'
import CtCollectStatusTable from './ct_collect_status_table/ct_collect_status_table'

export default class CtCollectStatus extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {


    }

    toolClick = (provId, omcId, typeId, beginTime, endTime) => {
        this.onRefTable.getData(provId, omcId, typeId, beginTime, endTime)
    };

    render() {
        return (
            <div className="ct-collect-status">
                <CtCollectStatusTool toolClick={this.toolClick}></CtCollectStatusTool>
                <CtCollectStatusTable onRef={(ref) => this.onRefTable = ref}></CtCollectStatusTable>
            </div>
        )
    }
}