# Mogi Mobilidade 🚌

> **Protótipo desenvolvido para o trabalho final da disciplina de Interação Humano-Computador (SIN5029) — Escola de Artes, Ciências e Humanidades da Universidade de São Paulo (EACH-USP).**

---

## 📌 Objetivo da Aplicação

O **Mogi Mobilidade** é uma aplicação web-mobile desenvolvida com foco em **clique-zero** para mitigar erros de embarque no transporte público coletivo de Mogi das Cruzes. O objetivo principal é permitir que o cidadão identifique instantaneamente quais linhas passam na via mais próxima da sua localização e os horários iminentes de saída, sem a necessidade de digitação de endereços ou termos de busca.

---

## 👥 Perfil dos Usuários (Design Centrado no Usuário & Acessibilidade)

A interface foi projetada com base nos princípios de Interação Humano-Computador (IHC), visando reduzir drasticamente a carga cognitiva e atender a dois perfis principais de usuários:

* **Trabalhadores em Trânsito (Ex: Camila):** Exigem alta agilidade visual (escaneamento rápido de tela) e foco imediato no sentido da linha (Centro ou Bairro) para embarque rápido.
* **Idosos / Leigos Digitais (Ex: Seu Benedito):** Demandam acessibilidade aprimorada — tipografia ampla em alto contraste, botões com áreas de toque generosas e navegação guiada sem dependência de digitação de nomes de vias.

---

## ⚡ Funcionalidades Principais

* **Auto-localização Geográfica:** Obtenção automática da posição do usuário através da API de Geolocalização (HTML5 Geolocation) com resolução de nome de rua por geocodificação reversa.
* **Seleção Direcional em 1-Clique:** Botões acessíveis para escolha de sentido (*Ir para o Centro* vs *Ir para o Bairro*).
* **Fluxo de Navegação Direto:**
  * **Tela de Splash (Loading):** Pre-carregamento dos dados e obtenção da permissão de localização.
  * **Tela Inicial (Início):** Exibe a rua atual e seleção de sentido.
  * **Tela de Linhas:** Listagem filtrada por sentido. Acesso direto pela aba "Linhas" exibe ambos os sentidos simultaneamente.
* **Ordenação Cronológica Iminente:** Listagem de viagens organizadas pelo menor tempo restante de chegada.
* **Formatação Inteligente de Tempo:** Exibição amigável em minutos (ex: `15 min`) ou horas/minutos (ex: `1h 20min`, `20h 57min`).
* **Cache Resiliente via IndexedDB:** Armazenamento em cache da base de dados de rotas com expiração automática de **15 minutos** em banco `IndexedDB`, garantindo carregamento ultrarrápido sem estourar limites de cota do navegador.
* **Busca Manual sem Acentos:** Seleção manual de ruas com filtro insensível a acentuação (ex: pesquisar "jose" encontra "Rua José Bonifácio").

---

## 🛠️ Tecnologias Utilizadas

* **React 18:** Biblioteca de construção de interfaces de página única (SPA) reativas e modulares.
* **TypeScript:** Tipagem estática rigorosa para garantia de integridade das estruturas de dados de transporte.
* **Vite:** Bundler e servidor de desenvolvimento otimizado para alto desempenho.
* **Tailwind CSS:** Framework utilitário de CSS adotado para estilização responsiva e tokens de acessibilidade de alto contraste.
* **Lucide React:** Coleção de ícones vetoriais acessíveis.
* **IndexedDB API:** Banco de dados no navegador para cache local persistente de 15 minutos.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior)
* `npm` (gerenciador de pacotes)

### Passo a Passo

1. **Clonar o repositório ou navegar até o diretório do projeto:**
   ```bash
   cd mogi-mobilidade
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra o link exibido no terminal (geralmente `http://localhost:5173`) no navegador ou emulando visualização mobile.

4. **Gerar a versão de produção (Build):**
   ```bash
   npm run build
   ```

---

## 📄 Créditos e Contexto Acadêmico

Este projeto é um protótipo funcional desenvolvido estritamente para fins acadêmicos e de pesquisa na disciplina **Interação Humano-Computador (SIN5029)** do curso de Sistemas de Informação da **EACH-USP**.
