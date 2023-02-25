<template>
	<view>
<!-- 		<view class="returnArea" @click="returnback">
			<view class="returnBt cuIcon-back">
				
			</view>			
		</view> -->
		<!-- 标题 -->
		<view class="titlearea">
			{{atitle}}
		</view>
		<!-- 简介 -->
		<view class="introduction">
			{{introduction}}
		</view>
		<view style="margin-top: 8px;"></view>
		<!-- 题目 -->
		<view v-for="(item, index) in article" class="timuwhole">
			<radio-group>
				<view class="subjectClass" style="margin-bottom: 4px;">
					第{{index+1}}题、{{item.subject}}
				</view>
				<view class="optionwholeclass">					
						<view class="optionclass"  @click="getAnswer(1,index)">
							<radio value="A" style="transform:scale(0.6)"/>A.{{item.option1}}
						</view>
						<view class="optionclass"  @click="getAnswer(2,index)">
							<radio value="B" style="transform:scale(0.6)"/>B.{{item.option2}}
						</view>
						<view class="optionclass"  @click="getAnswer(3,index)">
							<radio value="C" style="transform:scale(0.6)"/>C.{{item.option3}}
						</view>
						<view class="optionclass"  @click="getAnswer(4,index)">
							<radio value="D" style="transform:scale(0.6)"/>D.{{item.option4}}
						</view>					
				</view>
			</radio-group>
		</view>
		<button type="primary" style="width: 60%;margin-top: 16px;" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				answerarr:[], //选择的答案数组
				articleID:"",//文章ID
				atitle:"个人评价问卷",
				introduction:"",
				article:[],
				result:["未知错误无结果","20分"],//试卷结果分析

			}
		},
		onLoad: function (option) {
			//获取文章ID
			this.articleID=option.id
			this.atitle=option.title
			let aid=this.articleID
			console.log("aid"+aid)
			// http://139.196.45.104:9001/getQuestion
			//获取问卷简介
			uni.request({
			    url: 'http://139.196.45.104:9001/getQuestion',
			    data: {
			       id:aid
			    },
			    header: {
			        'custom-header': 'hello' //自定义请求头信息
			    },
			    success: (res) => {
					console.log(res.data)
				  this.introduction=res.data.data[0].toast
			    }
			});
			//获取选项
			uni.request({
			    url: 'http://139.196.45.104:9001/getOption',
			    data: {
			       id:aid
			    },
			    header: {
			        'custom-header': 'hello' //自定义请求头信息
			    },
			    success: (res) => {
					console.log(res.data.data)
					this.article=res.data.data
			    }
			});
		},
		methods: {		
			test(){
				
			},
			// returnback(){
			// 	//返回主页面
			// 	uni.navigateBack({	
			// 	})
			// },
			submit(){
				let aid=this.articleID
				//提交答案
				console.log(this.answerarr)
				uni.request({
				    url: 'http://139.196.45.104:9001/getResult', //仅为示例，并非真实接口地址。
					// url: 'http://139.196.45.104:9001/getResult?answer='+this.answerarr+"&sid=s001&id="+
					// aid, 
				    data: {
						id:aid,
						sid:"s001",
						answer: this.answerarr
				    },
					method:"POST",
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);
						this.result=res.data.split(";")
						this.result[0]="结果"+this.result[0]+"  "
						this.result[1]="得分"+this.result[1]+"分"
						uni.showModal({
							title: '试卷分析',
							content: this.result[0]+this.result[1],
							cancelText:"复制",
							success:  (res)=> {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击复制');
									uni.setClipboardData({
										data: this.result[0]+this.result[1],
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
				});				
			},
			getAnswer(e,index){
				console.log(e)
				console.log(index)
				console.log(typeof(index))
				if(e==1){
					//A
					this.answerarr[index]="A"
				}else if(e==2){
					this.answerarr[index]="B"
				}else if(e==3){
					this.answerarr[index]="C"
				}else if(e==4){
					this.answerarr[index]="D"
				}
			}
			
		}
	}
</script>

<style scorped>
	.returnArea{
		width: 100%;
		height: 28px;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}
	.returnBt{
		text-align: center;
		background-color: #ffffff;
		border-radius: 16px;
		width: 40px;
		margin-left: 16px;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.titlearea{
		width: 100%;
		font-size: 18px;
		text-align: center;
	}
	.introduction{
		font-size: 14px;
		text-indent: 32px;
	}
	
	.optionwholeclass{
		/* 题目选项 */
		display: flex;
		flex-direction: row;
		
	}
	.subjectClass{
		/* 题目的问题 */
		text-indent: 16px;
		width: 100%;
		font-size: 12px;
	}
	.timuwhole{
		/* 整体题目 */
		
		width: 100%;
	/* 	height: 60px; */
		display: flex;
		flex-direction: column;
	}
	.optionclass{
		/* 具体选项 */
		width: 25%;
		font-size: 12px;
	}
</style>
