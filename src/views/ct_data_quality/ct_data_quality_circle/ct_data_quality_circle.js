import React from 'react'

import './ct_data_quality_circle.less'

import { getQualityInstructions } from "../../../common/axios/sysService";

import { CloseOutlined } from '@ant-design/icons';

export default class CtDataQualityCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDiv: false,
            showTooltip: false
        }
    }
    //右键补采显示隐藏事件
    // onRightClick(e) {
    //     if (e.button == 2 && !this.props.param.isNoData) {
    //         e.preventDefault();
    //         this.setState({
    //             showDiv: !this.state.showDiv,
    //             showTooltip: true
    //         })
    //     }
    // }
    onRightClick(e) {
        if (!this.props.param.isNoData) {
            this.setState({
                showDiv: !this.state.showDiv,
                showTooltip: true
            })
        }
    }
    //tooltip鼠标移入事件
    omcOnMouseOver() {
        if (!this.props.param.isNoData) {
            this.setState({
                showTooltip: true
            })
        }
    }
    //tooltip鼠标移出事件
    omcOnMouseOut() {
        if (!this.props.param.isNoData) {
            this.setState({
                showTooltip: false
            })
        }
    }
    //补采发送事件
    omcClick() {
        //this.sendInfo();
    }

    //补采
    sendInfo() {
        getQualityInstructions().then(res => {
            this.sendInfoCompleted(res);
        });
    }
    sendInfoCompleted(flag) {

    }


    render() {
        if (this.props.index === 20 || this.props.index === 21 || this.props.index === 22 || this.props.index === 23) {
            var lastPosition = true
        }
        return (
            <div className="ct-data-quality-circle">
                <div className="ct-data-quality-circle-content">
                    <div className="ct-data-quality-circle-child"
                        // onContextMenu={(e) => this.onRightClick(e)}
                        onMouseOver={() => this.omcOnMouseOver()}
                        onClick={() => this.onRightClick()}
                        onMouseOut={() => this.omcOnMouseOut()}
                        style={{ backgroundColor: this.props.param.color }}
                    >
                        <img src="static/img/ct_data_quality/close.png" style={{ display: this.props.param.isNoData ? 'block' : 'none' }}></img>
                    </div>
                    <div className="ct-data-quality-circle-div" style={{ display: this.state.showDiv ? 'block' : 'none' }} onClick={() => this.omcClick()}>补采</div>
                </div>
                <div className={`ct-data-qualityd-circle-tooltip ${lastPosition ? 'ct-data-quality-circle-lastPosition' : ''}`} style={{ display: this.state.showTooltip ? 'block' : 'none' }} >
                    <div>
                        <span style={{ backgroundColor: this.props.param.color }}></span>
                        <span>{this.props.param.integrity_rate}</span>
                    </div>
                    <div>{this.props.param.description}</div>
                </div>
            </div>
        )
    }
}