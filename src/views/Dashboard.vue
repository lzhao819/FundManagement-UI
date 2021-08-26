<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" style="height:100%;">
                    <template #header>
                        <div class="clearfix">Fund List</div>
                    </template>
                    <el-table :data="tableData" border class="table" style="background-color: #e9eaec;" ref="multipleTable" header-cell-class-name="table-header">
                        <el-table-column prop="name" label="Fund Name"></el-table-column>
                        <el-table-column label="Price">
                            <template #default="scope">${{ scope.row.money }}</template>
                        </el-table-column>
                        <el-table-column label="Change">
                            <template>$</template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{fund_quant}}</div>
                                    <div>Funds</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <el-form v-model="security_quant" class="grid-num"></el-form>
                                    <div>Securities</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-card shadow="hover" style="height:400px;">
                    <template #header>
                        <div class="clearfix">Security-Quantity Date List</div>
                    </template>
                    <div class="verify-line">
                        <v-chart class="chart" :option="line_option" autoresize/>
                    </div>
                </el-card>

                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover">
                            <template #header>
                                <div class="clearfix">Security-Quantity Pie(per user)</div>
                            </template>
                            <v-chart class="chart" :option="pie_option1" autoresize/>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover">
                            <template #header>
                                <div class="clearfix">Security-Quantity Pie(per list)</div>
                            </template>
                            <v-chart class="chart" :option="pie_option2" style="" autoresize/>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import { use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import { PieChart } from "echarts/charts";
    import { LineChart, } from "echarts/charts";
    import {
        TitleComponent,
        GridComponent,
        TooltipComponent,
        LegendComponent,
        AxisPointerComponent,

    } from "echarts/components";
    import VChart, { THEME_KEY } from "vue-echarts";

    import { ref, defineComponent } from "vue";
    import axios from "axios";

    use([
        CanvasRenderer,
        PieChart,
        LineChart,
        GridComponent,
        AxisPointerComponent,
        TitleComponent,
        TooltipComponent,
        LegendComponent
    ]);

    var fund_quant;
    var security_quant;
        
    export default defineComponent({
        name: "charts",
        components: {VChart},
        provide: {[THEME_KEY]: "light"},
        beforeCreate(){
            axios.get(`http://localhost:8080/managers/1/fundQuant`)
                .then(function (resp) {
                    fund_quant=resp.data;
                    console.log(fund_quant);
                    security_quant=1;
                })
                return {fund_quant, security_quant};
        },
    
        setup() {

            const line_option = ref({
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {focus: 'series'},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {focus: 'series'},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            });

            const pie_option1 = ref({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
                },
                series: [
                    {
                        name: "Traffic Sources",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            {value: 335, name: "Direct"},
                            {value: 310, name: "Email"},
                            {value: 234, name: "Ad Networks"},
                            {value: 135, name: "Video Ads"},
                            {value: 1548, name: "Search Engines"}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });

            const pie_option2 = ref({
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"]
                },
                series: [
                    {
                        name: "nightingale model",
                        type: "pie",
                        radius: [20, 100],
                        center: ["50%", "60%"],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 6
                        },
                        data: [
                            {value: 90, name: 'r1'},
                            {value: 60, name: 'r2'},
                            {value: 62, name: 'r3'},
                            {value: 50, name: 'r4'},
                            {value: 45, name: 'r5'},
                            {value: 36, name: 'r6'},
                            {value: 12, name: 'r7'},
                            {value: 11, name: 'r8'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });

            // axios.get(`http://localhost:8080/managers/1/quantityQuant`)
            //     .then(function (resp) {
            //         quantity_quant=resp.data;
            //         console.log(quantity_quant);
            //     })
        return{ line_option, pie_option1,pie_option2 };
        },
       

    });
</script>

<style scoped>
    .chart {
        height: 300px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: steelblue;
    }

    .grid-con-1 .grid-num {
        color: steelblue;
    }

    .grid-con-2 .grid-con-icon {
        background: darkseagreen;
    }

    .grid-con-2 .grid-num {
        color: darkseagreen;
    }

    .grid-con-3 .grid-con-icon {
        background: darksalmon;
    }

    .grid-con-3 .grid-num {
        color: darksalmon;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }
    .fund_menu{
        height:50px;
        text-color:#333333;
        border-radius: 5px;
        border-bottom:1px solid #999999;
    }
    .ct{
        padding:30px 20px 0;
    }
    .rt{
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
    }

    body {
        margin: 0;
    }
</style>