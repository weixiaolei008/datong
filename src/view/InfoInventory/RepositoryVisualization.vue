<!-- RFID信息设置 -->
<template>
	<el-container style="width: 100%;height: 100%;overflow: auto;">
		<div class="img">
			<img :class="imgStyle" :src="src" />
			<span v-for="c in regionLsit" :class="'imgStyle'+c.code" @click="Warehouse(c.code)"></span>
			<span v-show="flag" class="imgStyleHn" @click="Warehouse('N')"></span>
			<span v-show="flagZ" class="imgStyleZa" @click="Warehouse('A')"></span>
			<span v-show="flagZ" class="imgStyleZb1" @click="Warehouse('B')"></span>
			<span v-show="flagZ" class="imgStyleZb2" @click="Warehouse('B')"></span>
			<span v-show="flagC" class="imgStyleCs" @click="Warehouse('S')"></span>
			<span v-show="flagZ" class="imgStyleZs" @click="Warehouse('S')"></span>
			<span v-show="flagZ" class="imgStyleZn" @click="Warehouse('N')"></span>
		</div>
		<div>
			<div class="exhibition">
				<p style="background: #BAFFF3;"></p>
				<span style="color: #BAFFF3;">占用</span>
			</div>
			<div class="exhibition">
				<p style="background: #EDEDF2;"></p>
				<span style="color: #EDEDF2;">闲置</span>
			</div>
			<div class="exhibition">
				<p style="background: #B2CDF8;"></p>
				<span style="color: #B2CDF8;">预入</span>
			</div>
			<div class="exhibition">
				<p style="background: #FFDD8A;"></p>
				<span style="color: #FFDD8A;">预出</span>
			</div>
		</div>
		<el-header style="height: auto; padding: 0;">
			<!-- search-group -->
			<div class="search-group clearfix">
				<!-- input 输入框 -->
				<div class="input-box">
					<label class="input-label">按区域查询:</label>
				</div>
				<div class="input-box">
					<label class="input-label">工厂</label>
					<el-select v-model="factory" placeholder="请选择工厂" disabled>
						<el-option v-for="item in factoryList" :key="item.tsFactoryId" :label="item.factoryName" :value="item.tsFactoryId">
						</el-option>
					</el-select>
				</div>
				<div class="input-box">
					<label class="input-label">仓库</label>
					<el-select v-model="tsWareHouseId" placeholder="请选择仓库" @change='tsWareHouse'>
						<el-option v-for="item in tsWareHouseList" :key="item.tsWareHouseId" :label="item.wareHouseName" :value="item.tsWareHouseId">
						</el-option>
					</el-select>
				</div>
				<div class="input-box">
					<label class="input-label">区域</label>
					<el-select v-model="regionId" placeholder="请选择区域">
						<el-option v-for="item in regionLsit" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
				<div class="input-box" style="clear: both;">
					<label class="input-label">按VIN查询:</label>
				</div>
				<div class="input-box">
					<label class="input-label">vin</label>
					<el-input placeholder="请输入vin" clearable v-model='vin'></el-input>
				</div>
				<div class="search-box">
					<div class="search-sub" @click="search"><span class="img-sub">搜索</span></div>
				</div>
			</div>
		</el-header>
		<div class="region">
			<ul v-for="o in data" style="clear: both;margin-top: 10px;">
				<li class="column" v-text="o.rowNo"></li>
				<!-- <li v-if="brevityCode != i.storageLocationNo" v-for="(i,index) in o.storageVisualizationDtoList" class="freeStyle"
				 :class="'free'+ i.status" :alt="i.storageLocationNo" :id="i.storageLocationNo" :title="i.storageLocationNo" @click="vinClick(i)">
					<p class="vinStyle" v-text="vinCode" :class="i.storageLocationNo" style="display: none;"></p>
				</li>
				<li v-if="brevityCode == i.storageLocationNo" v-for="(i,index) in o.storageVisualizationDtoList" class="freeStyleA"
				 :alt="i.storageLocationNo" :id="i.storageLocationNo" :title="i.storageLocationNo" @click="vinClick(i)">
					<span class="borderStyle">
						<p class="vinStyle" v-text="vinCode" :class="i.storageLocationNo" style="display: none;"></p>
					</span>
				</li> -->
				<li v-for="(i,index) in o.storageVisualizationDtoList" class="freeStyle" :class="'free'+ i.status" :alt="i.storageLocationNo"
				 :id="i.storageLocationNo" :title="i.storageLocationNo" @click="vinClick(i)">
					<p class="vinStyle" v-text="vinCode" :class="i.storageLocationNo" style="display: none;"></p>
					<span v-if="brevityCode == i.storageLocationNo" class="borderStyle"></span>
				</li>

			</ul>
		</div>
	</el-container>
