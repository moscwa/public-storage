﻿var next_slide_id = null
var nowPointing = null
var isNowTyping=false;

document.getElementById('add-title').addEventListener('click', () => {
  DropElement('h1')
})
document.getElementById('add-p').addEventListener('click', () => {
  DropElement('p')
})
document.getElementById('add-vote').addEventListener('click',()=>{
  if (question_obj[current_slide_id]){
    alert('投票は一つのページにつき1つです。')
    return;
  }
  question_obj[current_slide_id]=['','選択肢1','選択肢2']
  let current_slide=document.getElementById(current_slide_id)
  current_slide.classList.add('vote')
  let elm=document.createElement('canvas')
  elm.width="400"
  elm.height="400"
  elm.classList.add('chart','draggable')
  current_slide.appendChild(elm)
  AddClickEvent(elm)
  Selecting(elm)
  document.getElementById('vote-edit').style.transform="translateX(0)"
})
document.getElementById('editor').addEventListener('click', (e) => {
  if (e.target.tagName == "SECTION") {
    Selecting(null)
  }
})


var isWaitingDouble = false
function DropElement(tag) {
  let elm = document.createElement(tag)
  isNowTyping=true
  let text = window.prompt('テキストの追加')
  isNowTyping=false
  if (!text) {
    return;
  }
  elm.innerText = text
  elm.classList.add('draggable')
  AddClickEvent(elm)
  document.getElementById(current_slide_id).appendChild(elm)
  Selecting(elm)
}

function Selecting(target) {
  if (nowPointing) {
    nowPointing.style.outline = ""
  }
  nowPointing = target
  if (!target) {
    document.getElementById('color-selection').style.transform = "translateX(100%)"
    document.getElementById('background-color-selection').style.transform = "translateX(100%)"
    document.getElementById('vote-edit').style.transform = "translateX(100%)"
    return;
  }
    nowPointing.style.outline = "2px dotted black"
    document.getElementById('font-size').value = (nowPointing||document.getElementById(current_slide_id)).style.fontSize
    InitSidebar(target)
}



var slide_count = 1
document.getElementById('new-slide-btn').addEventListener('click', () => {
  SwitchSlide(null)
})

function SwitchSlide(slide_id) {
  Selecting(null)
  let preview =document.getElementById(current_slide_id).cloneNode(true)
  preview.id = current_slide_id + "-clone"
  let preview_div = document.getElementById(current_slide_id + "-clone-div")
  DeleteAllChild(preview_div)
  preview_div.appendChild(preview)
  DeleteAllChild(editor)
  mask=AddMask(preview_div, current_slide_id)
  mask.innerHTML=""
  mask.style.backgroundColor="rgba(25,25,25,0.1)"

  if (slide_id) {
    let new_slide=document.getElementById(slide_id).cloneNode(true)
    new_slide.id = slide_id.split('-')[0]
    editor.appendChild(new_slide)
    current_slide_id = new_slide.id
    let children=new_slide.children
    for(let i=0;i<children.length;i++){
      AddClickEvent(children[i])
    }
  } else {
    slide_count++
    let new_slide = document.createElement('section')
    new_slide.id = "slide" + slide_count
    new_slide.classList.add('card-panel')
    for(i=0;i<theme_elms.length;i++){
      let elm=theme_elms[i].cloneNode(true)
      elm.classList.add('draggable','theme-elm')
      AddClickEvent(elm)
      new_slide.appendChild(elm)
    }
    editor.appendChild(new_slide)
    current_slide_id = "slide" + slide_count
    let new_preview_div = document.createElement('div')
    new_preview_div.id = current_slide_id + "-clone-div"
    new_preview_div.classList.add('clone-div')
    summary.appendChild(new_preview_div)
    AddMask(new_preview_div, current_slide_id)
  }
  let new_mask=document.getElementById(current_slide_id + "-clone-mask")
  new_mask.innerHTML="<p>Now Editing..</p>"
  new_mask.style.backgroundColor="rgba(191, 54, 12,.8)"
  InitEditVote()
}



function DeleteAllChild(element) { //別にわざわざ関数にしなくてもいいけど、わかりやすいから
  element.innerHTML = ""
}
function DeleteThis(element){
  element.parentNode.removeChild(element);
}


function AddMask(parent, current_slide_id) {
  let mask = document.createElement('div')
  mask.classList.add('mask')
  mask.id = current_slide_id + "-clone-mask"
  mask.addEventListener('click', function(){
    SwitchSlide(this.id.split('-')[0] + "-clone")
  })
  parent.appendChild(mask)
  return mask
}


function AddClickEvent(elm){
  if(elm.tagName=="CANVAS"){
    elm.addEventListener('click',function(){
      Selecting(elm)
      document.getElementById('vote-edit').style.transform="translateX(0)"
    })
  }else{
    elm.addEventListener('click',function(){
      if (isWaitingDouble) {
        text = window.prompt('テキストの編集')
        if (!text) {
          return
        }
        this.innerText = text
        isWaitingDouble = false
      } else {
        isWaitingDouble = true
        setTimeout(() => {
          isWaitingDouble = false
        }, 300) //ダブルクリックまでの待ち時間
        Selecting(this)
      }
    })
  }
}


document.getElementById('export').addEventListener('click',()=>{
  Export()
})
