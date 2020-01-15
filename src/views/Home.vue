<template>
  <div class="home">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ userName }}</span>
      </el-header>
      <el-container style="height: 900px">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <CustomersList
            @click="getCustomerInfo"></CustomersList>
        </el-aside>
        <el-main style="padding: 0px 0px">
          <el-row>
            <el-col :span="4" style="background-color: #99a9bf">
              <div>
                <el-row >
                  <el-col :span="24">
                    <div>
                      <span>选中客户</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="3">
              <StrategyList
              v-on:itemChanged="strategyChanged"
              ></StrategyList>
            </el-col>
            <el-col :span="7">
              <div>
                <el-row >
                  <span>{{title4}}</span>
                  <el-row :gutter="20">
                    <el-col :span="10">
<!--                      <DragTable :tableData="collectionOrder"></DragTable>-->
                      <TotalTable ref="totalTable"
                      :collectionOrder.sync="collectionOrder"></TotalTable>
                    </el-col>
                    <el-col :span="10">
                      <TnRTable ref="tnRTable"
                      :data.sync="tAndR"></TnRTable>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="10">
                      <TRTable ref="tRTable"
                      :data.sync="tReduceR"></TRTable>
                    </el-col>
                    <el-col :span="10">
                      <span>R-T</span>
                      <RTTable ref="rTTable"
                      :data.sync="rReduceT"></RTTable>
                    </el-col>
                  </el-row>
                  <el-button type="primary" style="margin-top: 20px" @click="dialogVisible = true" plain>更新</el-button>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="策略名称" :visible.sync="dialogVisible">
      <el-input type="text" v-model="strategyName" placeholder="策略名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import CustomersList from '@/components/CustomersList'
import RTTable from '@/components/RTTable'
import TnRTable from '@/components/TnRTable'
import TRTable from '@/components/TRTable'
import StrategyList from '@/components/StrategyList'
import TotalTable from '@/components/TotalTable'
import { objTransfer, listTranfer } from '@/utils/TransferUtil'

export default {
  name: 'home',
  components: {
    TotalTable,
    StrategyList,
    CustomersList,
    RTTable,
    TnRTable,
    TRTable

  },
  data () {
    return {
      customers: [],
      customer: null,
      userName: this.$store.state.user_name,
      strategies: [],
      curStrategy: null,
      collectionOrder: null,
      tAndR: null,
      tReduceR: null,
      rReduceT: null,
      p: null,
      dialogVisible: false,
      strategyName: '',
      flag: '',
      title4: '当前策略'
    }
  },
  methods: {
    // // 获取客户列表
    // getCustomers () {
    //   this.$http.get('/customers', {
    //     params: {
    //       userName: this.userName
    //     }
    //   }).then((response) => {
    //     this.customers = response.data
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // },
    // 绑定点击的客户
    getCustomerInfo (customer) {
      this.customer = customer
    },
    // 获取用户策略列表
    // getStrategies () {
    //   this.$http.get('/strategy/strategylist', {
    //     params: {
    //       name: this.userName
    //     }
    //   }).then((response) => {
    //     this.strategies = response.data
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // },
    // 获取用户当前使用的策略
    getCurStrategy () {
      this.$http.get('/strategy/info', {
        params: {
          name: this.userName
        }
      }).then(res => {
        this.refreshStrategy(res)
      }).catch(error => {
        console.log(error)
      })
    },
    // 更新策略
    submit () {
      this.confirmStrategyName()
    },
    // 确认策略名称是否存在
    confirmStrategyName () {
      this.$http.get('/strategy/name', {
        params: {
          userName: this.$store.state.user_name,
          strategyName: this.strategyName
        }
      }).then(res => {
        if (!res.data.exist) {
          this.dialogVisible = false
          this.updateStrategy()
        } else alert('名称已存在')
      }).catch(error => {
        return alert(error.message)
      })
    },
    // 上传策略
    updateStrategy () {
      this.$http({
        method: 'post',
        url: '/strategy/add',
        data: {
          strategy: {
            name: this.strategyName,
            collectionOrder: this.$refs.totalTable.toParentResult(),
            tAndROrder: this.$refs.tnRTable.toParentResult(),
            tReduceROrder: this.$refs.tRTable.toParentResult(),
            rReduceTOrder: this.$refs.rTTable.toParentResult()
          },
          userName: this.userName
        }
      }).then(res => {
        if (res.data.code === 1) {
          alert('策略添加成功')
          this.getStrategies()
          this.getCurStrategy()
        } else {
          alert(res.data.msg)
        }
      }).catch(error => {
        alert('添加失败')
        console.log(error)
      })
    },
    // 点击策略列表显示相应策略
    strategyChanged (item) {
      this.$http.get('/strategy/history', {
        params: {
          userName: this.userName,
          item: item
        }
      }).then(res => {
        this.refreshStrategy(res)
      }).catch(err => {
        console.log(err)
      })
    },
    refreshStrategy (data) {
      this.curStrategy = data.data
      this.collectionOrder = objTransfer(data.data.strategy.collectionOrder)
      this.tAndR = objTransfer(data.data.strategy.tAndROrder)
      this.tReduceR = listTranfer(data.data.strategy.tReduceROrder)
      this.rReduceT = data.data.strategy.rReduceTOrder
      if (data.data.status === 1) {
        this.title4 = data.data.strategy.name + '(正在使用)'
      } else {
        this.title4 = data.data.strategy.name
      }
    }

  },
  mounted () {
    // this.getCustomers()
    // this.getStrategies()
    this.getCurStrategy()
  }
}
</script>