</template>

<script>
	import {
		factoryAll,
		wareHouse,
		storageVisualization,
		queryStorageList,
		queryByStorageLocationNo
	} from "@/common/config/api/InfoInventory"
	export default {
		name: 'Rfid',
		components: {},
		data() {
			return {
				vinCode: "",
				free: 'free',
				factory: '',
				factoryList: [],
				tsWareHouseId: '6',
				tsWareHouseList: [],
				regionId: '',
				regionLsit: [],
				vin: '',
				data: [],
				brevityCode: '',
				imgStyle: 'imgStyle6',
				src: '',
				flag: true,
				flagZ: false,
				flagC: false,
			};
		},
		computed: {
			options: {
				get() {
					return this.$store.state.codeOptions.options;
				},
			}
		},
		methods: {
			vinClick(val) {
				queryByStorageLocationNo({
					"storageLocationNo": val.storageLocationNo,
					"tsWareHouseId": this.tsWareHouseId
				}).then(res => {
					var name = val.storageLocationNo//库位号
					this.vinCode = res.repData.vin
					var a = document.getElementsByClassName("vinStyle");
					for (var i = 0; i < a.length; i++) {
						a[i].style.display = 'none'
					}
					
					if (res.repData.status == 1) {
						document.getElementById(name).style.background = "#EDEDF2";
					} else if (res.repData.status == 2) {
						document.getElementById(name).style.background = "#BAFFF3";
					} else if (res.repData.status == 3) {
						document.getElementById(name).style.background = "#B2CDF8";
					} else if (res.repData.status == 4) {
						document.getElementById(name).style.background = "#FFDD8A";
					}

					var b = document.getElementsByClassName(name)
					for (var x = 0; x < b.length; x++) {
						b[x].style.display = "inline-block"
					}
				})
			},
			search() {
				this.loadData()
			},
			//仓库选择事件
			Warehouse(val) {
				this.regionId = val
				this.loadData()
			},
			//区域
			tsWareHouse(val) {
				if (val == 6 || val == 7 || val == 8) {
					this.src = require('../../common/image/index/ck-' + val + '.png')
					this.imgStyle = 'imgStyle' + val
				} else {
					this.src = ''
				}
				if (val == 6) {
					this.flag = true
					this.flagZ = false
					this.flagC = false
				} else if (val == 7) {
					this.flag = false
					this.flagC = false
					this.flagZ = true
				} else if (val == 8) {
					this.flagC = true
					this.flag = false
					this.flagZ = false
				}
				//区域
				storageVisualization({
					tsWareHouseId: val
				}).then(res => {
					this.regionId = ''
					this.regionLsit = res.repData.functionAreaList
				})
			},
			getData() {
				//工厂
				factoryAll({
					"pageNum": 1,
					"pageSize": 999
				}).then(res => {
					this.factoryList = res.repData.list
					this.factory = res.repData.list[0].tsFactoryId
					//仓库
					wareHouse({
						tsFactoryId: this.factory
					}).then(res => {
						this.tsWareHouseList = res.repData
						this.tsWareHouseId = res.repData[0].tsWareHouseId
						this.tsWareHouse(this.tsWareHouseId)
					})
				})
			},
			loadData() {
				let self = this;
				setTimeout(function() {
					//初始化加载
					queryStorageList({
						"functionAreaBrevityCode": self.regionId,
						"tsWareHouseId": self.tsWareHouseId,
						"vin": self.vin,
						"wareHouseCode": "string"
					}).then(res => {
						self.data = res.repData.storageVisualizationParentDtoList
						self.brevityCode = res.repData.currentStorageLocationNo
						if (res.repData.currentFunctionAreaBrevityCode != null) {
							self.regionId = res.repData.currentFunctionAreaBrevityCode
						}
					})
				}, 500)
			}
		},
		mounted() {

		},
		created() {
			this.getData()
			this.loadData()
		}
	};
</script>

