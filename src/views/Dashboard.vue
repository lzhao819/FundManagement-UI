<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-punch grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">18</div>
                                    <div>Funds</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-apps grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">6</div>
                                    <div>Securities</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-group grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">7</div>
                                    <div>managers</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-card shadow="hover" style="height:400px;">
                    <template #header>
                        <div class="clearfix">Security-Quantity Date List(per user)</div>
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
                                <div class="clearfix">Security-Quantity Pie(per fund)</div>
                            </template>
                            <v-chart class="chart" :option="pie_option2" style="" autoresize/>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" style="height:930px;overflow: scroll;">
                    <table class="pure-table">
                        <thead>
                        <th>fund name</th>
                        <th>price</th>
                        <th>change</th>
                        </thead>
                        <tbody v-for="fund in funds">
                        <td style="font-size: 12px;">{{fund.name}}</td>
                        <td style="color: navy">{{fund.price}}</td>
                        <td style="color: darkgrey"> {{fund.change}}</td>
                        </tbody>
                    </table>
                </el-card>
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
    import 'echarts/theme/tech-blue'

    import { ref, defineComponent } from "vue";

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

    export default defineComponent({
        name: "charts",
        components: {VChart},
        provide: {[THEME_KEY]: "tech-blue"},
        setup() {
            const line_option = ref({
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['IBM','Visa','Google','Yahoo','JD','Apple','SoftBank']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        axisLabel: {interval:0, rotate:40},
                        type: 'category',
                        data: ['2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12']
                    }
                ],
                yAxis: [{type: 'value',}],
                series: [
                    {
                        name: 'IBM',
                        type: 'line',
                        emphasis: {focus: 'series'},
                        data: [120, 0, 20, -30, 90, 230, 420]
                    },
                    {
                        name: 'Visa',
                        type: 'line',
                        emphasis: {focus: 'series'},
                        data: [-20, 180, 40,-10, -60, -100, 50]
                    },
                    {
                        name: 'Google',
                        type: 'line',
                        emphasis: {focus: 'series'},
                        data: [250, 232, 201, 154, 190, 230, 310]
                    },
                    {
                        name: 'Yahoo',
                        type: 'line',
                        emphasis: {focus: 'series'},
                        data: [30, 60,90,40,10, -40,-60]
                    },
                    {
                        name: 'Apple',
                        type: 'line',
                        emphasis: {focus: 'series'},
                        data: [0, 0, 20, 0, -50, -20,0]
                    },
                    {
                        name: 'SoftBank',
                        type: 'line',
                        emphasis: {focus: 'series'},
                        data: [-40, 100, 210, 0, 0, -40, 20]
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
                    data: ['IBM','Visa','Google','Yahoo','Apple','SoftBank']
                },
                series: [
                    {
                        name: "Pie model - manager_id=1",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            {value: 335, name: "IBM"},
                            {value: 310, name: "Visa"},
                            {value: 234, name: "Google"},
                            {value: 135, name: "Yahoo"},
                            {value: 1548, name: "Apple"},
                            {value: 548, name: "SoftBank"}
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
                    trigger: 'axis',
                    top:'top',
                    data: ['IBM','Visa','Google','Yahoo','JD','Apple','SoftBank']
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: "nightingale model - fund_id=1",
                        type: "pie",
                        radius: ['10%','80%'],
                        center: ["50%", "60%"],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 2
                        },
                        data: [
                            {value:820,name:'IBM'},
                            {value:1120,name:'Visa'},
                            {value:6000,name:'Google'},
                            {value:3420,name:'Yahoo'},
                            {value:1020,name:'JD'},
                            {value:5600,name:'Apple'},
                            {value:2320,name:'SoftBank'}
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
            const funds=[
                {name:'Olympic Memorial Fund',price:'25.45$',change:'+9.02'},
                {name:'UK Overseas Income Fund',price:'15.32$',change:'-2.55'},
                {name:'North America Growth',price:'10.23$',change:'-1.12'},
                {name:'Fuji Memorial Fund',price:'5.21$',change:'-6.56'},
                {name:'Global Tech Fund',price:'35.21$',change:'+5.55'},
                {name:'North America Tech Fund',price:'12.33$',change:'-6.54'},
                {name:'NAM Overseas Income Fund',price:'18.64$',change:'-9.54'},
                {name:'APAC Tech Fund',price:'8.34$',change:'+0.66'},
                {name:'APAC United Growth',price:'4.23$',change:'-4.34'},
                {name:'JYP Memorial Fund',price:'4.98$',change:'-2.33'},
                {name:'National Development Fund',price:'5.87$',change:'-7.45'},
                {name:'Spark Program Fund',price:'12.80$',change:'+2.56'},
                {name:'State Key Lab Fund',price:'11.69$',change:'+1.22'},
                {name:'EUR Innovation Fund',price:'5.65$',change:'-5.45'},
                {name:'EUR Mutual Fund',price:'3.21$',change:'-8.76'},
                {name:'European Union Tech Fund',price:'15.55$',change:'+3.45'},
                {name:'EUR Overseas Income Fund',price:'18.66$',change:'+5.21'},
            ];

            return {line_option, pie_option1,pie_option2,funds};
        },
    });
</script>

<style scoped>
    table {
        border-collapse: collapse;
        border-spacing: 0;
        margin:0 auto;
    }

    td,th {
        padding: 0;
    }
    .pure-table {
        position: center;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
    }

    .pure-table caption {
        color: #000;
        font: italic 85%/1 arial,sans-serif;
        padding: 1em 0;
        text-align: center;
    }

    .pure-table td,.pure-table th {
        border-bottom: 1px solid #cbcbcb;
        border-width:1px;
        font-size: inherit;
        text-align: center;
        margin: 0;
        padding: .5em 1em;
    }

    .pure-table thead {
        background-color: #e0e0e0;
        color: #000;
        text-align: left;
        vertical-align: bottom;
    }

    .pure-table td {
        background-color: transparent;
        padding:1.2em 1em 1.2em 1em;
        font-size:14px;
        text-align: center;
    }
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
        background: royalblue;
    }

    .grid-con-2 .grid-num {
        color:royalblue;
    }

    .grid-con-3 .grid-con-icon {
        background: lightsteelblue;
    }

    .grid-con-3 .grid-num {
        color:lightsteelblue;
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