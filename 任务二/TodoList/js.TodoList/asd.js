

// 清空本地数据
function clear(){
	localStorage.clear();
	load();
}
// 添加数据
function postaction(){
	var ToDo = document.getElementById("title");
	if(title.value == "") {
		alert("内容不能为空");
	}else{
		var data=loadData();
		var todo={
			"title":title.value,
			"done":false,
			time:0,
		};
		todo.time = new Date();
		data.push(todo);
		saveData(data);
		var form=document.getElementById("form");
		form.reset();
		load();
	}
}
// 加载数据
function loadData(){
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		return JSON.parse(collection);
	}
	else return [];
}
// 存储数据
function saveSort(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var ts=todolist.getElementsByTagName("p");
	var ds=donelist.getElementsByTagName("p");
	var data=[];
	var currentTime =new Date();
	for(i=0;i<ts.length; i++){
		var todo={"title":ts[i].innerHTML,
		"done":false,
		time:currentTime,
	};
		data.unshift(todo);
	}
	for(i=0;i<ds.length; i++){
		var todo={"title":ds[i].innerHTML,
		"done":true,
		time:currentTime,
	};
		data.unshift(todo);
	}
	saveData(data);
}
//将js转化为JSON形式
function saveData(data){
	localStorage.setItem("todo",JSON.stringify(data));
}
// 删除
function remove(i){
	var data=loadData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	load();
}

function update(i,field,value){
	var data = loadData();
	var todo = data.splice(i,1)[0];
	todo[field] = value;
	data.splice(i,0,todo);
	saveData(data);
	load();
}
// 输入框
function edit(i)
{
	load();
	var p = document.getElementById("p-"+i);
	title = p.innerHTML;
	p.innerHTML="<input id='input-"+i+"' value='"+title+"' />";
	var input = document.getElementById("input-"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	input.onblur =function(){
		if(input.value.length == 0){
			p.innerHTML = title;
			alert("内容不能为空");
		}
		else{
			update(i,"title",input.value);
		}
	};
}
// 加载数据并且生成P
function load(){
	var todolist=document.getElementById("todolist");
	var donelist=document.getElementById("donelist");
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		var data=JSON.parse(collection);
		var todoCount=0;
		var doneCount=0;
		var todoString="";
		var doneString="";
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				doneString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",false)' checked='checked' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				doneCount++;
				console.log(data[i].time);
			}
			else{
				todoString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",true)' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+" 时间： "+data[i].time+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				todoCount++;
				console.log(data[i].time);
			}
		};
		todocount.innerHTML=todoCount;
		todolist.innerHTML=todoString;
		donecount.innerHTML=doneCount;
		donelist.innerHTML=doneString;
	}
	else{
		todocount.innerHTML=0;
		todolist.innerHTML="";
		donecount.innerHTML=0;
		donelist.innerHTML="";
	}

	var lis=todolist.querySelectorAll('ol li');
	[].forEach.call(lis, function(li) {
		li.addEventListener('dragstart', handleDragStart, false);
		li.addEventListener('dragover', handleDragOver, false);
		li.addEventListener('drop', handleDrop, false);

		onmouseout =function(){
			saveSort();
		};
	});		
}
  function sortByDTime(){
 	var collection=localStorage.getItem("todo");
 	var data=JSON.parse(collection);
	if(collection == null)alert("请输入后再排序")

  }
  function sortByITime(){
 	var collection=localStorage.getItem("todo");
 	var data=JSON.parse(collection);
 	var date =0;
	var i=data.length-1;
 	if(collection == null)alert("请输入后再排序")
  }
window.onload=load;

window.addEventListener("storage",load,false);

var dragSrcEl = null;
function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
document.getElementById("clearButton").onclick = clear;
function sunMod(){
	var body = document.body;
	body.style.backgroundColor = "white";
	var header =document.querySelector("header");
	header.style.backgroundColor = "#2693F8"
	// console.log(1);
}
function nightMode(){
	var body = document.body;
	body.style.backgroundColor = "grey";
	var header =document.querySelector("header");
	header.style.backgroundColor = "black"
}
// 绑定按钮事件
document.getElementById("sunMod").onclick =sunMod;
document.getElementById("nightMod").onclick =nightMode;
document.getElementById("sortByITime").onclick=sortByITime;
document.getElementById("sortByDTime").onclick=sortByDTime;

