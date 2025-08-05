// Seleção de quantidade
document.querySelectorAll('.card').forEach(card => {
  const menos = card.querySelector('.menos');
  const mais = card.querySelector('.mais');
  const qtdSpan = card.querySelector('.quantidade');

  let qtd = 0;
  menos.addEventListener('click', () => {
    if (qtd > 0) {
      qtd--;
      qtdSpan.textContent = qtd;
    }
  });
  mais.addEventListener('click', () => {
    qtd++;
    qtdSpan.textContent = qtd;
  });
});

// Finalizar pedido
document.getElementById('finalizar').addEventListener('click', () => {
  const nome = document.getElementById('nomeCliente').value;
  if (!nome) {
    alert("Por favor, digite seu nome!");
    return;
  }

  // pegar produtos
  let mensagem = `Olá, meu nome é ${nome}. Gostaria de fazer o seguinte pedido:\n\n`;
  let total = 0;
  document.querySelectorAll('.card').forEach(card => {
    const qtd = parseInt(card.querySelector('.quantidade').textContent);
    if (qtd > 0) {
      const nomeProduto = card.dataset.nome;
      const preco = parseFloat(card.dataset.preco);
      total += qtd * preco;
      mensagem += `${qtd}x ${nomeProduto} - R$ ${(qtd * preco).toFixed(2)}\n`;
    }
  });

  mensagem += `\nValor total: R$ ${total.toFixed(2)}`;

  if (total === 0) {
    alert("Selecione pelo menos um item antes de finalizar o pedido.");
    return;
  }

  // mostrar popup
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';

  document.getElementById('confirmar').onclick = () => {
    const texto = encodeURIComponent(mensagem);
    const numeroWhatsApp = "556199164794"; // coloque o número real
    window.open(`https://wa.me/${556199164794}?text=${texto}`, "_blank");
    popup.style.display = 'none';
  };

  document.getElementById('cancelar').onclick = () => {
    popup.style.display = 'none';
  };
});
