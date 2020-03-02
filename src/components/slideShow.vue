<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <!-- transition设置移入移出动画， v-if控制图片显示-->
        <transition name="slide-trans">
          <!-- 隐藏到显示 -->
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <!-- 显示到隐藏 -->
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item,index) in slides" :key="index" @click="goto(index)">
        <a :class="{on: index===nowIndex}">{{ index + 1}}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    // 幻灯片切换速度
    inv: {
      type:Number,
      default:1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true  //每一次图片更换的时候切换isShow
    }
  },
  // 计算属性实现前后分页
  computed: {
    prevIndex () {
      if(this.nowIndex===0){
        // 共4张图片，slides[0]~slides[3],slides.length=4
        // 若当前图片为第一张，那前一页则为最后一张图片，即slides[4]
        return this.slides.length-1
      }
      else{
        return this.nowIndex-1
      }
    },
    nextIndex(){
      if(this.nowIndex===this.slides.length-1){
        return 0
      }
      else{
        return this.nowIndex+1
      }
    }
  },
  methods: {
    goto (index) {
      // 为了触发动画效果，先将isShow设为false
      this.isShow = false
      setTimeout(() => {
        this.isShow = true  //10毫秒后再将isShow设为true
        this.nowIndex = index  //使页码对应每一张幻灯片
      }, 10);
    },
    runInv() {
      // 通过setInterval实现自动切换
      this.invId=setInterval(() => {
        // console.log(123)//测试是否会一秒记一次
      this.goto(this.nextIndex)
      },this.inv)
    },
    // 使用户点击幻灯片更加方便，添加鼠标进入和移出事件
    clearInv () {
      clearInterval(this.invId)
    }
  },
  // 手动运行runInv()函数
  mounted () {
    this.runInv()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*所有属性0.5秒动态演变*/
/* 关于幻灯片进入的动画，0.5秒动态演变一次 */
.slide-trans-enter-active {
  transition: all .5s;
}
/*向右侧偏移900*/
.slide-trans-enter {
  transform: translateX(900px);
}
/* 关于幻灯片离开的动画，0.5秒动态演变一次 ，向左侧偏移900*/
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 20px 15px 15px 0;
  width: 900px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  margin: 0;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  text-indent: 15px;
}
.slide-img {
  width: 100%;
  height: 500px;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 3px;
  right: 15px;
  margin: 0;
}
.slide-pages li {
  display: inline-block;
  color: #fff;
  margin: 0 8px;
  cursor: pointer;
  width: 10px;
}
.slide-pages li .on{
  text-decoration: underline;
}
</style>
