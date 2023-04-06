const context = canvas.getContext('2d')

const time = 60/1000 //60 frames por segundo
let mouseX = 0
let mouseY = 0
let positionX = 0
let positionY = 0

// Modo escuro
let darkMode = false

darkModeButton.addEventListener('click', () => {
	if (darkMode) {
		darkMode = false
		darkModeButton.textContent = '☼'
		document.documentElement.style.setProperty('--text-color', '#333')
		document.documentElement.style.setProperty('--background-primary', '#eee')
		document.documentElement.style.setProperty('--background-secondary', '#fefefe')
	}
	else {
		darkMode = true
		darkModeButton.textContent = '☽'
		document.documentElement.style.setProperty('--text-color', '#eee')
		document.documentElement.style.setProperty('--background-primary', '#333')
		document.documentElement.style.setProperty('--background-secondary', '#222')
	}
})

// Atualizar posição pelo mouse
window.addEventListener('mousemove', ({x,y}) => {
	mouseX = x - canvas.getBoundingClientRect().left
	mouseY = y - canvas.getBoundingClientRect().top
})

//Atualizar posição pelo toque
window.addEventListener('touchmove', ({touches}) => {
	mouseX = touches[0].pageX - canvas.getBoundingClientRect().left
	mouseY = touches[0].pageY - canvas.getBoundingClientRect().top
})

// Desenhar bolinhas a cada tantos milissegundos
setInterval(draw, time)

function draw() {
	// Limpar canvas
	context.clearRect(0, 0, canvas.width, canvas.height)

	// Atualizar posição
	positionX += (mouseX - positionX) * 0.1
	positionY += (mouseY - positionY) * 0.1

	// Criar gradiente
	const gradient = context.createLinearGradient(0, 0, canvas.clientWidth, 0)
	gradient.addColorStop(1/7, 'red');
	gradient.addColorStop(2/7, 'orange');
	gradient.addColorStop(3/7, 'yellow');
	gradient.addColorStop(4/7, 'green');
	gradient.addColorStop(5/7, 'cyan');
	gradient.addColorStop(6/7, 'blue');
	gradient.addColorStop(1, 'purple');
	context.fillStyle = gradient

	// Começar a desenhar
	context.beginPath();

	// Bolinhas
	for (let x = 0; x < canvas.width; x += 20) {
		for (let y = 0; y < canvas.height; y += 20) {
			// Posição da bolinha
			context.moveTo(x,y)

			// Distância entre o cursor e a bolinha
			const distance = Math.sqrt((x - positionX) ** 2 + (y - positionY) ** 2)

			// Ângulo entre o cursor e a bolinha
			const angle = Math.atan2(positionY - y, positionX - x);

			// Calcular distorção da posição (utilizando função de Gauss)
			const offsetX = Math.cos(angle) * Math.E ** (-0.001 * distance) ** 2 * inputDistortion.value
			const offsetY = Math.sin(angle) * Math.E ** (-0.001 * distance) ** 2 * inputDistortion.value

			// Desenhar bolinha
			context.arc(x - offsetX, y - offsetY, inputSize.value, 0, 2 * Math.PI)
		}
	}

	// Pintar bolinhas
	context.fill();
}