const form = document.querySelector('#github-form')

form.addEventListener('submit', userSearch)

function userSearch(e){
    e.preventDefault()
    gitUsers(e.target[0].value)
    e.target.reset()
}

function gitUsers(name){
    fetch(`https://api.github.com/search/users?q=${name}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/vnd.github.v3+json',
        }
    })
    .then(resp => resp.json())
    .then(data => showUsers(data.items))
}

function showUsers(array){
    const userList = document.querySelector('#user-list')
    while(userList.firstChild){
        userList.removeChild(userList.firstChild)
    }
    const repoList = document.querySelector('#repos-list')
    while(repoList.firstChild){
        repoList.removeChild(repoList.firstChild)
    }
    array.forEach(user =>{
        const userLi = document.createElement('li')
        const userAvatar = document.createElement('img')
        userAvatar.src = user.avatar_url
        userAvatar.width = "100"
        userAvatar.height = '100'
        const userLink = document.createElement('a')
        userLink.href = user.html_url
        userLink.innerText = "Profile"
        const userName = document.createElement('h2')
        userName.textContent = user.login
        userName.addEventListener('click', (e) => showUserRepos(user.login))
        //userLi.innerHTML = `${userAvatar} ${userName} ${userLink}`
        userLi.append(userName, userLink, userAvatar)
        userList.append(userLi)
    })
}

function showUserRepos(user){
    const repoList = document.querySelector('#repos-list')
    while(repoList.firstChild){
        repoList.removeChild(repoList.firstChild)
    }
    const h2 = document.createElement('h2')
    h2.textContent = 'Repo List'
    repoList.append(h2)
    fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/vnd.github.v3+json',
        }
    })
    .then(resp => resp.json())
    .then(data => data.map(item =>{
        const h3 = document.createElement('h3')
        const repoLi = document.createElement('li')
        h3.textContent = item.full_name
        repoLi.append(h3)
        repoList.append(repoLi)
    }))
}