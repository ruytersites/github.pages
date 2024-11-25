// Função para enviar post para o Firestore
function sendPost() {
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    // Verifique se os campos não estão vazios
    if (postTitle && postContent) {
        // Envia os dados para o Firestore
        db.collection('posts').add({
            title: postTitle,
            content: postContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert('Post publicado com sucesso!');
            document.getElementById('post-title').value = ''; // Limpar campo título
            document.getElementById('post-content').value = ''; // Limpar campo conteúdo
            loadPosts(); // Carregar os posts novamente após a publicação
        })
        .catch((error) => {
            console.error('Erro ao publicar o post: ', error);
            alert('Erro ao publicar o post.');
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
// Função para carregar os posts do Firestore
function loadPosts() {
    // Limpar o conteúdo da página de posts antes de carregar novamente
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    // Buscar posts do Firestore, ordenados por timestamp (mais recentes primeiro)
    db.collection('posts')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>Postado em ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar posts: ', error);
        });
}
// Função para carregar posts
function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Limpar posts anteriores

    // Usando onSnapshot() para carregar posts em tempo real
    db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>Postado em ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
                `;
                postsContainer.appendChild(postElement);
            });
        });
}

// Chama a função ao carregar a página
window.onload = loadPosts;
function sendPost() {
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    if (postTitle && postContent) {
        db.collection('posts').add({
            title: postTitle,
            content: postContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Armazena a data do post
        })
        .then(() => {
            alert('Post publicado com sucesso!');
            loadPosts(); // Atualiza os posts na página após o envio
        })
        .catch((error) => {
            console.error('Erro ao publicar o post: ', error);
            alert('Erro ao publicar o post.');
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
