<template>
	<!-- 个人中心页面 -->
	<view>
		<view class="log">
			<view class="cu-avatar xl round head" @click="chooseimg()" :style="{backgroundImage: `url(${img})`}">
			</view>
			<view class="information" @click="persionInfomation">
				<table>
					<tr>
						<th>
							姓名:					
							{{studentMessage.name}}
						</th>
					</tr>
					<tr>
						<th>
							学号:
							{{studentMessage.number}}
						</th>
					</tr>
					<tr>
						<th>
							账号:
							{{studentMessage.account}}
						</th>
					</tr>
				</table>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item" @click="myLeave">
				<view class="content">
					<text class="cuIcon-community text-grey font14"></text>
					<text class="text-grey font14">
						我的留言
					</text>
				</view>
			</view>
			
			<view class="cu-item" @click="appoinmentHistory">
				<view class="content">
					<text class="cuIcon-time text-grey font14"></text>
					<text class="text-grey font14">
						预约记录
					</text>
				</view>
			</view>
			<view class="cu-item" @click="testHistory">
				<view class="content">
					<text class="cuIcon-time text-grey font14"></text>
					<text class="text-grey font14">
						测评记录
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: "http://139.196.45.104/img/rand/rand2.jpg",
				studentMessage: {
					id: "s001",
					name: "神里凌华",
					number: "3190080**",
					account: "fjdaskfj",
					password: "1234567",
					mail: "sdf"
				}
			}
		},
		onLoad() {
			uni.setStorageSync('studentMessage',this.studentMessage)
		},
		methods: {
			myLeave(){
				// 跳转我的留言
				uni.navigateTo({
					url:"./index/myLeave/myLeave"
				})
			},
			appoinmentHistory(){
				// 跳转预约记录
				uni.navigateTo({
					url:"./index/appointmentHistory/appointmentHistory"
				})
			},
			persionInfomation(){
				//跳转个人信息页面
				uni.navigateTo({
					url:"./index/personInformation/personInformation"
				})
			},
			testHistory(){
				//跳转历史测试
				uni.navigateTo({
					url:"././index/testHistory/testHistory"
				})
			},
			chooseimg() {
				// 选择临时头像
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera', 'album'], //打开相机
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res.tempFilePaths);
						that.img = res.tempFilePaths[0];

						// 问题:再次打开界面后img会被刷新
						//解决：将图片上传至服务器，在onload中请求数据
					}
				});
			}
		}
	}
</script>

<style scorped>
	.log {
		/* 最外层 */
		height: 400rpx;
		margin: 0 auto;
		text-align: center;
		background-size: cover;
		background-position: center;
		/* background-image: url("http://139.196.45.104/img/rand/rand5.jpg"); */
		background-color: #ffffff;
		display: flex;
		justify-content: left;
	}

	.head {
		margin-left: 36px;
		margin-top: 52px;
	}

	.information {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 16px;
		margin-top: 52px;
		height: 63px;
	}
	.font14{
		font-size: 14px;
	}
</style>
