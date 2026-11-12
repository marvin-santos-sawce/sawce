'use strict';

const CHATBOT_WHATSAPP = '5551997421676';
const CHATBOT_BOT_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M12 3.5v2" />
    <circle cx="12" cy="2.5" r="1" fill="currentColor" stroke="none" />
    <rect x="4.5" y="6" width="15" height="13" rx="4" />
    <path d="M4.5 11H2.8v3h1.7m15-3h1.7v3h-1.7" />
    <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M9 16h6" />
  </svg>`;
const CHATBOT_CLOSE_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>`;

const chatbotQuestions = [
  {
    question: 'Por que os preços são tão abaixo da média?',
    answer: 'Nossos preços são competitivos porque importamos diretamente da fábrica, reduzindo intermediários e negociando grandes volumes com nossos fornecedores.'
  },
  {
    question: 'Os produtos são originais?',
    answer: 'Trabalhamos com produtos classificados como Mirror 1:1, produzidos com materiais e acabamento premium, sem distribuição oficial das marcas.'
  },
  {
    question: 'Qual a garantia de entrega?',
    answer: 'Todos os pedidos têm rastreamento. Caso o produto não chegue, entre em contato conosco para avaliarmos o reenvio ou a devolução do valor.'
  },
  {
    question: 'Qual o prazo médio?',
    answer: 'O prazo médio é de 20 a 25 dias úteis após a confirmação do pagamento, dependendo da localização e da transportadora.'
  },
  {
    question: 'Como saber o tamanho certo?',
    answer: 'Confira a descrição do produto e a tabela de conversão. Se ainda estiver em dúvida, envie sua altura e peso pelo WhatsApp para receber uma recomendação.'
  },
  {
    question: 'Como funcionam as taxas?',
    answer: 'O valor exibido no site já inclui frete grátis. As formas de pagamento disponíveis são cartão, débito, PIX e boleto.'
  },
  {
    question: 'Vocês entregam no meu estado?',
    answer: 'Sim. A entrega é feita para todo o Brasil.'
  }
];

function createChatbotButton(label, className, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function initChatbot() {
  if (document.getElementById('chatbot-widget')) return;

  const container = document.createElement('div');
  container.id = 'chatbot-widget';
  container.innerHTML = `
    <section class="chatbot-window" id="chatbot-window" aria-label="Atendimento SawceBot" aria-hidden="true">
      <header class="chatbot-header">
        <div class="chatbot-brand">
          <span class="chatbot-avatar">${CHATBOT_BOT_ICON}</span>
          <span class="chatbot-brand-copy">
            <span class="chatbot-header-title">SawceBot</span>
            <span class="chatbot-header-subtitle">Assistente virtual</span>
          </span>
        </div>
        <span class="chatbot-status"><span class="chatbot-status-dot"></span>Online</span>
        <button type="button" class="chatbot-close" id="chatbot-close" aria-label="Fechar chat">${CHATBOT_CLOSE_ICON}</button>
      </header>
      <div class="chatbot-messages" id="chatbot-messages" aria-live="polite"></div>
    </section>
    <a class="whatsapp-float" href="https://wa.me/${CHATBOT_WHATSAPP}" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">
      <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
    </a>
    <button type="button" class="chatbot-btn" id="chatbot-btn" aria-label="Abrir chat de dúvidas" aria-controls="chatbot-window" aria-expanded="false">
      ${CHATBOT_BOT_ICON}
    </button>
  `;
  document.body.appendChild(container);

  const button = container.querySelector('#chatbot-btn');
  const windowElement = container.querySelector('#chatbot-window');
  const closeButton = container.querySelector('#chatbot-close');
  const messages = container.querySelector('#chatbot-messages');

  const appendMessage = (text, type = 'bot') => {
    const message = document.createElement('div');
    message.className = `chat-bubble ${type}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  };

  const showOptions = () => {
    const options = document.createElement('div');
    options.className = 'chat-options-container';

    chatbotQuestions.forEach(item => {
      const option = createChatbotButton(item.question, 'chat-option', () => {
        options.remove();
        appendMessage(item.question, 'user');
        const typing = appendMessage('Digitando...');

        window.setTimeout(() => {
          typing.remove();
          appendMessage(item.answer);
          askFeedback();
        }, 700);
      });
      options.appendChild(option);
    });

    messages.appendChild(options);
    messages.scrollTop = messages.scrollHeight;
  };

  const askFeedback = () => {
    appendMessage('Sua dúvida foi sanada?');
    const feedback = document.createElement('div');
    feedback.className = 'chat-feedback';

    const yes = createChatbotButton('Sim', 'chat-option chat-option--short', () => {
      feedback.remove();
      appendMessage('Sim', 'user');
      appendMessage('Que ótimo! Se precisar de algo mais, é só escolher:');
      showOptions();
    });

    const no = createChatbotButton('Não', 'chat-option chat-option--short', () => {
      feedback.remove();
      appendMessage('Não', 'user');
      appendMessage('Vou redirecionar você para um de nossos atendentes no WhatsApp.');
      window.setTimeout(() => {
        window.open(`https://wa.me/${CHATBOT_WHATSAPP}?text=${encodeURIComponent('Olá, ainda tenho dúvidas.')}`, '_blank', 'noopener,noreferrer');
      }, 700);
    });

    feedback.append(yes, no);
    messages.appendChild(feedback);
    messages.scrollTop = messages.scrollHeight;
  };

  appendMessage('Olá! Sou seu assistente virtual. No que posso ajudar?');
  showOptions();

  const toggle = () => {
    const isOpen = windowElement.classList.toggle('active');
    windowElement.setAttribute('aria-hidden', String(!isOpen));
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Fechar chat de dúvidas' : 'Abrir chat de dúvidas');
    button.innerHTML = isOpen ? CHATBOT_CLOSE_ICON : CHATBOT_BOT_ICON;
  };

  button.addEventListener('click', toggle);
  closeButton.addEventListener('click', toggle);
}

document.addEventListener('DOMContentLoaded', initChatbot);
