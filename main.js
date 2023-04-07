const context = canvas.getContext('2d')

const time = 60/1000 //60 frames por segundo
let mouseX = -1000
let mouseY = -1000
let positionX = -1001
let positionY = -1001

// Modo escuro
let darkMode = false

darkModeButton.addEventListener('click', () => {
	const root = document.documentElement
	root.classList.toggle('dark-mode')
	darkModeButton.textContent = root.classList.contains('dark-mode') ? '☽' : '☼'
})

// Atualizar posição do mouse
function updateMousePosition(x,y) {
	mouseX = x - canvas.getBoundingClientRect().left
	mouseY = y - canvas.getBoundingClientRect().top
}
window.addEventListener('mousemove', ({pageX,pageY}) => updateMousePosition(pageX,pageY))
window.addEventListener('touchmove', ({touches}) => updateMousePosition(touches[0].pageX,touches[0].pageY))

// Desenhar bolinhas a cada tantos milissegundos
setInterval(draw, time)

function draw() {
	// Calcular diferença de posição
	const differenceX = mouseX - positionX
	const differenceY = mouseY - positionY

	// Encerrar função se a posição não foi muito alterada desde o último frame
	if (Math.abs(differenceX) + Math.abs(differenceY) < 1) return

	// Limpar canvas
	context.clearRect(0, 0, canvas.width, canvas.height)

	// Atualizar posição
	positionX += differenceX * 0.1
	positionY += differenceY * 0.1

	// Criar gradiente
	const gradient = context.createLinearGradient(0, 0, canvas.clientWidth, 0)
	gradient.addColorStop(0, 'red');
	gradient.addColorStop(1/6, 'orange');
	gradient.addColorStop(2/6, 'yellow');
	gradient.addColorStop(3/6, 'green');
	gradient.addColorStop(4/6, 'cyan');
	gradient.addColorStop(5/6, 'blue');
	gradient.addColorStop(1, 'purple');
	context.fillStyle = gradient

	// Começar a desenhar
	context.beginPath();

	// Bolinhas
	for (let x = 0; x <= canvas.width; x += 20) {
		for (let y = 0; y <= canvas.height; y += 20) {
			// Posição da bolinha
			context.moveTo(x,y)

			// Distância entre o cursor e a bolinha
			const distance = Math.sqrt((x - positionX) ** 2 + (y - positionY) ** 2)

			// Ângulo entre o cursor e a bolinha
			const angle = Math.atan2(positionY - y, positionX - x);

			// Calcular distorção da posição (utilizando função de Gauss)
			const offsetX = Math.cos(angle) * Math.E ** -((0.001 * distance) ** 2) * inputDistortion.value
			const offsetY = Math.sin(angle) * Math.E ** -((0.001 * distance) ** 2) * inputDistortion.value

			// Desenhar bolinha
			context.arc(x - offsetX, y - offsetY, inputSize.value, 0, 2 * Math.PI)
		}
	}

	// Pintar bolinhas
	context.fill();
}