
const getPrecio = function(nameG){
    const precios = [
		{
			name: 'halo-5-guardians',
			price: 499.99
		},
		{
			name: 'borderlands-3',
			price: 899.99
		},
		{
			name: 'fortnite',
			price: 399.99
		},
		{
			name: 'minecraft',
			price: 349.99
		},
		{
			name: '',
			price: 0
		},
		{
			name: '',
			price: 0
		},
		{
			name: '',
			price: 0
		},
		{
			name: '',
			price: 0
		},
		{
			name: '',
			price: 0
		},
    ]
    for (let i = 0; i < precios.length; i++) {
        if(precios[i].name === nameG)
            return precios[i].price
    }
    return 0
}

const getGame = function (name){
    const API = 'https://api.rawg.io/api/games/'
    $.ajax({
        type: 'GET',
        url: `${API}${name}`,
        dataType: 'json',
        contenType: 'application/javascript'
    }).done(function(data){
        createGameView(data)
        console.log(data)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $('.screen').append(renderError('ERROR'))
    })
}

const createGameView = function(game){
    const screen = document.querySelector('.product-container')
    const productDiv = document.createElement('div')
    productDiv.classList.add('producto')
    productDiv.appendChild(createImageGame(game.background_image))
    productDiv.appendChild(createDataGame(game))
    productDiv.appendChild(createButton(game))
    screen.appendChild(productDiv)
}

const createImageGame = function(url){
    const imageGame = document.createElement('img')
	imageGame.src = url
	imageGame.classList.add('img-container')
	return imageGame
}

const createDataGame = function(game){
    const infoDiv = document.createElement('div')
    infoDiv.classList.add('producto-info')
    const gameName = document.createElement('h2')
    gameName.classList.add('name-game')
    const text = document.createTextNode(game.name)
    const gameDesc = document.createElement('div')
    gameDesc.classList.add('description-div')
    gameDesc.innerHTML = game.description
    gameName.appendChild(text)
    const price = document.createElement('p')
    price.classList.add('precio-p')
    price.innerHTML = '$' + getPrecio(game.slug) + ' MXN'
    infoDiv.appendChild(gameName)
    infoDiv.appendChild(gameDesc)
    infoDiv.appendChild(price)
    return infoDiv
}

const createButton = function(game){
    const divBTn = document.createElement('div')
    divBTn.classList.add('control')
    const button = document.createElement('button')

    button.addEventListener('click', function(){
        console.log('')
    })

    button.innerHTML = '<i class="fas fa-shopping-cart"></i>'
    divBTn.appendChild(button)
    return divBTn
}

const register = function(){
    const input_user = document.querySelector('#input-user')
    const username = input_user.value;
    if(username==''){
        window.alert("Username field is requiered")
    }else{
        localStorage.setItem("user", username)
        location.href='index.html'
    }
}

const userLog = function(){
    var user = localStorage.getItem("user")
    const input_user = document.querySelector('#user-a')
    const logout_op = document.querySelector('#logout')
    if(user!='' && user!=null){
        input_user.innerHTML = ''
        input_user.innerHTML = '<i class="fas fa-user-circle"></i>'+user
        logout_op.style.display = 'block'
        input_user.href='#'
        userLogout()
    }else{
        input_user.innerHTML = '<i class="fas fa-user-circle"></i> Login'
        input_user.href='login.html'
    }
}

const userLogout = function(){
    const logout_op = document.querySelector('#logout')
    logout_op.addEventListener('click', function(){
        localStorage.clear()
        location.href='index.html'
        logout_op.style.display = 'none'
    })
}

const init = function(){
    getGame('halo-5')
    getGame('borderlands-3')
    getGame('fortnite')

    userLog()
}

const initLogin = function(){
    const register_btn = document.querySelector('.logbutton')

    register_btn.addEventListener('click', function(){
        register()
    })
}

const initCart = function(){

    userLog()
}





