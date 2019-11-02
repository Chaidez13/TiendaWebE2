
const getPrecio = function(nameG){
    const precios = [
		{
			name: 'destiny-2',
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
			name: 'marvels-spider-man',
			price: 499.99
		},
		{
			name: 'gears-5',
			price: 1099.99
		},
		{
			name: 'mortal-kombat-11',
			price: 999.99
		},
		{
			name: 'jedi-the-fallen-order',
			price: 1299.99
		},
		{
			name: 'planet-zoo',
			price: 599.99
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
    const screen = document.querySelector('#pc-c')
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

const createCartView = function(game, precio){
    const listdiv = document.createElement('div')
    listdiv.classList.add('list')
    const proddiv = document.createElement('div')
    proddiv.classList.add('product-add')
    const mindiv = document.createElement('div')
    mindiv.classList.add('cart-min')
    const titlediv = document.createElement('div')
    titlediv.classList.add('product-title')
    const imageGame = document.createElement('img')
    imageGame.src = game.background_image
    const cost = document.createElement('p')
    cost.innerHTML = '$' + precio + ' MXN'
    mindiv.appendChild(imageGame)
    titlediv.innerHTML = '<h2>'+game.name+'</h2>'
    proddiv.appendChild(mindiv)
    proddiv.appendChild(titlediv)
    proddiv.appendChild(cost)
    listdiv.appendChild(proddiv)
    return listdiv
}

const createButton = function(game){
    const divBTn = document.createElement('div')
    divBTn.classList.add('control')
    const button = document.createElement('button')

    button.addEventListener('click', function(){
        console.log(game)
        var gameN = []
        var list = JSON.parse(localStorage.getItem('games'))
        if(list==null){
            gameN[0] = game;
        }else{
            gameN = list
            gameN[list.length] = game;
        }
        localStorage.setItem('games', JSON.stringify(gameN))
        window.alert(game.name + " added to cart")
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
    getGame('destiny-2')
    getGame('borderlands-3')
    getGame('fortnite')

    userLog()
}

const initList = function(){
    getGame('destiny-2')
    getGame('borderlands-3')
    getGame('fortnite')
    getGame('minecraft')
    getGame('marvels-spider-man')
    getGame('gears-5')
    getGame('mortal-kombat-11')
    getGame('jedi-the-fallen-order')
    getGame('planet-zoo')

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
    var games =  JSON.parse(localStorage.getItem('games'))
    const cartdiv = document.querySelector('.cart-list')
    const totalPP = document.querySelector('#total-pay')
    var precio;
    var total = 0;
    console.log(games)
    for (let i = 0; i < games.length; i++) {
        precio = getPrecio(games[i].slug)
        total = (total + precio);
        cartdiv.appendChild(createCartView(games[i],precio))
    }
    totalPP.innerHTML = '$' + total.toFixed(2) + ' MXN'
    
}


