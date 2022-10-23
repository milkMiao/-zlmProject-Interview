//1、手写函数防抖
//概念：是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
//使用场景：这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
function debounce(fn, wait){
    var timer=null;

    return function(){
        var content = this, args=arguments;

        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(()=>{
            fn.apply(content, args);
        },wait)
    }
}

//2、手写函数节流
//概念：是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
//使用场景：节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。
function throttle(fn, delay){
    var perTime = Date.now();

    return function(){
        var content=this, args=arguments, nowTime=Date.now();
        if(nowTime - perTime >= delay){
            perTime = Date.now();
            return fn.apply(content, args);
        }
    }
}

