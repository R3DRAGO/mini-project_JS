let url = new URL("https://jsonplaceholder.typicode.com/users")
console.log(url);

let div = document.createElement('div');
div.classList.add('block');
document.body.appendChild(div);

fetch(url).then(res => res.json()).then((items) => {
    console.log(items)
    for (const item of items) {
        console.log(item)
        let p = document.createElement('p');
        let btn = document.createElement('button');
            div.append(p, btn);
            p.innerText = `${item.id} - ${item.name}`
            btn.innerText = `More info`


        btn.addEventListener('click', ()=>{
            document.location.href = `user-details.html?userID=` + JSON.stringify(item);
        })
    }
});
