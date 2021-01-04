<template>
  <div>
     <myhead></myhead>

<div class="joinBanner">
	<h2>荣装网城市加盟</h2>
	<div class="bannerText">
		通过股权置换实现荣装网与战略伙伴之间的交叉持股，以建立利益关联、优势互补<br />
		成为联合创展合伙人，大数据引流，共同推动企业上市
	</div>
	<a class="bannerBtn">申请加盟 13305780988  朱总</a>
</div>
<div class="about-course">
	<div class="wrap">
		<div class="rwz-about">
			<h3>荣装网-更高端的互联网家装</h3>
			<p class="rwz-about-text">
				荣装网是由联合创展股份投资的泛家装生态聚合平台，用心缔造、悉心感知德系互联网家装标准践行者荣装网致力于用互联网思维及技术改造传统家装行业，去掉层层中间环节打通装修最短路径，实现消费者利益的最大化作为传统家装的改革者和革命者以新型互联网家装公司的理念，成长迅猛荣装网通过战略资源整合，打造极致化互联网家装产品致力于成为家装行业的“苹果”真正以产品和服务赢得市场让有保障的高品质装修不再高不可攀......
			</p>
			 <embed  style="margin-top:-20px;" src="https://www.rongzw.com/sp/sp.mp4" width="680px"  height="459px" />
		</div>
		<div class="rwz-course"></div>
	</div>
</div>
<div class="patternWrap">
	<div class="pattern"></div>
	<p class="patternText">
	    传统的经销和分销体系链条过长，从而导致了经销、分销体系存在利益链的不健康问题，各种灰色利益链滋生、蔓延。荣装网通过O2O模式，打通中间的最短路径，将优质的主辅材送到用户家中。荣装网城市品牌服务商可以通过荣装网的资源整合优势，拿到最具竞争力的产品没实现共享经济模型。城市品牌服务商，可以通过荣装网大型营销活动平台，形成全国联动。
	</p>
</div>
<div class="joinBox joinProcess">
	<div class="wrap">
		<h3>加入流程</h3>
		<div class="joinSubtitle">荣装网对于战略伙伴加入具有严格完备的流程制度</div>
		<div class="flowChart"></div>
		<dl class="flowText">
			<dt>加盟方式</dt>
			<dd>股权置换     通过股权置换实现荣装网与战略伙伴之间的交叉持股，以建立利益关联、优势互补。</dd>
			<dt>股权置换</dt>
			<dd>通过股权置换实现荣装网与战略伙伴之间的交叉持股，以建立利益关联、优势互补。荣装网通过股权置换的加盟形式，而非现金加盟费用，目的是引入战略合作伙伴，平台与加盟商荣辱与共，以期达到资源互补和共享，并最终形成在行业竞争中的优势。</dd>
		</dl>
	</div>
</div>
<div class="joinBox entryCriteria">
	<div class="wrap">
		<h3>准入条件</h3>
		<div class="joinSubtitle">荣装网对于战略伙伴的选择十分审慎，伙伴合伙人是我们的利益共同体</div>
	</div>
</div>
<div class="joinBox invites">
	<h3>荣装网诚招城市合伙人</h3>
	<div class="joinSubtitle">成为联合创展合伙人，大数据引流，共同推动企业上市</div>
	<div class="invitesText">
		有情怀、有梦想、有资源、有实力、有ALLIN的状态、有保障施工品牌的施工队伍。能接受新的文化和理念、能跟上互联网快速发展的速度、能组建一直“打硬战”的团队。我们需要有共同价值理念的同路人。
	</div>
	<p class="invitesBtn">联系电话：13305780988  朱总</p>


</div>
     <myfooter></myfooter>
  </div>
</template>

<script>
  import myhead from '@/components/myhead'
  import myfooter from '@/components/myfooter'
  export default {
      name: "merchants",
      data() {
        return {}
        },
        components: {
          myhead,
          myfooter
        },
      }
</script>

<style lang="less">
  .joinBanner { padding-top: 150px; height: 360px; background: url("~@/assets/img/join/banner.jpg") no-repeat; text-align: center; color: #fff;
  	h2 { margin-bottom: 25px; font-size: 48px;}
  	.bannerText { margin-bottom:50px; font-size:18px; font-weight: 300; line-height: 1.8;}
  	.bannerBtn { padding:10px 30px; background:#c5151b; color:#fff; font-size: 16px; border-radius: 5px;}
  }
  .about-course { height:1444px; background: url("~@/assets/img/join/bg.jpg") no-repeat;
  	.rwz-about { margin:0 0 155px 0; padding: 50px 120px; background:#fff; text-align:center;
  		h3 { margin-bottom:20px; font-size:28px; font-weight:700;}
  		.rwz-about-text { margin-bottom:50px; text-align:left; font-size:14px; text-indent: 28px; line-height:1.6;}
  	}
  	.rwz-course { height:440px; background: url("~@/assets/img/join/course.png") no-repeat;}
  }
  .patternWrap {
  	.pattern { height:592px; background: url("~@/assets/img/join/pattern.jpg") no-repeat center top;}
  	.patternText { margin:30px auto 50px auto; width:1200px; font-size: 16px; text-indent:32px; line-height:1.6; text-align:center;}
  }
  .joinBox {
  	h3 { padding:70px 0 25px 0; font-size:32px; font-weight:700; text-align:center;}
  	.joinSubtitle { font-size: 14px; font-weight:700; line-height:1.6; text-align:center;}
  }
  .joinProcess { background:#f5f5f5;
  	.flowChart { margin:60px 0 80px 0; height:257px; background: url("~@/assets/img/join/flowChart.png") no-repeat center top;}
  	.flowText { margin-bottom:100px;
  		dt { font-weight:700; font-size:18px;}
  		dd { margin-bottom: 20px; font-size:16px; line-height:1.6;}
  	}
  }
  .entryCriteria { height:432px; background: url("~@/assets/img/join/entryCriteria.jpg") no-repeat center top;
  	h3 { color:#fff;}
  	.joinSubtitle { color:#fff;}
  }
  .invites { margin:0 auto; padding:60px 0 100px 0; width:860px; text-align:center;
  	.invitesText { margin-top:30px; font-size:18px; text-indent:36px; font-weight:700; line-height:1.8;}
  	.invitesBtn { margin:30px auto 0 auto; padding:20px 50px; width:450px; text-align: center; background:#395fae; color:#fff; font-size: 18px; font-weight:700; border-radius: 5px;}
  }
  .joinForm { margin-top:100px;
  	input[type=submit] { padding:10px 30px; background:#c5151b; color:#fff; font-size: 16px; font-weight:700; border: none;}
  }

</style>
