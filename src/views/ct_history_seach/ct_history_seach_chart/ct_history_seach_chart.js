import React from 'react';

import ReactEchart from '../../../common/Component/echarts/ReactEchart'

import './ReactEchartTest.css'

export default class ReactEchartTestHeart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    changetimer() {
        var list = this.state.data;
        
       
        list.forEach(item1 => {
            item1.forEach(item => {
                item.data.shift();
                // item.data.forEach(items => {
                //     items.value = items.value + 3 * Math.round(Math.random())
                // });
                var obj = {}
                obj.name = (Number(list[list.length-1][0].data[(list[list.length-1][0].data.length)-1].name)+1).toString()
                obj.value = (10 * Math.random()).toFixed(2)
                item.data.push(obj)
            });
        });

      
        this.setState({
            data: list
        })
    }

    componentDidMount() {
        var data = [];
        for (var i = 0; i < 1; i++) {
            var data3 = [];
            var tempModel1 = {
                title: "上月",
                chartType: "line",
                color: "#005485",
                opacity: 0.8,
                data: []
            };
            for (var j = 0; j < 10; j++) {
                var obj = {}
                obj.name = j.toString()
                obj.value = 10 * Math.round(Math.random())
                tempModel1.data.push(obj);
            }
            data3.push(tempModel1);
            data.push(data3)
        }

        this.setState({
            data: data
        })

        // this.timer = setInterval(() => {
        //     this.changetimer();
        // }, 1000);
    }
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    render() {
        return (
            <div className="ReactEchartTest">
                
                {this.state.data.map((item, index) => (
                    <div key={index}>
                        <ReactEchart dataSource={item}>
                            
                        </ReactEchart>
                    </div>
                ))}
            </div>
        );
    }
}
