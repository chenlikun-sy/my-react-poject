import React from 'react';

import $ from 'jquery'

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

export default class CompEchartBarTest1 extends React.Component {
    constructor(props) {
        super(props);
        this.myChart = null
        this.baseoption = null


        this.chart = React.createRef();
    }

    //默认属性赋值
    static defaultProps = {
        dataSource: [],
        //柱宽
        barWidth: 15,
        //Legend右侧便宜
        showRightLegend: 0,
        //标题字体样式
        titleFontFamily: '',
        //是否显示坐标轴
        isShowAxis: true,
        //单独隐藏刻度线
        showAxisTick: false,
        //x轴呈现方式  0：正常显示  1：换行显示
        xlabelType: 0,
        //图标题
        title: '',
        isShowAxisLine: true,
        showAxisLabel: true,
        showSplitLine: false,
        showAxisSplitLine: false,
        axisNameTextColor: '',
        //坐标轴颜色
        axisLineColor: "#000",
        //是否显示右侧y轴
        isShowAxisRightLine: false,
        //隐藏y轴文字
        isShowAxisYLable: true,
        //坐标轴背景色
        isShowsplitArea: false,
        //坐标轴文字颜色
        labelColor: "#000",
        //是否显示showLegend
        showLegend: false,
        gridTop: "20%",
        gridBottom: "0%",
        gridLeft: "3%",
        gridRight: "3%",
        //x周刻度显示间隔
        xInterval: 0,
        toolTipFontSize: 12,
        //是否显示柱体上方数据
        topLable: true,
        //柱体上方数据颜色
        topLableColor: "#000",
        splitLineopacity: "1",
        //网格线颜色
        splitLineColor: "#2e4d97",
        nameTextStylePadding: [0, 0, 20, 100],
        fontSize: 12,
        //x轴文字旋转角度
        isRotate: 0,
        //网格线宽度
        splitLineWidth: 3,
        //是否为柱图，并且有覆盖效果
        isBarCover: false,
        //图例位置
        showLegendX: "center",
        //图例位置Top距离
        showLegendTop: 0,
        //图例字体大小
        legendFontSize: 30,
        //两柱图覆盖比例
        barGap: "-40%",
        showSymbol: true,
        //y轴单位
        isShowyAxisname: '',
        //是否双坐标轴
        doubleYAxis: false,

    }


    // 更新数据重新初始化视图
    componentDidUpdate() {
        this.drawEcharts();
    }
    componentDidMount() {
        this.initChart();
    }
    initChart() {
        window.addEventListener("resize", () => {
            this.myChart.resize();
        });
        //this.myChart = echarts.init(this.refs.chart);
        this.myChart = echarts.init(this.chart.current);
        this.initOption();
        this.drawEcharts();
    }


