//存取localStorage中的数据
var store = {
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
     return JSON.parse(window.localStorage.getItem(key))||[];
    }
}
//list取出所有的值
var list = store.fetch("storeData");
 
var vm = new Vue({
    el:".main",
    data:{
        list,
        todo:'',
        edtorTodos:'',//记录正在编辑的数据,
        beforeTitle:"",//记录正在编辑的数据的title
        visibility:"all",//通过这个属性值的变化对数据进行筛选
    },
    watch:{
      list:function(){//监控list这个属性，当这个属性对应的值发生变化就会执行函数
          store.save("storeData",this.list);
      }
    },
    methods:{
        enterFn(ev){//添加任务
            //向list中添加一项任务
            if(this.todo==""){return;}
            var currentTime = new Date();
            var timeNumber = Date.parse(currentTime);
                this.list.push({
                    title:this.todo,
                    isComplete:false,
                    time:currentTime,
                    timeCount:timeNumber
                });
                this.todo = "";
        },
        delFn(item){//删除任务
            var index = this.list.indexOf(item);
            this.list.splice(index,1)
        },
        edtorTodo(item){//编辑任务
            //编辑任务的时候记录编辑之前的值
            this.beforeTitle = item.title;
            this.edtorTodos = item;
        },
        edtoEnd(item){//编辑完成
            this.edtorTodos="";
        },
        cancelEdit(item){//取消编辑
            item.title = this.beforeTitle;
            this.beforeTitle = '';
            this.edtorTodos='';
        },
        sortByITime(){
            this.list.sort((a,b)=>{
                return a.timeCount<b.timeCount;
            })
        },
        sortByDTime(){
            this.list.reverse();
        },
    },
     directives:{
         "focus":{
             update(el,binding){
                 if(binding.value){
                     el.focus();
                 }
             }
         }
     },
    mounted(){
        window.onbeforeunload = function(e){
            var storage = window.localStorage;
            storage.clear();
        }
    },
    computed:{
        unComplete(){
        return  this.list.filter(item=>{
                return !item.isComplete
            }).length
        },
        filterData(){
            //过滤的时候有三种情况 all completed unCompleted
            var filter = {
                all:function(list){
                    return list;
                },
                completed:function(list){
                    return list.filter(item=>{
                        return item.isComplete;
                    })
                },
                unCompleted:function(list){
                    return list.filter(item=>{
                        return !item.isComplete;
                    })
                }
            }
            //如果找到了过滤函数，就返回过滤后的数据，如果没有找到就返回所有的数据
            return filter[this.visibility]?filter[this.visibility](list):list;
        }
 
    }
});
function sunMod(){
	var body = document.body;
	body.style.backgroundColor = "white";
	// console.log(1);
}
function nightMode(){
	var body = document.body;
	body.style.backgroundColor = "grey";
}
 function hashFn(){
     var hash = window.location.hash.slice(1);
     vm.visibility = hash;
 }
 hashFn();
 window.addEventListener('hashchange',hashFn);
document.getElementById("sunMod").onclick =sunMod;
document.getElementById("nightMod").onclick =nightMode;