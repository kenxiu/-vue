<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>

        <template>
          <div v-for="(product,key) in productList" :key="key">
            <h3>{{ product.title }}</h3>
            <ul>
              <li v-for="(item,index) in product.list" :key="index">
                <a :href="item.url">{{ item.name }}</a>
                <span v-if="item.hot" class="hot-tag">HOT</span>
              </li>
            </ul>
            <div v-if="!product.last" class="hr"></div>
          </div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="(newItem,index) in newsList" :key="index">
            <a :href="newItem.url" class="new-item">{{ newItem.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
      <div class="index-board-list">
        <!-- line-last使boardList左右显示 ，以类的形式插入图片，
        'index-board-'+item.id显示boardList中的图片-->
        <div class="index-board-item" v-for="(item,index) in boardList" :key="index"
          :class="[{'line-last' : index % 2 !== 0},'index-board-'+item.id]">
          <div class="index-board-item-inner">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <a href="" class="button">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideShow from '../components/slideShow'
  export default {
    components: {
      slideShow
    },
    // 在create（）函数中通过get请求json数据后添加到页面中
    //请求模拟的json数据
    created: function () {
      this.$http.get('api/news')
        .then(res => {
          // newsList是先在页面上定义变量，用来装载请求到的数据
          this.newsList = res.data.data;
        }).catch(error => {
          console.log('error')
        })
        this.$http.get('api/products')
        .then((res)=>{
          this.productList=res.data.data;
        },(error)=>{
          console.log(error)
        }),
        this.$http.get('api/boards')
        .then((res)=>{
          this.boardList=res.data.data;
        },(error)=>{
          console.log(error)
        })
    },
    // 在页面上定义的变量，用来装载请求到的数据
    data() {
      return {
        slideSpeed: 2000,
        slides: [{
            src: require('../assets/slideShow/pic1.jpg'),
            title: 'xxx1',
            href: 'detail/analysis'
          },
          {
            src: require('../assets/slideShow/pic2.jpg'),
            title: 'xxx2',
            href: 'detail/count'
          },
          {
            src: require('../assets/slideShow/pic3.jpg'),
            title: 'xxx3',
            href: 'http://xxx.xxx.com'
          },
          {
            src: require('../assets/slideShow/pic4.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          }
        ],
        boardList: [
        ],
        newsList: [
        ],
        productList: {
        }
      }
    },

  }

</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }

  .index-right {
    float: left;
    width: 900px;
  }

  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }

  .index-left-block .hr {
    margin-bottom: 20px;
    height: 5px;
    background: #f0f2f5
  }

  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }

  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }

  .index-left-block ul {
    padding: 10px 15px;
    list-style: none;
  }

  .index-left-block li {
    padding: 5px;
  }

  .index-left-block a {
    text-decoration: none;
    color: #444;
  }

  .index-board-list {
    overflow: hidden;
  }

  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }

  .index-board-car .index-board-item-inner {
    background: url(../assets/images/1.png) no-repeat;
  }

  .index-board-loud .index-board-item-inner {
    background: url(../assets/images/2.png) no-repeat;
  }

  .index-board-earth .index-board-item-inner {
    background: url(../assets/images/3.png) no-repeat;
  }

  .index-board-mouten .index-board-item-inner {
    background: url(../assets/images/4.png) no-repeat;
  }

  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }

  .line-last {
    margin-right: 0;
  }

  .index-board-button {
    margin-top: 20px;
  }

  .button {
    background: #4fc08d;
    color: #fff;
    text-decoration: none;
    display: inline-block;
    width: 94px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  .lastest-news {
    min-height: 512px;
  }

  .hot-tag {
    background: #f54545;
    color: #fff;
  }

  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