    initOption() {
        this.baseoption = {
            title: {
                text: this.props.title, //标题
                left: "5%",
                textStyle: {
                    //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#000",
                    fontFamily: this.props.titleFontFamily
                }
            },
            tooltip: {
                trigger: "axis",
                textStyle: {
                    //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    fontSize: this.props.toolTipFontSize,
                    fontWeight: "normal",
                    color: "#fff"
                }
            },
            legend: {
                show: this.props.showLegend,
                x: this.props.showLegendX,
                itemWidth: 30,
                itemHeight: 30,
                itemGap: 30,
                right: this.props.showRightLegend,
                top: this.props.showLegendTop,
                textStyle: {
                    //图例文字的样式
                    color: "#fff",
                    fontSize: this.props.legendFontSize
                },
                data: []
            },
            xAxis: [
                {
                    type: "category",
                    show: this.props.isShowAxis,
                    data: [],
                    axisTick: {
                        show: this.props.showAxisTick
                    },
                    axisLine: {
                        show: this.props.isShowAxisLine,
                        lineStyle: {
                            type: "solid",
                            width: "1", //坐标线的宽度
                            color: this.props.axisLineColor
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: this.props.fontSize
                        },
                        rotate: this.props.isRotate,
                        show: this.props.showAxisLabel,
                        formatter: this.props.labelFormatterFun
                    },
                    splitLine: {
                        lineStyle: {
                            color: this.props.splitLineColor,
                            width: this.props.splitLineWidth,
                            type: "solid"
                        },
                        show: this.props.showSplitLine //网格线
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    show: this.props.isShowAxis,
                    splitLine: {
                        show: this.props.showAxisSplitLine,
                        lineStyle: {
                            color: this.props.splitLineColor,
                            opacity: this.props.splitLineopacity,
                            width: this.props.splitLineWidth
                        }
                    },
                    splitArea: {
                        show: this.props.isShowsplitArea,
                        areaStyle: {
                            color: ["#212d60"],
                            opacity: 0.3
                        }
                    },
                    nameTextStyle: {},
                    axisTick: {
                        show: this.props.showAxisTick
                    },
                    axisLine: {
                        show: this.props.isShowAxisLine,
                        lineStyle: {
                            color: this.props.axisLineColor
                        }
                    },
                    axisLabel: {
                        show: this.props.isShowAxisYLable,
                        textStyle: {
                            fontSize: this.props.fontSize
                        }
                    }
                },
                {
                    type: "value",
                    axisLine: {
                        show: this.props.isShowAxisRightLine,
                        lineStyle: {
                            color: this.props.axisLineColor
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: this.props.showAxisTick
                    },
                    axisLabel: {
                        show: this.props.isShowAxisYLable,
                        textStyle: {
                            fontSize: this.props.fontSize
                        }
                    }
                }
            ],
            series: []
        };
    }

    drawEcharts() {
        var tempXAxis = [];
        var option = this.initialOption();
        if (this.props.dataSource) {
            var data = this.props.dataSource;
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (this.props.showLegend) {
                        option.legend.data.push(data[i].title);
                    }
                    var dataobj = $.extend(
                        true,
                        {
                            name: data[i].title,
                            type: data[i].chartType,
                            showSymbol: this.props.showSymbol,
                            barWidth: this.props.barWidth,
                            data: []
                        },
                        this.props.customTheme && this.props.customTheme.series
                    );

                    if (data[i].color) {
                        dataobj.itemStyle = {
                            normal: {
                                color: data[i].color,
                                opacity: data[i].opacity
                            }
                        };
                    }

                    //堆叠柱状图配置 stack
                    if (data[i].stack) {
                        dataobj.stack = data[i].stack;
                    }

                    //双坐标轴
                    if (data[i].yAxisIndex) {
                        dataobj.yAxisIndex = data[i].yAxisIndex;
                    }

                    if (data.length > 1 && this.props.isBarCover) {
                        dataobj.barGap = this.props.barGap;
                        if (i === 0) {
                            dataobj.z = 3;
                        }
                    }

                    if (this.props.topLable) {
                        dataobj.label = {
                            show: true, //开启显示
                            position: "top", //在上方显示
                            //position: [0, -15],
                            textStyle: {
                                //数值样式
                                color: this.props.topLableColor,
                                fontSize: 10,
                                fontWeight: "normal"
                            }
                        };
                    }

                    if (data[i].chartType === "line") {
                        dataobj.symbolSize = 12;
                        dataobj.symbol = "circle";

                        if (data[i].smooth) {
                            dataobj.smooth = true; //这个是把线变成曲线
                        }

                        if (data[i].legendWidth) {
                            option.legend.itemWidth = data[i].legendWidth;
                        }
                        if (data[i].lineWidth) {
                            dataobj.itemStyle = {
                                normal: {
                                    color: data[i].color,
                                    lineStyle: {
                                        width: data[i].lineWidth //设置线条粗细
                                    }
                                }
                            };
                        }
                        if (data[i].areaStyle) {
                            dataobj.areaStyle = {
                                normal: {
                                    color: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: data[i].areaStylecolor1 // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: data[i].areaStylecolor2 // 100% 处的颜色
                                            }
                                        ],
                                        global: false // 缺省为 false
                                    }
                                }
                            };
                        }
                        if (this.props.lineType) {
                            //dataobj.lineStyle.normal.type = this.lineType;
                        }
                        if (this.props.symbolSize) {
                            dataobj.symbolSize = this.props.symbolSize;
                        }
                    } else if (data[i].chartType === "bar") {
                        if (data[i].barBorderRadius) {
                            dataobj.itemStyle = {
                                normal: {
                                    color: data[i].color,
                                    lineStyle: {
                                        width: data[i].lineWidth //设置线条粗细
                                    },
                                    barBorderRadius: data[i].barBorderRadius,
                                    borderWidth: data[i].borderWidth,
                                    borderType: data[i].borderType,
                                    borderColor: data[i].borderColor
                                }
                            };
                        }
                    }

                    if (this.props.xlabelType === 0) {
                        for (var j = 0; j < data[i].data.length; j++) {
                            if (option.xAxis[0].data.indexOf(data[i].data[j].name) === -1) {
                                option.xAxis[0].data.push(data[i].data[j].name);
                            }
                            dataobj.data.push(data[i].data[j].value);
                        }
                    } else {
                        for (var m = 0; m < data[i].data.length; m++) {
                            if (tempXAxis.indexOf(data[i].data[m].name) === -1) {
                                if (option.xAxis[0].data.length % 2 === 0) {
                                    option.xAxis[0].data.push(data[i].data[m].name);
                                } else {
                                    option.xAxis[0].data.push("\n" + data[i].data[m].name);
                                }
                                tempXAxis.push(data[i].data[m].name);
                            }
                            dataobj.data.push(data[i].data[m].value);
                        }
                    }
                    dataobj.data.userObject = data[i];
                    option.series.push(dataobj);
                }
            }
        }
        this.myChart.setOption(option);
    }

    initialOption() {
        var option = $.extend(
            true,
            {},
            this.baseoption,
            this.props.customTheme && this.props.customTheme.option
        );

        option.grid = {
            top: this.props.gridTop,
            left: this.props.gridLeft,
            right: this.props.gridRight,
            bottom: this.props.gridBottom,
            containLabel: true
        };
        option.xAxis[0].axisLabel.interval = this.props.xInterval;
        if (this.props.labelColor) {
            option.xAxis[0].axisLabel.textStyle.color = this.props.labelColor;
            option.yAxis[0].axisLabel.textStyle.color = this.props.labelColor;
        }
        if (this.props.axisNameTextColor) {
            option.yAxis[0].nameTextStyle.color = this.props.axisNameTextColor;
        }
        option.yAxis[0].splitNumber = 5;

        if (this.props.isShowyAxisname !== "") {
            option.yAxis[0].name = this.props.isShowyAxisname;
            option.yAxis[0].nameTextStyle = {
                color: "#fff",
                fontSize: this.props.fontSize,
                padding: this.props.nameTextStylePadding
            };
            if (this.props.doubleYAxis) {
                option.yAxis[1].name = this.props.isShowyAxisname;
                option.yAxis[1].nameTextStyle = {
                    color: "#fff",
                    fontSize: this.props.fontSize
                };
            }
        }
        return option;
    }

    render() {
        return (
            //默认高宽
            <div style={{
                height: '100%',
                width: '100%',
                minHeight: '100px',
                minWidth: '100px '
            }}
                ref={this.chart}
            ></div >
        );
    }
}