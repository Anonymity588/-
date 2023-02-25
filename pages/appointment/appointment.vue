<template>
	<!-- 留言预约页面 -->
	<view>
		<view class="leave" v-for="(item,index) in teacher">
			<uni-collapse>
				<uni-collapse-item :title="`教师：`+item.teacherName">
					<view class="leaveBTout">
						<view class="leaveBT" @click="showLeave">
							点击留言
						</view>
					</view>
					<view class="timewhole">
						<view class="time">
							8:00~9:40
						</view>
						<view class="timeBTclass">
							<button :class="btClass[index].item1" @click="reserve1(index)" :key="item.index">
								{{reserveType[index].item1}}
							</button>
						</view>
					</view>
					<view class="timewhole">
						<view class="time">
							10:00~11:40
						</view>
						<view class="timeBTclass">
							<button :class="btClass[index].item2" @click="reserve2(index)" :key="item.index">
								{{reserveType[index].item2}}
							</button>
						</view>
					</view>
					<view class="timewhole">
						<view class="time">
							14:00~15:40
						</view>
						<view class="timeBTclass">
							<button :class="btClass[index].item3" @click="reserve3(index)" :key="item.index">
								{{reserveType[index].item3}}
							</button>
						</view>
					</view>
					<view class="timewhole">
						<view class="time">
							16:00~17:40
						</view>
						<view class="timeBTclass">
							<button :class="btClass[index].item4" @click="reserve4(index)" :key="item.index">
								{{reserveType[index].item4}}
							</button>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>

	</view>
	<!-- 	<view class="title">留言框:</view>
	<textarea maxlength="50" placeholder="给该教师留言" v-model:value="leaveMessage" 
	@input="getLeave" ></textarea> -->
</template>

