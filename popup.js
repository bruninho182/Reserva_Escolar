function parseTextToJSON(text) {
  const data = {};
  data.cnpjEscola = text.match(/CNPJ da escola:\s*([\d\.\-\/]+)/i)?.[1]?.replace(/\D/g, '') || '';
  data.nomeEscola = text.match(/Nome completo da escola:\s*(.+)/i)?.[1]?.trim() || '';
  data.telefoneEscola = text.match(/Telefone da escola:\s*([\d\s\(\)\-]+)/i)?.[1]?.trim() || '';
  data.emailEscola = text.match(/E-mail da escola:\s*([^\s]+@[^\s]+)/i)?.[1]?.trim() || '';
  data.cep = text.match(/CEP:\s*([\d\-]+)/i)?.[1]?.trim() || '';
  
  if (/Particular/i.test(text)) data.tipoEscola = "Particular";
  else if (/Pública/i.test(text)) data.tipoEscola = "Pública";
  else data.tipoEscola = "";

  data.nomeResponsavel = text.match(/Nome completo do responsável da reserva:\s*(.+)/i)?.[1]?.trim() || '';
  data.telefoneResponsavel = text.match(/Telefone do responsável:\s*([\d\s\.\-\(\)]+)/i)?.[1]?.trim() || '';
  
  const addressLine = text.match(/(?:^|\n)([^:\n]+?),\s*(\d+)\s*-\s*([^,\n]+?),\s*([^,\n]+?)\s*-\s*([A-Z]{2})/i);
  if (addressLine) {
    data.endereco = addressLine[1].trim();
    data.numero = addressLine[2].trim();
    data.bairro = addressLine[3].trim();
    data.cidade = addressLine[4].trim();
    data.estado = addressLine[5].trim();
  }

  const agencyMatch = text.match(/([^\n]+Turismo[^\n]*)/i);
  data.agencia = agencyMatch ? agencyMatch[1].trim() : '';

  return data;
}

document.getElementById('btnProcess').addEventListener('click', async () => {
  const rawText = document.getElementById('rawText').value;
  const statusDiv = document.getElementById('statusMessage');

  if (!rawText.trim()) {
    statusDiv.textContent = "Erro: Cole o texto antes de processar.";
    statusDiv.className = "status-error";
    return;
  }

  statusDiv.textContent = "Processando informações...";
  statusDiv.className = "status-idle";

  const extractedData = parseTextToJSON(rawText);

  // Salva os dados estruturados na memória (necessário para o "olheiro" da Etapa 2)
  chrome.storage.local.set({ reservaData: extractedData });

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!activeTab || !activeTab.url.includes("reservaescolar.com.br")) {
    statusDiv.textContent = "Erro: Abra a página de reservas primeiro.";
    statusDiv.className = "status-error";
    return;
  }

  chrome.tabs.sendMessage(activeTab.id, {
    action: "FILL_RESERVATION_FORM",
    payload: extractedData
  }, (response) => {
    if (chrome.runtime.lastError) {
      statusDiv.textContent = "Erro ao se comunicar com a página.";
      statusDiv.className = "status-error";
    } else if (response && response.success) {
      statusDiv.textContent = "Formulário preenchido com sucesso!";
      statusDiv.className = "status-success";
      
      // AQUI ESTÁ A MÁGICA: Limpa a caixa de texto após o sucesso
      document.getElementById('rawText').value = '';
      
    } else {
      statusDiv.textContent = "Falha ao injetar dados na página.";
      statusDiv.className = "status-error";
    }
  });
});