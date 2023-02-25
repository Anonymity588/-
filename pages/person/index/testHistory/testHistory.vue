<template>
	<view>
<!-- 		<view class="returnArea" @click="returnBack">
			<view class="returnBTside"></view>
			<view class="returnBt cuIcon-back_android"></view>
			<view class="returnBTside"></view>
		</view> -->
		<view v-for="(item, index) in appoiment">
			<uni-collapse>
				<uni-collapse-item :title="`问卷名称：`+item.question">
					<view class="content">
						得分：{{item.score}}
					</view>
					<view class="content">
						结果分析：{{item.result}}
					</view>
				</uni-collapse-item>
			</uni-collapse>
			
			<!-- 测试记录查询 -->
			<!-- <view class="cu-list menu sm-border card-menu margin-top">
				
				<view class="cu-item" >
					<view class="content">
						<text class="cuIcon-community text-grey font14"></text>
						<text class="text-grey font14">
							问卷名称↓
						</text>
						<view class="text-grey font14">
							{{item.question}}
						</view>
					</view>
					<view class="content">
						<text class="cuIcon-community text-grey font14"></text>
						<text class="text-grey font14">
							得分↓text
						</text>
						<view class="text-grey font14">
							{{item.score}}分
						</view>
					</view>
					<view class="content">
						<text class="cuIcon-community text-grey font14"></text>
						<text class="text-grey font14">
							结果分析↓
						</text>
						<view class="text-grey font14">
							{{item.result}}
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuID:"",
				appoiment:[]
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'studentMessage',
				success: res => {
					this.stuID = res.data.id
					console.log(res.data.id)
					//请求数据
					uni.request({
					    url: 'http://139.196.45.104:9001/getRecord',
					    data: {
					       id: this.stuID
					    },
					    header: {
					        'custom-header': 'hello'
					    },
					    success: (res) => {
							console.log(this.stuID)
							console.log("sadrfdsaf----------")
							this.appoiment=res.data.data
							console.log(this.appoiment);
					    }
					});
				}
			})
			
			
		},
		methods: {
			returnBack(){
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
</style>
