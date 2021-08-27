<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> Buy
        </el-breadcrumb-item>
        <el-breadcrumb-item>Funds Overview</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="Fund" prop="name">
<!--            <el-input v-model="form.name"></el-input>-->
            <el-select v-model="form.fund" placeholder="Please choose a fund">
              <el-option key="bbk" label="Olypic Memorial Fund" value="Olypic Memorial Fund"></el-option>
              <el-option key="xtc" label="UK Overseas Income Fund" value="UK Overseas Income Fund"></el-option>
              <el-option key="imoo" label="North America Growth" value="North America Growth"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Security" prop="region">
            <el-select v-model="form.security" placeholder="Please choose a security">
              <el-option key="bbk" label="IBM" value="IBM"></el-option>
              <el-option key="xtc" label="Visa" value="Visa"></el-option>
              <el-option key="imoo" label="Google" value="Google"></el-option>
              <el-option key="imoo" label="CVS" value="CVS"></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="position" prop="region">-->
<!--            <el-select v-model="form.position" placeholder="请选择">-->
<!--              <el-option key="bei" label="1" value="北京"></el-option>-->
<!--              <el-option key="xtc" label="2" value="上海"></el-option>-->
<!--              <el-option key="imoo" label="3" value="广州"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="Date">
<!--            <el-col :span="11">-->
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="Please choose a date" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
<!--            </el-col>-->
<!--            <el-col class="line" :span="2">-</el-col>-->
<!--            <el-col :span="11">-->
<!--              <el-form-item prop="date2">-->
<!--                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">-->
<!--                </el-time-picker>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
          </el-form-item>
          <el-form-item label="Quantity"  prop="options">
<!--            <el-input v-model:controls="form.quantity"></el-input>-->
            <el-input-number v-model:controls="form.quantity"></el-input-number>
          </el-form-item>
<!--          <el-form-item label="选择开关" prop="delivery">-->
<!--            <el-switch v-model="form.delivery"></el-switch>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="多选框" prop="type">-->
<!--            <el-checkbox-group v-model="form.type">-->
<!--              <el-checkbox label="步步高" name="type"></el-checkbox>-->
<!--              <el-checkbox label="小天才" name="type"></el-checkbox>-->
<!--              <el-checkbox label="imoo" name="type"></el-checkbox>-->
<!--            </el-checkbox-group>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="单选框" prop="resource">-->
<!--            <el-radio-group v-model="form.resource">-->
<!--              <el-radio label="步步高"></el-radio>-->
<!--              <el-radio label="小天才"></el-radio>-->
<!--              <el-radio label="imoo"></el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="备注" prop="desc">-->
<!--            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Buy</el-button>
<!--            <el-button @click="onReset">重置表单</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import {fetchData} from "../api";
export default {
  name: "baseform",
  setup() {
    // console.log(form.position)
    // axios.get('http://devopsapac48.conygre.com:8080/managers/1').then(function (res){
    //   ElMessage.success("提交成功");
    // }).catch(function (error){
    //   console.log(error);
    // });
    // const query = reactive({
    //   security_id: 1,  //API测试后改为form.date
    //   position_id: 10000,
    //    quantity: 666,
    //    date_purchased: '2021-8-26',
    //    funds_fund_id: 1,
    // });

    const options = [
      {
        value: "guangdong",
        label: "广东省",
        children: [
          {
            value: "guangzhou",
            label: "广州市",
            children: [
              {
                value: "tianhe",
                label: "天河区",
              },
              {
                value: "haizhu",
                label: "海珠区",
              },
            ],
          },
          {
            value: "dongguan",
            label: "东莞市",
            children: [
              {
                value: "changan",
                label: "长安镇",
              },
              {
                value: "humen",
                label: "虎门镇",
              },
            ],
          },
        ],
      },
      {
        value: "hunan",
        label: "湖南省",
        children: [
          {
            value: "changsha",
            label: "长沙市",
            children: [
              {
                value: "yuelu",
                label: "岳麓区",
              },
            ],
          },
        ],
      },
    ];
    const rules = {
      name: [
        // { required: true, message: "请输入表单名称", trigger: "blur" },
      ],
    };
    const formRef = ref(null);

    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: true,
      type: ["步步高"],
      resource: "小天才",
      desc: "",
      options: [],
      security: "",
      position: "",
      quantity: "",
      fund:"",
    });

    // 提交
    const onSubmit = () => {

      console.log(form.position)
      // axios.get('http://devopsapac48.conygre.com:8080/managers/1').then(function (res) {
        ElMessage.success("Transaction Complete");
      // }).catch(function (error) {
      //   console.log(error);
      // });

      fetchData(query).then((res) => {
        console.log(res)
      // tableData.value = res.list;
      });
    }
          // axios.post('http://devopsapac48.conygre.com:8080/positions/1', {
          //   security_id: 1,  //API测试后改为form.date
          //   position_id: 10000,
          //   quantity: 666,
          //   date_purchased: '2021-8-27',
          //   funds_fund_id: 1
          // })
          //     .then(function (response) {
          //       console.log(response);
          //       ElMessage.success("Transaction Complete！");
          //     })
          //     .catch(function (error) {
          //       console.log(error);
          //     });

        // } else {
        //   return false;
        // }
      // });
    // };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
    };
    const getFundType = (type) => {
      const map = new Map([
        ['Olypic Memorial Fund', 1],
        ['UK Overseas Income Fund', 2],
        ['North America Growth', 3],

      ])
      return map.get(type)

    }

    const getSecurityType = (type) => {
      const map = new Map([
        ['IBM', 1],
        ['Visa', 2],
        ['Google', 3],
        ['CVS', 4]

      ])
      return map.get(type)

    }

    const getPositionType =(type)=> {
      const map = new Map([
        ['北京', 1],
        ['上海', 2],
        ['广州', 3],

      ])
      return map.get(type)
    }
    return {
      options,
      rules,
      formRef,
      form,
      onSubmit,
      onReset,
    };
  },
};
</script>

