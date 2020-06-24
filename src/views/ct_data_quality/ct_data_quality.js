import React from 'react'
import { Button } from 'antd'

import './ct_data_quality.less'

import img1 from './img/u2747.svg';
import img2 from './img/u2748.svg';
import omcJson from './config/omc.json'

export default class CtDataQuality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            omcList: [],
        }
        this.headList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    }

    componentDidMount() {
        var omcList = [];
        omcJson.forEach((item) => {
            var obj = {
                id: item.id,
                name: item.name,
                img1: item.img1,
                img2: item.img2,
                selected: false
            }
            omcList.push(obj)
        })
        this.setState({
            omcList: omcList
        })
    }

    omcClick(item) {
        this.state.omcList.map((eachItem) => { eachItem.selected = false })
        item.selected = true;
        this.setState({
            omcList: this.state.omcList
        })
    }

    imgOnclick(item) {

    }
    omcOnMouseOver(item) {

    }
    omcOnMouseOut(item) {

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
                        <div className="ct-data-quality-thead-title-first">1</div>
                        {
                            this.headList.map((item) => {
                                return <div className="ct-data-quality-thead-title"> <span>{item.toString()}</span> </div>
                            })
                        }
                    </div>
                    {/* {
                        this.headList.map((item) => {
                            return <div className="ct-data-quality-tbody-row">
                                <div className="ct-data-quality-tbody-row-first"> 2020-04-11 </div>
                                {
                                    this.headList.map((item) => {
                                        return <div className="ct-data-quality-thead-title">
                                            <div className="ct-data-qualityd-child">
                                                <div className="ct-data-quality-child-circle" onRightClick={() => this.imgOnclick(item)} onMouseOver={() => this.omcOnMouseOver(item)} onMouseOut={() => this.omcOnMouseOut(item)}></div>
                                                <div className="ct-data-quality-child-div" style={{ display: 'none' }}>补采</div>
                                            </div>
                                            <div className="ct-data-qualityd-tooltip">
                                                <div>
                                                    <span></span>
                                                    <span>100.00</span>
                                                </div>
                                                <div>15min 111</div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    } */}
                </div>
            </div>
        )
    }
}