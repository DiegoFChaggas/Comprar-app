# Projeto Comprar 🛒

Este é um aplicativo de lista de compras desenvolvido em React Native com Expo. Ele permite que os usuários se cadastrem, façam login e gerenciem suas listas de compras pessoais.

O projeto utiliza o Supabase para autenticação de usuários e armazena os itens da lista localmente no dispositivo.

## ✨ Funcionalidades Principais

* **Autenticação de Usuário:**
    * Cadastro de novos usuários (Nome, E-mail, Senha).
    * Login com E-mail e Senha.
    * Logout (Sair).
* **Gerenciamento da Lista:**
    * Adicionar novos itens à lista de compras.
    * Marcar itens como concluídos (alternar status).
    * Remover itens individualmente.
    * Limpar toda a lista de uma vez.
* **Filtragem:**
    * Filtrar itens por status: **Pendentes** ou **Concluídos**.
* **Navegação:**
    * Rotas protegidas: O usuário só pode acessar a tela `Home` (lista) se estiver logado.
    * Redirecionamento automático baseado no status de autenticação.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **React Native**
* **Expo** (incluindo `expo-router` para navegação)
* **TypeScript**
* **Supabase** (para Autenticação)
* **AsyncStorage** (para persistência local dos itens da lista)
* **Lucide Icons** (para ícones)

## 📁 Estrutura do Projeto

O projeto utiliza a estrutura de navegação baseada em arquivos do **Expo Router**:

app/
├── (auth)/

│   ├── Signin/index.tsx

│   └── Signup/index.tsx

│

├── (panel)/

│   └── Home/index.tsx

│

├── _layout.tsx

│

│

└── index.tsx


components/

lib/

storage/ 

contexts/ 


## ⚙️ Configuração (Pré-requisitos)

Antes de rodar o projeto, você precisa configurar o Supabase.

1.  Crie um projeto no [Supabase](https://supabase.com/).
2.  Obtenha a **URL do Projeto** e a **Chave de API (anon key)**.
3.  Configure essas chaves no seu arquivo de cliente Supabase (provavelmente em `lib/supabase.ts` ou similar).

## ⚡ Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/DiegoFChaggas/Comprar-app
    cd comprar
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *(ou `yarn install` se você preferir o Yarn)*

3.  **Execute o projeto:**

    * **Para Android:**
        ```bash
        npm run android
        ```
        *(ou `expo start --android`)*

    * **Para iOS:**
        ```bash
        npm run ios
        ```
        *(ou `expo start --ios`)*

    * **Para Web:**
        ```bash
        npm run web
        ```

        *(ou `expo start --web`)*


