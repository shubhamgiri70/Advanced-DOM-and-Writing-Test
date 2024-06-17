let btn = document.querySelector(".add");
let dragSrcEl = null;

function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function dragEnd() {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
}

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
}

var listItens = document.querySelectorAll(".draggable");
[].forEach.call(listItens, function (item) {
  addEventsDragAndDrop(item);
});

function addNewItem() {
  var newItem = document.querySelector(".input").value;
  if (newItem != "") {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.classList.add("draggable");
    li.setAttribute("draggable", "true");
    li.innerText = newItem;

    ul.appendChild(li);
    addEventsDragAndDrop(li);

    document.querySelector(".input").value = "";
  }
}

btn.addEventListener("click", addNewItem);
