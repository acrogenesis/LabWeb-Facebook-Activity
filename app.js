function toggleLike(){
  this.textContent == 'Like' ? this.textContent = 'Unlike' : this.textContent = 'Like';
}

function newPost(){
  textA = document.getElementById('mind');
  if (textA.textLength < 1){
    console.log('Mensaje invalido');
    return false;
  }
  createPost(textA.value);
  textA.value = '';
}

function createPost(message){
  content = '<div class="message">' +
    '<div class="message-header">' +
      '<img class="message-me" src="message-me.jpg" alt="" />' +
      '<a href="#" style="vertical-align: top;" class="message-name">Adrián Rangel</a>' +
    '</div>' +
    '<div class="message-content">' +
      message +
    '</div>' +
    '<div class="message-links">' +
      '<a href="#" title="Like this" class="like">Like</a> · <a href="#" title="Leave a comment">Comment</a> · <a href="#" title="Send this to friends or post it on your timeline.">Share</a>' +
    '</div>' +
  '</div>';
  messageContainer = document.getElementById('messages-container');
  messageContainer.innerHTML = content + messageContainer.innerHTML;

}

function handlers(){
  var like_links = document.getElementsByClassName('like');
  for (var i = 0; i < like_links.length; i++) {
    like_links[i].addEventListener('click', toggleLike, false);
  }
  document.getElementById('post').addEventListener('click', newPost, false);
}

(function() {
  handlers();
})();
