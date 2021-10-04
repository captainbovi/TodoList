const { loadavg } = require("os");

function addTodoList(e){
    // 初始化
    var ori_list={
        todoThing:'',
        done:false
    };
    // 获取输入值
    var listThing=document.getElementById('add_list').value;

    listThing =document.getElementById("add_list").value.trim();
    if(listThing === ''){
        alert("输入内容不能为空");
        return;
    }
    // 存入数据
    ori_list.todoThing = listThing;
    // 调用函数
    todolist.push(ori_list);

    saveData(todolist);
    // 初始化输入栏
    document.getElementById("add_list").value="";
    // 将输入数据添加至dom
    load();
    // 输入焦点恢复
    document.getElementById('add_list').focus="";
}
function load(){
    // 定义参数
    var todo=document.getElementById("Todo");
    var done=document.getElementById("Done");
    var todocount = document.getElementById("todocount");
    var donecount = document.getElementById("donecount");
    var todoString='';
    var doneString='';
    var todoCount = 0;
    var doneCount = 0;
    document.getElementById('add_list').focus();

    todolist =loadData();
    // 将todolist数组中的用户输入数据导入dom树中
    if(todolist != null){
        for(var i=0;i<todolist.length;i++){
            // 如果todolist中的状态为为未完成，则向todolist中增加li
            if(!todolist[i].done){
                todoString +="<li>" + "<input type='checkbox' οnchange='update("+i+", \"done\", true)'>"
                + "<p id='p-"+i+"' οnclick='edit("+i+")'>" + todolist[i].todo + "</p>" +
                "<a οnclick='remove("+i+")'>-</a>" +
                "</li>";
            }
            // 反之则在donelist中增加li
            else{
            doneString += "<li>"
            + "<input type='checkbox' "
            + "οnchange='update("+i+", \"done\", false)' checked>"
            + "<p id='p-"+i+"' οnclick='edit("+i+")'>" + todolist[i].todo + "</p>"
            + "<a οnclick='remove("+i+")'>-</a>"
            + "</li>";
            doneCount ++;
        }
        todo.innerHTML = todoString;
        done.innerHTML = doneString;
        todocount.innerHTML = todoCount;
        donecount.innerHTML = doneCount;
        }
    }
    else{
        todo.innerHTML = "";
        done.innerHTML = "";
        todocount.innerHTML = 0;
        donecount.innerHTML = 0;
    }
}
function edit(i){
    // 获取每一个p
    var p = document.getElementById("p-"+i);
    pContent = p.innerHTML;
    inputId;
}
// 保险函数
function confirm(){

    if(inputId.value.length === 0){
        p.innerHTML = pContent;
        alert("内容不得为空")
    }
}