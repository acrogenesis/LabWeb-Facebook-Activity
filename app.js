function toggleLike(){
  console.log(this.textContent);
  if (this.textContent == 'Like') {
    this.textContent = 'Unlike';
  } else {
    this.textContent = 'Like';
  }
}

function handlers(){
  var like_links = document.getElementsByClassName('like');
  for (var i = 0; i < like_links.length; i++) {
    like_links[i].addEventListener('click', toggleLike, false);
  }
}

(function() {
  handlers();
})();
