let url = new URL(location.href);
console.log(url);

let postId = url.searchParams.get('postID');
console.log(postId);
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(post => {
        let postUl = document.createElement('ul');
        postUl.classList.add('info_post')
        document.body.appendChild(postUl);
        for (const key in post) {
            let postLi = document.createElement('li');
            postLi.innerText = `${key} - ${post[key]}`;
            postUl.appendChild(postLi);
        }

        setTimeout(() => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(res => res.json())
                .then(comments => {
                    let commentsUl = document.createElement('ul');
                    commentsUl.classList.add('comments');
                    commentsUl.style.listStyleType = 'none';
                    document.body.appendChild(commentsUl);
                    for (const comment of comments) {
                        let commentLi = document.createElement('li');
                        commentLi.classList.add('list_comments')
                        commentLi.innerText = `Comment ${comment.id}: ${comment.body}`;
                        commentsUl.appendChild(commentLi);
                    }
                });
        }, 1);
    });

