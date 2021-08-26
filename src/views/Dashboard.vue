<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" style="height:100%;">
                    <template #header>
                        <div class="clearfix">
                            <span>List Of Fund Records</span>
                        </div>
                    </template>
                    <el-list>
                        <div class="clearfix">
                            3
                        </div>
                        <div class="clearfix">
                            2
                        </div>
                        <div class="clearfix">
                            1
                        </div>

                    </el-list>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">17</div>
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
                                    <div class="grid-num">4</div>
                                    <div>Securities</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix"></div>
                    </template>
                    <div class="verify-line">
                      <v-chart class="chart" :option="line_option"></v-chart>
                    </div>
                </el-card>

                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover">
                            <template #header>
                                <div class="clearfix"></div>
                            </template>
                            <v-chart class="chart" :option="pie_option" autoresize/>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover">
                            <template #header>
                                <div class="clearfix"></div>
                            </template>
                            <v-chart class="chart" :option="pie_option" autoresize/>
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
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent
    } from "echarts/components";
    import VChart, { THEME_KEY } from "vue-echarts";

    import { ref, defineComponent } from "vue";

    use([
        CanvasRenderer,
        PieChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent
    ]);

    export default defineComponent({
        name: "HelloWorld",
        components: {VChart},
        provide: {[THEME_KEY]: "light"},
        setup() {
            const line_option = ref({
                title: {
                    text: 'Stacked area line chart'
                },
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: 'Line 1'
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
                        name: 'Line 1',
                        type: 'line',
                        smooth: true,
                        data: [140, 232, 101, 264, 90, 340, 250]
                    }
                ]
            });

            const pie_option = ref({
                title: {
                    text: "Traffic Sources",
                    left: "center"
                },
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
                            { value: 335, name: "Direct" },
                            { value: 310, name: "Email" },
                            { value: 234, name: "Ad Networks" },
                            { value: 135, name: "Video Ads" },
                            { value: 1548, name: "Search Engines" }
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

            return { line_option, pie_option };
        }
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

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
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

    body {
        margin: 0;
    }
</style>