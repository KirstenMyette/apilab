var url = location.search.substring(1).split('=')[1];

$.get('https://www.reddit.com/r/todayilearned.json')
.then(function(success){
    var data = success[0];
    var post = redditInfo(success);

    var container = document.createElement('div')
    var header = document.createElement('h2');
    var pic = document.createElement('img');

    header.innerText = post.title;
    pic.setAttribute('src', formatVisual(post));
    container.appendChild(pic);
    document.body.appendChild(container);
    }); 


function redditInfo(data) {
var subreddit = data.data.children;


var result = subreddit.map(function(child, i){
    var post = {};
    post.thumbnail = child.data.thumbnail;
    post.title = child.data.title;
    post.url = child.data.url;
    post.permalink = child.data.permalink;

    return post;
});

    if(result.length === 1){
        return result[0];
    }

    return result;
}

function formatVisual(post) {
if (/\.(gif|.gifv|jpg|jpeg|tiff|png)$/i.test(post.url)) {
    if (post.url.indexOf('.gifv') != -1) {
        return post.url.replace('.gifv', '.gif');
    }

    return post.url;
}

return post.thumbnail;
}