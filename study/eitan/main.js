if (window.innerWidth>window.innerHeight){
  window.alert('縦持ち推奨')
}

var default_range=[101,200]
var ques_lst=[]
var ans_lst=[]
var start_num=default_range[0]
start.addEventListener('click',()=>{
  sub.style.opacity="0"
  let v=range.value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 65248)})
  let rng=v.split('-')
  if (mode.value=="1"){
    if(rng[1]){
      ques_lst=english_lst.slice(Number(rng[0]-1),Number(rng[1]))
      ans_lst=japanese_lst.slice(Number(rng[0]-1),Number(rng[1]))
      start_num=Number(rng[0])
    }else{
      ques_lst=english_lst.slice(default_range[0]-1,default_range[1])
      ans_lst=japanese_lst.slice(default_range[0]-1,default_range[1])
    }
  }else if(mode.value=="2"){
    if(rng[1]){
      ques_lst=japanese_lst.slice(Number(rng[0]-1),Number(rng[1]))
      ans_lst=english_lst.slice(Number(rng[0]-1),Number(rng[1]))
      start_num=Number(rng[0])
    }else{
      ques_lst=japanese_lst.slice(Number(default_range[0]-1),Number(default_range[1]))
      ans_lst=english_lst.slice(Number(default_range[0]-1),Number(default_range[1]))
    }
  }else{
    window.alert('error:01')
  }
  switch (background.value) {
    case "1":
      elm=document.createElement('img')
      elm.classList.add("activator")
      random=Math.floor(Math.random()*19)+1//0から19
      elm.setAttribute('src','img/b'+random+".png");
      background_div.append(elm)
      break;
    case "2":
      elm=document.createElement('div')
      elm.classList.add("activator",['red','blue','green','purple','pink','yellow','orange','indigo'][Math.floor(Math.random()*8)])
      elm.style="width:100%;height:150px"
      background_div.append(elm)
      break;
    default:
      window.alert('error:02')
  }
  ques.innerText = ques_lst[0]
  re_ques.innerText = ques_lst[0]
  ans.innerText = ans_lst[0]
  ques_num.innerText=start_num
  count++
})



var count = 0
next.addEventListener('click', () => {
  ques.innerText = ques_lst[count]
  ques_num.innerText=count+start_num
  setTimeout(() => {
    re_ques.innerText = ques_lst[count]
    ans.innerText = ans_lst[count]
    count++
  }, 500)
})


document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems);
 });