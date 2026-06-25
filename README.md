# 🚀 Reserva Escolar - Automação de Preenchimento

Extensão para Google Chrome que automatiza o preenchimento do formulário de reservas do site **reservaescolar.com.br** a partir de mensagens padronizadas do WhatsApp Web.

![Banner Reserva Escolar](icon.png)
---

## 📋 Visão Geral

O operador copia a mensagem do cliente (contendo dados como CNPJ, nome da escola, endereço, etc.), cola no popup da extensão e, com um clique, todos os campos do formulário são preenchidos automaticamente — tanto na tela inicial de CNPJ quanto na etapa principal de cadastro.

---

## ⚡ Funcionalidades

- 📥 **Leitura inteligente** de mensagens estruturadas via Expressões Regulares (Regex)
- 🧠 **Memória interna** para preenchimento automático da segunda etapa do formulário
- 🖱️ **Popup intuitivo** com design moderno e feedback visual de status
- 🔄 **Limpeza automática** do campo de texto após preenchimento bem-sucedido
- 🧩 **Arquitetura MV3** (Manifest V3) – compatível com as versões mais recentes do Chrome
- 🛡️ **Isolamento de UI** – não interfere no layout do site de reservas

---

## 🖼️ Interface do Popup

> *Adicione aqui uma imagem do popup em funcionamento.*  
> Exemplo: `assets/print.png`

---

## 🛠️ Tecnologias Utilizadas

- **Manifest V3** – API de extensões do Chrome
- **JavaScript (ES6+)** – Lógica de parsing e comunicação entre scripts
- **CSS3 com variáveis** – Estilização moderna e fácil manutenção
- **Chrome Storage API** – Persistência de dados entre etapas do formulário
- **MutationObserver** – Detecção de mudanças na página para preenchimento automático

---

## 📁 Estrutura do Projeto
📂 reserva-escolar-extension/
├── manifest.json # Configuração da extensão (MV3)
├── popup.html # Interface do popup
├── popup.css # Estilos do popup
├── popup.js # Lógica de parsing e comunicação
└── content.js # Script injetado no site de reservas


---

## 🧪 Como Instalar e Testar

1. **Baixe ou clone** este repositório em uma pasta do seu computador.
2. Abra o Google Chrome e acesse `chrome://extensions/`.
3. Ative o **"Modo do desenvolvedor"** (canto superior direito).
4. Clique em **"Carregar sem compactação"**.
5. Selecione a pasta onde estão os arquivos da extensão.
6. A extensão aparecerá na lista. Certifique-se de que está ativada.

---

## 🧭 Como Usar

1. Acesse o site `https://www.reservaescolar.com.br/#atracoes`.
2. Na tela inicial, o operador **copia a mensagem do cliente** (ex: do WhatsApp Web).
3. Clica no ícone da extensão na barra de ferramentas do Chrome.
4. **Cola o texto** no campo do popup e clica em **"Processar"**.
5. O campo de CNPJ da primeira tela é preenchido automaticamente.
6. O operador clica em **"NOVA ESCOLA"**.
7. A extensão detecta a nova tela e **preenche todos os campos restantes** sozinha.
8. O popup é limpo automaticamente, pronto para a próxima reserva.

---

## 📄 Formato de Mensagem Suportado

A extensão reconhece mensagens no seguinte formato (exemplo):
CNPJ da escola: xxx
Nome completo da escola: xxx
Telefone da escola: xxx
E-mail da escola: xxx
Rua xxx
CEP: xxx
Ensino Fundamental
Escola Particular
Nome completo do responsável da reserva: xxx
Telefone do responsável: xxx
xxx Turismo
CNPJ: xxx
E-mail: xxx
Data desejada: xxx
Horário: xxx
Quantidade total de visitantes: xxx
Quantidade de professores: xxx
Quantidade de guias Cadastur: xxx


---

## 🔧 Personalização

Caso o layout do site de reservas mude, basta ajustar os ** seletores CSS** no arquivo `content.js` para que a extensão continue encontrando os campos corretamente.

---

## 📌 Melhorias Futuras (Sugestões)

- [ ] Suporte a múltiplos idiomas nas mensagens
- [ ] Histórico de reservas realizadas
- [ ] Opção de editar os dados antes do preenchimento
- [ ] Atalho de teclado para abrir o popup (ex: `Ctrl+Shift+R`)

---

## 👨‍💻 Autor

Desenvolvido por Bruno Ferreira — otimizando processos e eliminando tarefas manuais repetitivas.


