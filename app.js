var myTimer;
function toggleLike(){
  if(this.textContent == 'Like'){
    sendLike(this.parentElement.parentElement.id, 1);
    this.textContent = 'Unlike';
  }else{
    sendLike(this.parentElement.parentElement.id, 0);
    this.textContent = 'Like';
  }
}

function sendLike(id, bool){
  var xmlhttp;
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      console.log(xmlhttp.responseText);
    }
  };
  xmlhttp.open("POST", "like.php", true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.timeout = 10000;
  xmlhttp.ontimeout = function () { timeoutRaised(); };
  xmlhttp.send("id="+id+"&bool="+bool+"");
}

function validatePost(textA){
  return textA.value.length >= 1 && !textA.value.match(/^\s*$/);
}

function newPost(){
  textA = document.getElementById('mind');
  if (validatePost(textA)){
    createPost(textA.value);
  }else{
    alert("Mensaje invalido");
  }
}

function sendPost(message, id, like, date)
{
  var xmlhttp;
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      textA.value = '';
      content = messageContent(message, id, like, date);
      messageContainer = document.getElementById('messages-container');
      messageContainer.innerHTML = content + messageContainer.innerHTML;
      like_handlers();
    } else if (xmlhttp.status==501) {
      alert('501. Error no se pudo enviar tu mensaje intenta de nuevo.');
    }
  };
  xmlhttp.open("POST", "post.php", true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.timeout = 10000;
  xmlhttp.ontimeout = function () { timeoutRaised(); };
  xmlhttp.send("message="+message+"&author=Adrian Rangel");
}

function timeoutRaised(){
  alert('Revisa tu conexión a internet y vuelve a intentar');
}
function messageContent(message, id, like, date){
  return '<div id="' + id + '" class="message">' +
    '<div class="message-header">' +
      '<img class="message-me" src="message-me.jpg" alt="" />' +
      '<a href="#" style="vertical-align: top;" class="message-name">Adrián Rangel</a>' +
    '</div>' +
    '<div class="message-content">' +
      message +
    '</div>' +
    '<div class="message-links">' +
    '<span data-time="'+date+'" class="time-since">' + timeSince(date) + '</span> <a href="#" title="Like this" class="like">'+like+'</a> · <a href="#" title="Leave a comment">Comment</a> · <a href="#" title="Send this to friends or post it on your timeline.">Share</a>' +
    '</div>' +
  '</div>';
}
function createPost(message, id , like, date){
  d = new Date();
  d = d.toMySQLDateTime();
  id = (typeof id === 'undefined') ? '' : id;
  date = (typeof date === 'undefined') ? d : date;
  like = (like === '1') ? 'Unlike' : 'Like';

  if(id === ''){
    sendPost(message, id, like, date);
  } else {
    content = messageContent(message, id, like, date);
    messageContainer = document.getElementById('messages-container');
    messageContainer.innerHTML = content + messageContainer.innerHTML;
    like_handlers();
  }
}

function like_handlers(){
  like_links = document.getElementsByClassName('like');
  for (var i = 0; i < like_links.length; i++) {
    like_links[i].addEventListener('click', toggleLike, false);
  }
}

function start(){
  like_handlers();
  document.getElementById('post').addEventListener('click', newPost, false);
  getAllPosts();
}

function getAllPosts(){
  var xmlhttp = new XMLHttpRequest();
  var myArr = '';
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myArr = JSON.parse(xmlhttp.responseText);
      for (var i = 0; i < myArr.length; i++) {
        var t = myArr[i].created_at.split(/[- :]/);
        // Apply each element to the Date function
        var date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
        createPost(myArr[i].message, myArr[i].id,myArr[i].like, myArr[i].created_at);
      }
    } else if(xmlhttp.status == 503) {
      alert('503. Error en la conección a la base de datos.');
    } else if(xmlhttp.status == 501) {
      alert('501. Error la tabla no existe.');
    }
  };
  xmlhttp.open("GET", "fetchAll.php", true);
  xmlhttp.timeout = 10000;
  xmlhttp.ontimeout = function () { timeoutRaised(); };
  xmlhttp.send();
}

function timeSince(date){
  var t = date.split(/[- :]/);
  date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  // Apply each element to the Date function
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function timedEvents(){
  // regenerar los timestamps;
  timeSinceArray = document.getElementsByClassName('time-since');
  for (var i = 0; i < timeSinceArray.length; i++) {
    timeSinceArray[i].textContent = timeSince(timeSinceArray[i].attributes['data-time'].textContent);
  }
}

Date.prototype.toMySQLDateTime = function () {
  function addZ(n) {
    return (n<10? '0' : '') + n;
  }
  return this.getFullYear() + '-' +
         addZ(this.getMonth() + 1) + '-' +
         addZ(this.getDate()) + ' ' +
         addZ(this.getHours()) + ':' +
         addZ(this.getMinutes()) + ':' +
         addZ(this.getSeconds());
};

(function() {
  start();
  myVar = setInterval(function(){ timedEvents(); }, 1000);
})();
