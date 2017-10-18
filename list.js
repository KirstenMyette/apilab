$.get('https://www.reddit.com/r/todayilearned.json')
    .then(function(success){
        var post = redditInfo(success);
        
        post.forEach(function(post){
            var container = document.createElement('div')
            var header = document.createElement('h2');
            var link = document.createElement('a');
            var pic = document.createElement('img');

            header.innerText = post.title;
            pic.setAttribute('src', formatVisual(post));
            link.setAttribute('href', 'single.html?url=' + post.permalink);
            link.appendChild(header);
            container.appendChild(link);
            container.appendChild(pic);
            document.body.appendChild(container);
        }); 
    });

function redditInfo(data) {
    var subreddit = data.data.children;

    return subreddit.map(function(child, i){
        var post = {};
        post.thumbnail = child.data.thumbnail;
        post.title = child.data.title;
        post.url = child.data.url;
        post.permalink = child.data.permalink;
    
        return post;
    });

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