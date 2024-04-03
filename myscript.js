// array
let participantes = [
    {
        nome: "Caetano Messina", 
        email: "cacamelo98@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22)
    },
    {
        nome: "Alvaro Domingues", 
        email: "alvaronegao@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 20, 20),
        dataCheckIn: new Date(2024, 2, 25, 23)
    },
    {
        nome: "Maria Silva", 
        email: "mariasilva@gmail.com",
        dataInscricao: new Date(2024, 2, 24, 15, 30),
        dataCheckIn: new Date(2024, 2, 26, 10, 45)
    },
    {
        nome: "João Pereira", 
        email: "joaopereira@gmail.com",
        dataInscricao: new Date(2024, 2, 25, 12, 10),
        dataCheckIn: null
    },
    {
        nome: "Ana Souza", 
        email: "anasouza@gmail.com",
        dataInscricao: new Date(2024, 2, 26, 18, 20),
        dataCheckIn: new Date(2024, 2, 28, 14, 15)
    },
    {
        nome: "Pedro Oliveira", 
        email: "pedrooliveira@gmail.com",
        dataInscricao: new Date(2024, 2, 27, 21, 5),
        dataCheckIn: null
    },
    {
        nome: "Carla Santos", 
        email: "carlasantos@gmail.com",
        dataInscricao: new Date(2024, 2, 28, 14, 40),
        dataCheckIn: new Date(2024, 2, 30, 11, 20)
    },
    {
        nome: "Miguel Costa", 
        email: "miguelcosta@gmail.com",
        dataInscricao: new Date(2024, 2, 29, 9, 0),
        dataCheckIn: new Date(2024, 3, 1, 7, 45)
    },
    {
        nome: "Sofia Ferreira", 
        email: "sofiaferreira@gmail.com",
        dataInscricao: new Date(2024, 2, 30, 17, 15),
        dataCheckIn: new Date(2024, 3, 2, 13, 10)
    },
    {
        nome: "Rui Santos", 
        email: "ruisantos@gmail.com",
        dataInscricao: new Date(2024, 2, 31, 20, 50),
        dataCheckIn: new Date(2024, 3, 3, 8, 30)
    }
    
]

const criarNovoPart = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    const dataCheckIn = participante.dataCheckIn ? dayjs(Date.now()).to(participante.dataCheckIn) :
    `<button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar Check-in</button>`;
    return `
    <tr>
        <td><strong>${participante.nome}</strong></br><small>${participante.email}</small></td></br>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
} 

const atualizarLista = (participantes) => {
    // estrutura de repetição
    let output = ""
    for(let participante of participantes){
        output = output + criarNovoPart(participante)
    }
    
    // pegar info do HTML

    // Substituir info do HTML
    document.querySelector('tbody').innerHTML = output
} 

atualizarLista(participantes)

const adicionarPart = (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // verificar se o participante já existe
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )

    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // confirmar o check-in
    const menConfirm = 'Tem certeza que deseja realizar o Check-In?'
    if (confirm(menConfirm) == false) {
        return;
    }
    // encontrar participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes
    atualizarLista(participantes)
}