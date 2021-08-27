<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> sold record
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
<!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
<!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
<!--                </el-select>-->
                <el-input v-model="query.name" placeholder="manager_id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">search</el-button>
            </div>
            <el-table :data.sync="tableData" :key="Math.random()" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="ID" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="fundName" label="fundName"></el-table-column>

<!--                <el-table-column label="头像(查看大图)" align="center">-->
<!--                    <template #default="scope">-->
<!--                        <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">-->
<!--                        </el-image>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="quantity" label="quantity"></el-table-column>
<!--                <el-table-column label="状态" align="center">-->
<!--                    <template #default="scope">-->
<!--                        <el-tag :type="-->
<!--                                scope.row.state === '成功'-->
<!--                                    ? 'success'-->
<!--                                    : scope.row.state === '失败'-->
<!--                                    ? 'danger'-->
<!--                                    : ''-->
<!--                            ">{{ scope.row.state }}</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->

                <el-table-column prop="securityName" label="securityName"></el-table-column>
                <el-table-column prop="date" label="purchaseDate"></el-table-column>
<!--                <el-table-column label="交易数量">-->
<!--                 <template #default="scope">{{ scope.row.money}}</template>-->
<!--                </el-table-column>-->
                <el-table-column label="operation" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">edit
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">sold out</el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            <div class="pagination">-->
<!--                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>-->
<!--            </div>-->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="edit" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="quantity">
                    <el-input v-model="form.quantity"></el-input>
                </el-form-item>
                <el-form-item label="securityName">
                    <el-input v-model="form.securityName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">cancel</el-button>
                    <el-button type="primary" @click="saveEdit">OK</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import axios from "axios";

export default {
    name: "basetable",
    setup() {
        const query = reactive({
            address: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
        });
      const tableData = ref([{
        ID: 1,
        date: '2021-08-27',
        fundName: 'Olypic Memorial Fund',
        quantity:  666,
        securityName: 'IBM'
      }, {
        ID: 2,
        date: '2019-05-02',
        fundName: 'UK Overseas Income Fund',
        quantity:  50,
        securityName: 'Google'
      }, {
        ID: 3,
        date: '2016-05-02',
        fundName: 'North America Growth',
        quantity:  125,
        securityName: 'Visa'
      }, {
        ID: 4,
        date: '2016-05-02',
        fundName: 'UK Overseas Income Fund',
        quantity:  999,
        securityName: 'CVS'
      },{
        ID: 5,
        date: '2016-05-02',
        fundName: 'Olypic Memorial Fund',
        quantity:  42,
        securityName: 'IBM'
      }]
    );
      const pageTotal = ref([]);


      // tableData.value = jsonData
        // 获取表格数据
        // const getData = () => {              //获取manager_info请求
        //   axios.get('http://devopsapac48.conygre.com:8080/managers/'+ 1)   //修改获取Manager_info的API
        //       .then(function (res) {
        //         console.log(res);
        //         tableData.value = res.data;
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
        // };
        // getData();

        // 查询操作
        const handleSearch = () => {
            // query.pageIndex = 1;
            getData();
        };

        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index, val) => {
            // 二次确认删除
            ElMessageBox.confirm("Are you sure to sold out？", "prop", {
                type: "warning",
            })
                .then(() => {
                  axios.delete('/positions/'+ 1, {
                       security_id: 1,  //API测试后改为form.date
                       position_id: 10000,
                       quantity: 666,
                       date_purchased: '2021-8-27',
                       funds_fund_id: 1
                  })
                      .then(function (response) {
                        console.log(response);
                        ElMessage.success("sold out!");
                        tableData.value.splice(index, 1);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  ElMessage.success("sold out successfully!");
                  // this.tableData[index].flag = false;
                  // // this.tables = JSON.parse(JSON.stringify(this.tables)); // 如果不转化 页面不生效
                  // this.tableData = Object.assign([],this.tableData.value.splice(index, 1)) // 赋值一个新的对象
                  tableData.value.splice(index, 1)
                  console.log("转化之后", tableData);
                  console.log("sold out!")

                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            securityName: "",
            quantity: "",

        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`edit ${idx + 1} successfully!`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };
        


        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
        };
    },

};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