<style scoped lang="less">
	.img {
		width: 1230px;
		height: 400px;
		text-align: center;
		position: relative;
	}

	.imgStyleF {
		position: absolute;
		width: 24px;
		top: 22px;
		left: 295px;
		height: 134px;
		cursor: pointer;
	}

	.imgStyleM {
		position: absolute;
		width: 26px;
		top: 22px;
		left: 324px;
		height: 145px;
		cursor: pointer;
	}

	.imgStyleG {
		position: absolute;
		width: 26px;
		top: 22px;
		left: 356px;
		height: 161px;
		cursor: pointer;

	}

	.imgStyleD {
		position: absolute;
		right: 280px;
		top: 66px;
		width: 146px;
		height: 93px;
		cursor: pointer;
	}

	.imgStyleHn {
		position: absolute;
		right: 434px;
		top: 70px;
		width: 46px;
		height: 89px;
	}

	.imgStyleA {
		position: absolute;
		right: 514px;
		top: 128px;
		width: 66px;
		height: 151px;
	}

	.imgStyleZa {
		position: absolute;
		right: 448px;
		top: 283px;
		width: 131px;
		height: 63px;
	}

	.imgStyleZs {
		position: absolute;
		right: 494px;
		top: 128px;
		width: 18px;
		height: 151px;
	}

	.imgStyleZn {
		position: absolute;
		left: 430px;
		top: 133px;
		width: 18px;
		height: 145px;
	}

	.imgStyleZb1 {
		position: absolute;
		right: 664px;
		top: 9px;
		width: 61px;
		height: 117px;
	}

	.imgStyleZb2 {
		position: absolute;
		right: 667px;
		top: 133px;
		width: 113px;
		height: 20px;
	}

	.imgStyleB {
		position: absolute;
		right: 589px;
		top: 158px;
		width: 190px;
		height: 120px;
	}

	.imgStyleE {
		position: absolute;
		right: 589px;
		top: 135px;
		width: 73px;
		height: 18px;
	}

	.imgStyleT {
		position: absolute;
		right: 535px;
		top: 60px;
		width: 65px;
		height: 151px;
		cursor: pointer;
	}

	.imgStyleX {
		position: absolute;
		right: 611px;
		top: 60px;
		width: 45px;
		height: 151px;
		cursor: pointer;
	}

	.imgStyleY {
		position: absolute;
		right: 611px;
		top: 224px;
		width: 60px;
		height: 43px;
		cursor: pointer;
	}

	.imgStyleCs {
		width: 39px;
		height: 70px;
		-webkit-transform: skew(30deg);
		transform: skewY(17deg);
		position: absolute;
		left: 471px;
		top: 59px;
	}

	.imgStyleP {
		width: 298px;
		height: 58px;
		-webkit-transform: skew(30deg);
		transform: skewY(13deg);
		position: absolute;
		left: 512px;
		top: 100px;
	}

	.imgStyleK {
		position: absolute;
		left: 323px;
		top: 195px;
		width: 44px;
		height: 167px;
	}

	.imgStyle6 {
		width: 689px;
		height: 400px;
	}

	.imgStyle7 {
		width: 383px;
		height: 400px;
	}

	.imgStyle8 {
		width: 598px;
		height: 400px;
	}

	.region {
		display: block;
		white-space: nowrap;
		width: 1200px;
	}

	.exhibition {
		width: 60px;
		line-height: 30px;
		float: right;
		margin-right: 5px;
	}

	.exhibition p {
		width: 20px;
		height: 20px;
		display: inline;
		float: left;
		margin-top: 5px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.column {
		width: 45px;
		line-height: 25px;
		color: #fff;
		text-align: center;
		background: #0C4AAC;
		margin: 5px;
		font-size: 12px;
		float: left;
	}

	.freeStyle {
		width: 25px;
		height: 25px;
		display: inline-block;
		margin: 5px;
		cursor: pointer;
		position: relative;
	}

	.freeStyleA {
		width: 23px;
		height: 23px;
		display: inline-block;
		margin: 5px;
		cursor: pointer;
		border: 2px dashed red;
		position: relative;
	}

	.vinStyle {
		width: 130px;
		height: 18px;
		position: absolute;
		left: -42px;
		top: -20px;
		font-size: 12px;
		text-align: center;
		line-height: 18px;
		color: #999;
		border: 1px solid #999;
	}

	.vinStyleA {
		display: inline-block !important;
	}

	.free1 {
		background: #EDEDF2;
	}

	.free2 {
		background: #BAFFF3;
	}

	.free3 {
		background: #B2CDF8;
	}

	.free4 {
		background: #FFDD8A;
	}

	.borderStyle {
		width: 29px;
		height: 29px;
		display: inline-block;
		cursor: pointer;
		border: 2px dashed red;
		position: absolute;
		top: -4px;
		left: -4px;
	}
</style>
