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
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="employee_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="firstName" label="first name"></el-table-column>

<!--                <el-table-column label="头像(查看大图)" align="center">-->
<!--                    <template #default="scope">-->
<!--                        <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">-->
<!--                        </el-image>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="lastName" label="manager name"></el-table-column>
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

                <el-table-column prop="funds" label="Hold fund"></el-table-column>
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
                <el-form-item label="username">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="address">
                    <el-input v-model="form.address"></el-input>
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
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {              //获取manager_info请求
          axios.get('http://localhost:8080/managers/1')   //修改获取Manager_info的API
              .then(function (res) {
                console.log(res);
                tableData.value = res.data;
                console.log(res.data);
              })
              .catch(function (error) {
                console.log(error);
              });
            // fetchData(query).then((res) => {
            //     tableData.value = res.list;
                // pageTotal.value = res.pageTotal || 50;
            // });
        };
        getData();

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
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("Are you sure to sold out？", "prop", {
                type: "warning",
            })
                .then(() => {
                  axios.post('http://localhost:8080/positions/'+ 1, {
                       security_id: 1,  //API测试后改为form.date
                       position_id: 10000,
                       quantity: 666,
                       date_purchased: '2021-8-26',
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


                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            name: "",
            address: "",
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
