/* ═══════════════════════════════════════════════
   SAWCE COMPANY — Tracking v1.2 (Redirect Mode)
   ═══════════════════════════════════════════════ */

'use strict';

const trackingForm = document.getElementById('tracking-form');
const trackingCode = document.getElementById('tracking-code');
const errorDiv = document.getElementById('tracking-error');
const loadingDiv = document.getElementById('tracking-loading');
const resultDiv = document.getElementById('tracking-result');

trackingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Limpa e padroniza o código digitado
  const code = trackingCode.value.trim().toUpperCase();

  // Validações básicas antes de rodar a animação
  if (!code) {
    showError('Por favor, insira um código de rastreamento.');
    return;
  }

  if (code.length !== 13) {
    showError('Código inválido. Deve conter exatamente 13 caracteres.');
    return;
  }

  // Ativa a animação de load e esconde mensagens antigas
  showLoading(true);
  if (errorDiv) errorDiv.classList.add('hidden');
  if (resultDiv) resultDiv.classList.add('hidden');

  // Aguarda exatamente 2 segundos (2000 milissegundos)
  setTimeout(() => {
    showLoading(false);
    
    // Monta a URL oficial com o parâmetro que os Correios exigem
    const url = `https://rastreamento.correios.com.br/app/index.php?objeto=${code}`;
    
    // REDIRECIONAMENTO:
    // Opção A: Redirecionar na MESMA ABA (Mais seguro contra bloqueadores de pop-up)
    window.location.href = url;
    
    // Opção B: Se preferir abrir em NOVA ABA, comente a linha de cima e use a de baixo:
    // window.open(url, '_blank');
  }, 2000);
});

function showLoading(show) {
  if (loadingDiv) loadingDiv.classList.toggle('hidden', !show);
}

function showError(message) {
  const errorMsgElem = document.getElementById('error-message');
  if (errorMsgElem) errorMsgElem.textContent = message;
  if (errorDiv) errorDiv.classList.remove('hidden');
}

// Menu Mobile (Mantido caso sua estrutura de página utilize)
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
});