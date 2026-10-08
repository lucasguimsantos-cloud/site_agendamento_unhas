/**
 * ANA LUIZA - NAIL DESIGNER
 * Script principal: Sistema de Agendamento, Portfólio e Integração com WhatsApp
 */

// ==========================================
// CONFIGURAÇÕES DO ESTÚDIO (Fácil de alterar)
// ==========================================
const STUDIO_CONFIG = {
  designerName: "Ana Luiza",
  profession: "Nail Designer",
  // Coloque o número do WhatsApp com DDI e DDD (somente números): ex: 5531999998888
  whatsappNumber: "5531999998888",
  instagramHandle: "@analuizanails",
  address: "Rua das Flores, 120 - Centro, Belo Oriente - MG",
  workingDays: [2, 3, 4, 5, 6], // 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
  timeSlots: ["09:00", "11:00", "13:30", "15:30", "17:30"]
};

// ==========================================
// ESTADO DO AGENDAMENTO
// ==========================================
const bookingState = {
  currentStep: 1,
  service: {
    id: "fibra-aplicacao",
    name: "Alongamento em Fibra de Vidro",
    price: 160,
    duration: "2h00"
  },
  shape: "Almond",
  extra: null,
  date: null,
  formattedDate: "",
  time: "14:00",
  clientName: "",
  clientPhone: "",
  clientNotes: ""
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCalendar();
  initServiceSelection();
  initShapeSelection();
  initTimeSelection();
  initFormNavigation();
  initPortfolioFilter();
  initPhotoModal();
  updateSummaryTicket();
});

// ==========================================
// MENU MOBILE
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Fechar ao clicar em qualquer link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// ==========================================
// GERAÇÃO DE DATAS NO CALENDÁRIO
// ==========================================
function initCalendar() {
  const container = document.getElementById("calendarDaysRow");
  if (!container) return;

  container.innerHTML = "";
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const today = new Date();
  let daysAdded = 0;
  let dayOffset = 1; // Começa a partir de amanhã por padrão

  while (daysAdded < 12) {
    const checkDate = new Date();
    checkDate.setDate(today.getDate() + dayOffset);

    const dayOfWeek = checkDate.getDay();

    // Filtra dias em que o estúdio atende
    if (STUDIO_CONFIG.workingDays.includes(dayOfWeek)) {
      const dayPill = document.createElement("div");
      dayPill.className = "day-pill";
      if (daysAdded === 0) {
        dayPill.classList.add("selected");
        setBookingDate(checkDate);
      }

      const weekName = daysOfWeek[dayOfWeek];
      const dayNum = String(checkDate.getDate()).padStart(2, "0");
      const monthName = months[checkDate.getMonth()];

      dayPill.innerHTML = `
        <span class="day-week">${weekName}</span>
        <span class="day-number">${dayNum}</span>
        <span class="day-week" style="font-size:0.65rem; margin-top:2px;">${monthName}</span>
      `;

      dayPill.addEventListener("click", () => {
        document.querySelectorAll(".day-pill").forEach(p => p.classList.remove("selected"));
        dayPill.classList.add("selected");
        setBookingDate(checkDate);
      });

      container.appendChild(dayPill);
      daysAdded++;
    }
    dayOffset++;
  }
}

function setBookingDate(dateObj) {
  bookingState.date = dateObj;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const daysLong = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  bookingState.formattedDate = `${daysLong[dateObj.getDay()]}, ${day}/${month}/${year}`;
  updateSummaryTicket();
}

// ==========================================
// SELEÇÃO DE SERVIÇO
// ==========================================
function initServiceSelection() {
  const serviceCards = document.querySelectorAll(".service-radio-card");

  serviceCards.forEach(card => {
    card.addEventListener("click", () => {
      serviceCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      bookingState.service = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
        duration: card.dataset.duration
      };

      updateSummaryTicket();
    });
  });

  // Botões "Agendar este" nos cards da seção de Valores
  document.querySelectorAll(".service-select-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const serviceId = btn.dataset.serviceId;
      if (serviceId) {
        selectServiceById(serviceId);
      }
    });
  });
}

function selectServiceById(serviceId) {
  const targetRadio = document.querySelector(`.service-radio-card[data-id="${serviceId}"]`);
  if (targetRadio) {
    targetRadio.click();
  }

  // Rola até o agendador suavemente
  const bookingSection = document.getElementById("agendar");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================
// SELEÇÃO DE FORMATO
// ==========================================
function initShapeSelection() {
  const shapeItems = document.querySelectorAll(".shape-item");

  shapeItems.forEach(item => {
    item.addEventListener("click", () => {
      shapeItems.forEach(s => s.classList.remove("selected"));
      item.classList.add("selected");
      bookingState.shape = item.dataset.shape;
      updateSummaryTicket();
    });
  });
}

// ==========================================
// SELEÇÃO DE HORÁRIO
// ==========================================
function initTimeSelection() {
  const timeSlots = document.querySelectorAll(".time-slot");

  timeSlots.forEach(slot => {
    slot.addEventListener("click", () => {
      timeSlots.forEach(s => s.classList.remove("selected"));
      slot.classList.add("selected");
      bookingState.time = slot.dataset.time;
      updateSummaryTicket();
    });
  });
}

// ==========================================
// NAVEGAÇÃO DOS PASSOS DO FORMULÁRIO
// ==========================================
function initFormNavigation() {
  const nextBtn = document.getElementById("btnNextStep");
  const prevBtn = document.getElementById("btnPrevStep");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateStep(bookingState.currentStep)) {
        goToStep(bookingState.currentStep + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToStep(bookingState.currentStep - 1);
    });
  }

  // Monitorar inputs de cliente
  const inputName = document.getElementById("clientName");
  const inputPhone = document.getElementById("clientPhone");
  const inputNotes = document.getElementById("clientNotes");

  if (inputName) {
    inputName.addEventListener("input", (e) => {
      bookingState.clientName = e.target.value;
      updateSummaryTicket();
    });
  }

  if (inputPhone) {
    inputPhone.addEventListener("input", (e) => {
      bookingState.clientPhone = formatPhone(e.target.value);
      e.target.value = bookingState.clientPhone;
      updateSummaryTicket();
    });
  }

  if (inputNotes) {
    inputNotes.addEventListener("input", (e) => {
      bookingState.clientNotes = e.target.value;
    });
  }

  // Botão Final do WhatsApp
  const whatsappBtn = document.getElementById("btnConfirmWhatsApp");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", handleWhatsAppSubmit);
  }
}

