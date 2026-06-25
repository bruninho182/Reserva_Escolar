// Função unificada de preenchimento
function preencherDados(data, forcar = false) {
  const setInputValue = (selector, value) => {
    if (!value) return;
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      // Verifica se o campo está visível na tela
      if (element && element.offsetParent !== null) {
        // Só preenche se for forçado (botão do popup) OU se o campo estiver vazio
        if (forcar || element.value === '') {
          element.value = value;
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  };

  // --- TELA 1: Tela Inicial de Verificação ---
  setInputValue('input[placeholder*="Informe o CNPJ"]', data.cnpjEscola);
  
  // --- TELA 2: Etapa 1 de 4 ---
  // AQUI ESTÁ A CORREÇÃO: Comando para preencher o CNPJ na segunda tela
  setInputValue('input[placeholder*="CNPJ da Escola"], input[name*="cnpj"]', data.cnpjEscola);
  
  setInputValue('input[placeholder*="Nome da Escola"], input[name*="nome"]', data.nomeEscola);
  setInputValue('input[placeholder*="Telefone da Escola"], input[name*="telefone"]', data.telefoneEscola);
  setInputValue('input[placeholder*="E-mail da Escola"], input[name*="email"]', data.emailEscola);
  setInputValue('input[placeholder*="CEP da Escola"], input[name*="cep"]', data.cep);
  setInputValue('input[placeholder*="Endereço da Escola"], input[name*="endereco"]', data.endereco);
  setInputValue('input[placeholder*="Número"], input[name*="numero"]', data.numero);
  setInputValue('input[placeholder*="Bairro"], input[name*="bairro"]', data.bairro);
  setInputValue('input[placeholder*="Cidade"], input[name*="cidade"]', data.cidade);
  setInputValue('input[placeholder*="Estado"], input[name*="estado"]', data.estado);
}

// 1. Escuta a ordem quando você clica manualmente no Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "FILL_RESERVATION_FORM") {
    preencherDados(request.payload, true); // O "true" força o preenchimento
    sendResponse({ success: true });
  }
  return true; 
});

// 2. O PULO DO GATO: O "Olheiro" para a Etapa 2
const observer = new MutationObserver(() => {
  // Procura o campo "Nome da Escola" para saber se a Etapa 1 de 4 apareceu na tela
  const campoNomeEscola = document.querySelector('input[placeholder*="Nome da Escola"], input[name*="nome"]');
  
  // Se ele apareceu, está visível e está vazio:
  if (campoNomeEscola && campoNomeEscola.offsetParent !== null && campoNomeEscola.value === '') {
    // Busca os dados que o popup salvou na memória
    chrome.storage.local.get(['reservaData'], (result) => {
      if (result.reservaData) {
        // Preenche tudo sozinho! (O "false" garante que ele não apague o que vc já digitou)
        preencherDados(result.reservaData, false);
      }
    });
  }
});

// Inicia a vigilância no site
observer.observe(document.body, { childList: true, subtree: true });