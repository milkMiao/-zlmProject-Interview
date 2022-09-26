# Day14 - 词法作用域、块级作用域、作用域链、静态动态作用域



### 那些年听说的作用域

- 全局作用域
- 函数作用域
- 块作用域
- 词法作用域
- 动态作用域
- 全局作用域
- 作用域链

## 作用域

**作用域（英文：scope）是据名称来查找变量的一套规则**，可以把作用域通俗理解为一个封闭的空间，这个空间是封闭的，不会对外部产生影响，外部空间不能访问内部空间，但是内部空间可以访问将其包裹在内的外部空间。



说白了就是一门语言如果声明的变量都放在全局，程序规模小还行如果规模一大肯定就不行了。所以就会采用各种方案来确定函数的作用域。





![image-20220114233134114](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20220114233134114.png)



## 静态作用域与动态作用域

### 静态作用域(static scope) 与 词法作用域(lexical scope)

其实就是指的词法作用域，所谓静态作用域，也就是说在程序编译期通过对源代码的词法分析就可以确定某个标识符属于哪个作用域、作用域的嵌套关系（作用域链），在书写源代码时这些关系就已经确立了。

词法分析是编译中不可或缺的一环。

![image-20220114204244894](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20220114204244894.png)



```js
// 静态作用域：
var a = 10;
function fn() {
	var b = 1;
	console.log(a + b);
}

fn(); // 11
```



### 动态作用域(dynamic scope)

动态作用域是在运行时确定的，词法作用域关注函数在**何处声明**，而动态作用域关注函数从**何处调用**，其作用域链是基于运行时的调用栈的。

js语言中的变现为this 也就是上下文环境

```js
function say() {
  debugger
  console.log('我的家乡:' + this.name)
}
var china = {
  name: '中国',
  say,
  beijing :{
  	name: '北京',
  	say
}
}
setInterval(() => Math.random() > 0.5 ? china.say() : china.beijing.say() , 1000)

```

因为 this 是指向的是函数运行时所在的环境，也就是说只有到了执行时才能确定。

### 扩展

其实动态与静态的问题在每种语言中都存在，

比如：

- C++  动态联编与静态联编 - 虚函数
- Java 动态编译与动态加载



## 函数作用域 与 块级作用域

下面我们细致的说一下函数作用域和块级作用域。

对于JS这种函数式语言，函数是一等公民，甚至有人想过用函数解决所有问题。

所以我们首先说说静态作用域的基础函数作用域。

> 函数作用域：指在函数内声明的所有变量在**函数体内**始终是可见的，可以在整个函数的范围内使用及复用。

```js
var a = 'a'
function f1() {
    var b = 'b'
    function f2() {
        var c = 'c'
        function f3() {
          if(true) {
          	var d = 'd'
        	}
          console.log(a, b, c, d)
          debugger
        }
      	f3()
    }
  	f2()
}
f1()
```

### 作用域链

> ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链

![image-20220114224032095](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20220114224032095.png)

### 块级作用域

> 块作用域是一个用来对之前的最小授权原则进行扩展的工具，将代码从在函数中隐藏信息扩展为在块中隐藏信息。

为了与其他主流语言靠近，块级作用域是ES6推出了let、const实现块级作用域。

```js
var a = 'a'
function f1() {
    var b = 'b'
    function f2() {
        var c = 'c'
        function f3() {
          if(true) {
            debugger
          	let d = 'd' // var 改为 let
        	}
          debugger
          console.log(a, b, c, d)
        }
      	f3()
    }
  	f2()
}
f1()
```

上面只是将变量d改为使用let声明

![image-20220115002552157](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20220115002552157.png)

但是运行结果就发生了变化

![image-20220114233714015](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20220114233714015.png)



发生的原因就是使用var声明时，变量d的作用域在函数内。

而使用let声明时，作用域只在if代码块内。



## 面试攻略

- 这道题其实是一个基础题，没有一个人不回答。回答的关键是在描述的系统性上面。比如你硬说词法作用域和动态作用域组成了JS的作用域体系就很奇怪。不在一个维度的描述会让人觉得描述不够系统和全面。


![image-20220114233134114](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20220114233134114.png)





## 365天打卡记录

🔥 创作不易、大家帮然叔 B栈 一键三连

- [如何利用闭包完成类库封装] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=12) [ 📚 掘金文稿 ](https://juejin.cn/post/7052238635671748616) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/56)
- [谈谈闭包与即时函数的应用] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=11) [ 📚 掘金文稿 ](https://juejin.cn/post/7051968010512236574) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/55)
- [分析一下箭头语法为什么不能当做构造函数] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=7) [ 📚 掘金文稿 ](https://juejin.cn/post/7050476297318825992) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/25)
- [闭包与科里化、偏应用函数的关系] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=10) [ 📚 掘金文稿 ](https://juejin.cn/post/7051547767855906852) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/54)
- [如何用闭包制造惰性函数?] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=9) [ 📚 掘金文稿 ](https://juejin.cn/post/7051233635608821797/) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/23)
- [什么是闭包？如何产生闭包] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=8) [ 📚 掘金文稿 ](https://juejin.cn/post/7050861660000976904) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/20)
- [new 一个构造函数，如果函数返回 `return {}` 、 `return null` ， `return 1` ， `return true` 会发生什么情况？] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=6) [ 📚 掘金文稿 ](https://juejin.cn/post/7050087767962976287) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/7)
- [new 一个函数发生了什么？] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=5) [ 📚 掘金文稿 ](https://juejin.cn/post/7049731312801808420) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/6)
- [判断数据类型的方式有哪些？] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=4) [ 📚 掘金文稿 ](https://juejin.cn/post/7049383966700208165) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/5)
- [Number() 的存储空间是多大？如果后台发送了一个超过最大限制的数字怎么办?] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=3) [ 📚 掘金文稿 ](https://juejin.cn/post/7048998409067298830) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/4)
- [0.1 + 0.2 === 0.3 嘛？为什么？怎么解决？] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=2) [ 📚 掘金文稿 ](https://juejin.cn/post/7048554678858022925) [ 🐱 Github ](https://github.com/su37josephxia/frontend-interview/issues/2)
- [JS 整数是怎么表示的？] [ 📺 Billbill视频 ](https://www.bilibili.com/video/BV1gr4y1U7pY?p=1) [ 📚 掘金文稿 ](https://juejin.cn/post/7048191028280426526) [ 🐱 Github ](



