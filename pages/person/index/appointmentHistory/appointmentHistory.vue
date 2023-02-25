<template>
	<view>
<!-- 		<view class="returnArea" @click="returnBack">
			<view class="returnBTside"></view>
			<view class="returnBt cuIcon-back_android"></view>
			<view class="returnBTside"></view>
		</view> -->
		<view v-for="(item, index) in appoiment">
			<uni-collapse>
				<uni-collapse-item :title="`教师：`+item.teacherName">
					<view class="content">
						时间：{{item.time}}
					</view>
					<view class="content">
						教师邮箱：{{item.teacherEmail}}
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuID: "",
				appoiment: []
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'studentMessage',
				success: res => {
					this.stuMessage = res.data.id
					console.log(this.stuMessage)
				}
			})
			//请求数据
			uni.request({
				url: 'http://139.196.45.104:9001/studentGetAppointment',
				header: {
					'custom-header': 'hello'
				},
				data: {
					sid: "s001"
				},
				success: (res) => {
					console.log(res.data.data);
					this.appoiment = res.data.data
					for (let i = 0; i < this.appoiment.length; i++) {
						if (this.appoiment[i].time == "时间段1") {
							this.appoiment[i].time = "8:00~9:40"
						} else if (this.appoiment[i].time == "时间段2") {
							this.appoiment[i].time = "10:00~11:40"
						} else if (this.appoiment[i].time == "时间段3") {
							this.appoiment[i].time = "14:00~15:40"
						} else if (this.appoiment[i].time == "时间段4") {
							this.appoiment[i].time = "16:00~17:40"
						}
					}
				},
				fail: (res) => {
					console.log(res)
				}
			});
		},
		methods: {
			returnBack() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style scorped>
	.returnArea {
		width: 100%;
		height: 28px;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}

	.returnBTside {
		width: 26px;
		background-color: #ffffff;
		border-radius: 100%;
	}

	.returnBt {
		text-align: center;
		background-color: #ffffff;
		/* border-radius: 8px; */
		width: 26px;
		margin-right: -13px;
		margin-left: -13px;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
	}

	.font14 {
		font-size: 14px;
	}
</style>