<script>
	export default {
		data() {
			return {
				btClass: [],
				leaveMessage: "",
				reserveType: [],
				tel: "910",
				teacher: [],
				leave: {
					sid: "s001",
					tid: "t001",
					time: "",
					content: ""
				},
				
			
			}
		},
		onLoad() {
			uni.request({
				url: 'http://139.196.45.104:9001/getAllTime',
				data: {
					sid: "s001"
				},
				header: {
					'custom-header': 'hello'
				},
				success: (res) => {				
					console.log(res.data.data)
					this.teacher = res.data.data
					for(let i=0;i<this.teacher.length;i++){
						let tempItem1={
							item1: "cu-btn bg-grey shadow timeBT cuIcon-info",
							item2: "cu-btn bg-grey shadow timeBT cuIcon-info",
							item3: "cu-btn bg-grey shadow timeBT cuIcon-info",
							item4: "cu-btn bg-grey shadow timeBT cuIcon-info"
						}	
						let tempItem2={
							item1:"可预约",
							item2:"可预约",
							item3:"可预约",
							item4:"可预约"
						}
						this.btClass.push(tempItem1)
						this.reserveType.push(tempItem2)
					}
					for (let i = 0; i < this.teacher.length; i++) {
						if (this.teacher[i].time1 == "false") {
							this.btClass[i].item1 = "cu-btn bg-red shadow timeBT cuIcon-roundclose"
							this.reserveType[i].item1 = "不可预约"
						}
						if (this.teacher[i].time2 == "false") {
							this.btClass[i].item2 = "cu-btn bg-red shadow timeBT cuIcon-roundclose"
							this.reserveType[i].item2 = "不可预约"
						}
						if (this.teacher[i].time3 == "false") {
							this.btClass[i].item3 = "cu-btn bg-red shadow timeBT cuIcon-roundclose"
							this.reserveType[i].item3 = "不可预约"
						}
						if (this.teacher[i].time4 == "false") {
							this.btClass[i].item4 = "cu-btn bg-red shadow timeBT cuIcon-roundclose"
							this.reserveType[i].item4 = "不可预约"
						}
					}
				},
				fail: (res) => {
					console.log(res)
				}
			});
		},
		methods: {
			reserve1(index) {
				console.log(index)
				if (this.reserveType[index].item1 == "可预约") {
					uni.request({
						url: 'http://139.196.45.104:9001/updateAppoint',
						data: {
							sid: "s001",
							tid: this.teacher[index].id,
							time: "时间段1"
						},
						success: (res) => {
							console.log(res.data);
							console.log("asdfdsaf",this.teacher[index].id)
							this.btClass[index].item1 = "cu-btn bg-green shadow timeBT cuIcon-roundcheck"
							this.reserveType[index].item1 = "已预约"
							//预约成功
							let phone = this.teacher[index].teacherMail
							this.reserveSuccess(phone)
						},
						fail: (res) => {
							console.log(res)
						}
					});
					//此处写接口
				} else if (this.reserveType[index].item1 == "已预约") {
					uni.showToast({
						title: '时间段已预约',
						duration: 1600,
						icon: "error"
					});
				} else {
					uni.showToast({
						title: '时间段不可预约',
						duration: 1600,
						icon: "error"
					});
				}
			},
			reserve2(index) {
				if (this.reserveType[index].item2 == "可预约") {
					uni.request({
						url: 'http://139.196.45.104:9001/updateAppoint',
						data: {
							sid: "s001",
							tid: this.teacher[index].id,
							time: "时间段2"
						},
						success: (res) => {
							console.log(res.data);
							this.btClass[index].item2 = "cu-btn bg-green shadow timeBT cuIcon-roundcheck"
							this.reserveType[index].item2 = "已预约"
							//预约成功
							let phone = this.teacher[index].teacherMail
							this.reserveSuccess(phone)
						},
						fail: (res) => {
							console.log(res)
						}
					});
				} else if (this.reserveType[index].item2 == "已预约") {
					uni.showToast({
						title: '时间段已预约',
						duration: 1600,
						icon: "error"
					});
				} else {
					uni.showToast({
						title: '时间段不可预约',
						duration: 1600,
						icon: "error"
					});
				}

			},
			reserve3(index) {
				if (this.reserveType[index].item3 == "可预约") {
					uni.request({
						url: 'http://139.196.45.104:9001/updateAppoint',
						data: {
							sid: "s001",
							tid: this.teacher[index].id,
							time: "时间段3"
						},
						success: (res) => {
							console.log(res.data);
							this.btClass[index].item3 = "cu-btn bg-green shadow timeBT cuIcon-roundcheck"
							this.reserveType[index].item3 = "已预约"
							//预约成功
							let phone = this.teacher[index].teacherMail
							this.reserveSuccess(phone)
						},
						fail: (res) => {
							console.log(res)
						}
					});
				} else if (this.reserveType[index].item3 == "已预约") {
					uni.showToast({
						title: '时间段已预约',
						duration: 1600,
						icon: "error"
					});
				} else {
					uni.showToast({
						title: '时间段不可预约',
						duration: 1600,
						icon: "error"
					});
				}
			},
			reserve4(index) {
				if (this.reserveType[index].item4 == "可预约") {
					uni.request({
						url: 'http://139.196.45.104:9001/updateAppoint',
						data: {
							sid: "s001",
							tid: this.teacher[index].id,
							time: "时间段4"
						},
						success: (res) => {
							console.log(res.data);
							this.btClass[index].item4 = "cu-btn bg-green shadow timeBT cuIcon-roundcheck"
							this.reserveType[index].item4 = "已预约"
							//预约成功
							let phone = this.teacher[index].teacherMail
							this.reserveSuccess(phone)
						},
						fail: (res) => {
							console.log(res)
						}
					});
					//此处写接口
				} else if (this.reserveType[index].item4 == "已预约") {
					uni.showToast({
						title: '时间段已预约',
						duration: 1600,
						icon: "error"
					});
				} else {
					uni.showToast({
						title: '时间段不可预约',
						duration: 1600,
						icon: "error"
					});
				}
			},
			showLeave() {
				// 展示留言框
				this.leave.time = (new Date()).valueOf();
				uni.showModal({
					title: '留言',
					editable: true,
					placeholderText: '给该辅导老师留言',
					confirmText: '提交',
					success: (res) => {
						console.log(res)
						if (res.confirm) {
							console.log('用户点击确定');
							this.leave.time = (new Date()).valueOf();
							this.leave.content = res.content
							if(res.content==""){
								uni.showToast({
									title: '留言不能为空！',
									duration: 1600,
									icon: "erro"
								});
							}else{
								uni.request({
									url: 'http://139.196.45.104:9001/addLeave',
									method: "POST",
									data: {
										leave: this.leave
									},
									success: (res) => {
										console.log(res.data);
										uni.showToast({
											title: '留言成功',
											duration: 1600,
											icon: "success"
										});
									},
									fail: (res) => {
										console.log(res)
									}
								});
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			judgestatement(time) {
				if (time == true) {
					return true;
				} else {
					return false;
				}
			},
			reserveSuccess(phone) {
				uni.showModal({
					title: '预约成功！',
					content: "联系方式：" + phone,
					cancelText: "点击复制",
					confirmText: '确定',
					success: function(res) {
						console.log(res)
						if (res.confirm) {} else if (res.cancel) {
							console.log('用户点击取消');
							uni.setClipboardData({
								data: phone,
								success: () => {
									console.log('success');
									uni.showToast({
										title: '已复制到剪切板',
										duration: 2000
									});
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style scorped>
	.leave {
		/* 每个折叠面板的盒子 */
	}

	.leaveBTout {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eaf1fa;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
		margin-bottom: 2px;
	}

	.leaveBT {
		/* 留言按钮 */
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60%;
		height: 96rpx;
		font-size: 14px;

	}

	.leaveinput {
		/* 留言输入框 */
		text-align: center;
		width: 98%;
		margin-left: 1%;
		border: 1px solid;
	}

	.timewhole {
		font-size: 14px;
		margin-bottom: 2px;
		display: flex;
		flex-direction: row;
	}

	.time {
		width: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.timeBTclass {
		width: 30%;
	}

	.timeBT {
		height: 28px;
		width: 100%;

	}
</style>
