let url = new URL(location.href);
let users = JSON.parse(url.searchParams.get('userID'));

let ul = document.createElement('ul');
ul.classList.add('ul_main');
document.body.appendChild(ul);

function displayObject(obj, parentElement) {
    for (const key in obj) {
        let li = document.createElement('li');
        if (typeof obj[key] === 'object') {
            li.innerText = `${key}:`;
            let nestedUl = document.createElement('ul');
            li.appendChild(nestedUl);
            displayObject(obj[key], nestedUl);
        } else {
            li.innerText = `${key} - ${obj[key]}`;
        }
        parentElement.appendChild(li);
    }
}

displayObject(users, ul);

let postsBtn = document.createElement('button');
postsBtn.innerText = 'Posts of current user';
document.body.appendChild(postsBtn);

let postsUl; // Зберігаємо посилання на <ul>, щоб перевіряти його наявність

postsBtn.addEventListener('click', () => {
    if (!postsUl) {
        let userId = users.id;
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(res => res.json())
            .then(posts => {
                postsUl = document.createElement('ul');
                postsUl.style.listStyleType = 'none';
                postsUl.classList.add('post');
                document.body.appendChild(postsUl);

                for (const post of posts) {
                    let postLi = document.createElement('li');
                    let postBtn = document.createElement('button');
                    postBtn.innerText = `Title: ${post.title}`;
                    postLi.appendChild(postBtn);
                    postsUl.appendChild(postLi);
                    postBtn.addEventListener('click', () => {
                        document.location.href = `post-details.html?postID=${post.id}`;
                    });
                }
            });
    }
});