function validateStep(step) {
  if (step === 1 && !bookingState.service) {
    alert("Por favor, selecione um procedimento antes de avançar.");
    return false;
  }
  if (step === 3 && (!bookingState.date || !bookingState.time)) {
    alert("Por favor, selecione uma data e horário.");
    return false;
  }
  return true;
}

function goToStep(step) {
  if (step < 1 || step > 4) return;

  bookingState.currentStep = step;

  // Atualizar telas de passo
  document.querySelectorAll(".form-step").forEach(el => el.classList.remove("active"));
  const activeStepEl = document.getElementById(`step-${step}`);
  if (activeStepEl) activeStepEl.classList.add("active");

  // Atualizar barra de indicadores
  document.querySelectorAll(".step-indicator").forEach((ind, idx) => {
    ind.classList.remove("active", "completed");
    const indicatorStep = idx + 1;
    if (indicatorStep === step) {
      ind.classList.add("active");
    } else if (indicatorStep < step) {
      ind.classList.add("completed");
    }
  });

  // Ajustar visibilidade dos botões
  const prevBtn = document.getElementById("btnPrevStep");
  const nextBtn = document.getElementById("btnNextStep");

  if (prevBtn) {
    prevBtn.style.visibility = step === 1 ? "hidden" : "visible";
  }

  if (nextBtn) {
    if (step === 4) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "inline-flex";
    }
  }
}

// ==========================================
// ATUALIZAÇÃO DO RESUMO (TICKET)
// ==========================================
function updateSummaryTicket() {
  const elService = document.getElementById("ticketService");
  const elDuration = document.getElementById("ticketDuration");
  const elShape = document.getElementById("ticketShape");
  const elDateTime = document.getElementById("ticketDateTime");
  const elTotal = document.getElementById("ticketTotal");
  const elClient = document.getElementById("ticketClient");

  if (elService) elService.textContent = bookingState.service?.name || "Não selecionado";
  if (elDuration) elDuration.textContent = bookingState.service?.duration || "--";
  if (elShape) elShape.textContent = bookingState.shape || "Natural / Tradicional";
  
  if (elDateTime) {
    if (bookingState.formattedDate && bookingState.time) {
      elDateTime.textContent = `${bookingState.formattedDate} às ${bookingState.time}`;
    } else {
      elDateTime.textContent = "Data a definir";
    }
  }

  if (elTotal) {
    const price = bookingState.service?.price || 0;
    elTotal.textContent = `R$ ${price.toFixed(2).replace(".", ",")}`;
  }

  if (elClient) {
    elClient.textContent = bookingState.clientName ? bookingState.clientName : "A preencher";
  }
}

// ==========================================
// ENVIO PARA O WHATSAPP
// ==========================================
function handleWhatsAppSubmit() {
  const nameInput = document.getElementById("clientName");
  const phoneInput = document.getElementById("clientPhone");

  if (!bookingState.clientName || bookingState.clientName.trim().length < 2) {
    alert("Por favor, preencha o seu nome completo para confirmar o agendamento.");
    if (nameInput) nameInput.focus();
    return;
  }

  if (!bookingState.clientPhone || bookingState.clientPhone.trim().length < 10) {
    alert("Por favor, informe seu WhatsApp para que possamos confirmar a reserva.");
    if (phoneInput) phoneInput.focus();
    return;
  }

  const message = 
`Olá, ${STUDIO_CONFIG.designerName}! 🌸
Gostaria de solicitar um agendamento de horário feito pelo seu site:

💅 *Procedimento:* ${bookingState.service.name}
📐 *Formato desejado:* ${bookingState.shape}
⏱️ *Duração estimada:* ${bookingState.service.duration}
📅 *Data:* ${bookingState.formattedDate}
⏰ *Horário:* ${bookingState.time}
💰 *Valor estimado:* R$ ${bookingState.service.price.toFixed(2).replace(".", ",")}

👤 *Cliente:* ${bookingState.clientName}
📱 *WhatsApp:* ${bookingState.clientPhone}
${bookingState.clientNotes ? `📝 *Observação:* ${bookingState.clientNotes}\n` : ""}
Você tem esse horário disponível para confirmação? Aguardo seu retorno! ✨`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

// ==========================================
// FILTRO DA GALERIA DE FOTOS
// ==========================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// ==========================================
// MODAL DE ZOOM DE FOTOS
// ==========================================
function initPhotoModal() {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("photoModalImg");
  const closeBtn = document.getElementById("photoModalClose");

  if (!modal || !modalImg || !closeBtn) return;

  document.querySelectorAll(".portfolio-item").forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add("active");
      }
    });
  });

  const closeModal = () => modal.classList.remove("active");
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==========================================
// FORMATADOR DE TELEFONE (MÁSCARA BRASIL)
// ==========================================
function formatPhone(value) {
  value = value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 6) {
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  } else if (value.length > 2) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length > 0) {
    return `(${value}`;
  }
  return value;
}
