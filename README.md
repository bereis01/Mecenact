# Mecenact

## Escopo do sistema

* **Objetivo:** Compartilhamento e visualização de artes digitais.

* **Features:**

  * [Artistas] Compartilhar imagens; definir tags; prover local e tag apropriados para o compartilhamento de imagens NSFW;
  prover sistema de assinatura mensal para suporte financeiro; criação de um perfil que pode conter informações como gênero, idade,
  país de origem, público alvo das artes compartilhadas, breve descrição de personalidade e hobbies, dentre outros; gerenciar commissions.

  * [Viewers] Buscar imagens por tag; buscar imagens por popularidade; organizar imagens por categorias;
  favoritar artistas ou imagens; prover histórico de imagens vistas recentemente; poder fazer o download de imagens,
  caso o artista permitir; escolher certas tags de forma a não mostar mais imagens que contêm tais tags; propor commissions.

## Membros da equipe

* Bernardo Reis de Almeida -> BD
* Matheus Farnese Lacerda Senna -> Back-end
* Wilgnert de Alcântara Rodrigues Batista -> Front-end

## Tecnologias

* **Linguagem para o backend:** Python
* **Framework para o frontend:** React
* **SGBD:** SQLite

## Backlog do Produto

* Como usuário, gostaria de poder criar uma conta.
* Como usuário, gostaria de poder editar as informações básicas em meu perfil.
* Como usuário, gostaria de adicionar comentários em artes.
* Como usuário, gostaria de criar posts.
* Como artista, gostaria de publicar artes.
* Como artista, gostaria de definir tags para minhas artes.
* Como artista, gostaria de definir avisos (spoiler, NSFW) para minhas artes.
* Como artista, gostaria de criar planos de assinatura para minhas artes.
* Como artista, gostaria de receber e visualizar comissões.
* Como artista, gostaria de aceitar/recusar comissões.
* Como artista, gostaria de entregar comissões.
* Como artista, gostaria de definir permissões de uso para minhas artes.
* Como visualizador, gostaria de ter acesso a um feed de posts.
* Como visualizador, gostaria de filtrar artes por tag.
* Como visualizador, gostaria de pesquisar artes por ordem de popularidade.
* Como visualizador, gostaria de pesquisar artes por categoria.
* Como visualizador, gostaria de favoritar artes.
* Como visualizador, gostaria de seguir artistas.
* Como visualizador, gostaria de ter acesso a um histórico de artes vistas recentemente.
* Como visualizador, gostaria de fazer download de imagens.
* Como visualizador, gostaria de propor comissões.

## Backlog do Sprint

### História #1: Como usuário, gostaria de poder criar uma conta

**Tarefas e responsáveis:**

* Criar um banco de dados que armazenará as credenciais de cada usuário. [Bernardo]
* Elaborar as tabelas que representarão cada usuário no banco de dados. [Bernardo]
* Elaborar uma interface de usuário para a credenciação. [Wilgnert]
* Fazer a comunicação entre a credenciação e o banco de dados. [Matheus]
* Fazer a transição da interface de credenciação para o feed. [Wilgnert]

### História #2 Como usuário, gostaria de criar posts

**Tarefas e responsáveis:**

* Criar um banco de dados que armazenará as informações relacionadas aos posts. [Bernardo]
* Elaborar as tabelas que representarão cada post no banco de dados. [Bernardo]
* Elaborar uma interface de usuário para criação de post. [Wilgnert]
* Fazer a comunicação entre a criação do post e o armazenamento no banco de dados. [Matheus]
* Implementar o mecanismo de atualização do feed. [Wilgnert]

### História #3: Como visualizador, gostaria de ter acesso a um feed de posts

**Tarefas e responsáveis:**

* Elaborar uma interface de usuário para a visualização do feed. [Wilgnert]
* Implementar o mecanismo de extração de informações do banco de dados e de exibição no feed. [Matheus]

### História #4: Como visualizador, gostaria de filtrar artes por tag

**Tarefas e responsáveis:**

* Elaborar uma interface de usuário para filtragem de tags. [Wilgnert]
* Implementar o mecanismo interno de filtragem de posts por tag. [Matheus]
* Implementar a atualização condicional do feed. [Wilgnert]

## Diagramas UML

### Diagrama de Pacotes
<img src="https://i.imgur.com/yuogkXI.png" alt="Package Diagram">

### Diagrama de Classes
<img src="https://i.imgur.com/jOjRNN0.png" alt="Package Diagram">

### Diagrama de Atividades
<img src="https://i.imgur.com/O7J2IbY.png" alt="Activity Diagram">

## Esquema Relacional da Base de Dados
<img src="https://i.imgur.com/OdS1wQT.png" alt="Database Scheme">

## Gráfico de Contribuição
<img src="https://i.imgur.com/htngEXC.png" alt="Contribution">
