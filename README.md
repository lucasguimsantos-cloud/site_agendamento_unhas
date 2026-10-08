# Site de Agendamento - Ana Luiza Nail Designer

Site de agendamento online de alto padrão desenvolvido com base no modelo visual de referência.

---

## 💅 O que foi incluído no site

1. **Cabeçalho Idêntico ao Modelo**:
   - Logomarca elegante: *Ana Luiza - Nail Designer*
   - Menu de navegação rápido: *Valores*, *Trabalhos*, *Agendar*, *Atendimento*, *Endereço*.
   - Botão de ação rápida para agendamento.
   - 100% responsivo para celulares e computadores.

2. **Destaque Principal (Hero Section)**:
   - Moldura circular central com os anéis metálicos dourados concêntricos e iluminação suave idêntica à referência enviada.
   - Frase institucional: `"ATENDIMENTO SOMENTE COM HORÁRIO MARCADO"`.
   - Botões de chamada para ação imediata.

3. **Valores & Procedimentos (Cardápio de Serviços)**:
   - Cards com duração aproximada, descrição e preço:
     - Alongamento em Fibra de Vidro (R$ 160)
     - Manutenção de Fibra (R$ 110)
     - Banho de Gel / Blindagem (R$ 90)
     - Esmaltação em Gel (R$ 75)
     - Nail Art / Francesinha Reversa (a partir de R$ 35)
     - Spa dos Pés Completo (R$ 80)
   - Botão **"Agendar este"** em cada card que já seleciona o serviço automaticamente no agendador.

4. **Galeria de Trabalhos (Portfólio Interativo)**:
   - Fotos profissionais em alta definição com acabamento refinado.
   - Filtros por técnica (Fibra de Vidro, Nail Art, Gel, Banho de Gel).
   - Modal com zoom ao clicar nas fotos.

5. **Agendamento Inteligente em 4 Etapas com WhatsApp**:
   - **Passo 1:** Procedimento desejado
   - **Passo 2:** Formato da unha (Almond, Quadrada, Bailarina, Stiletto, Oval, Redonda)
   - **Passo 3:** Data no calendário dinâmico e escolha do horário disponível
   - **Passo 4:** Nome da cliente e WhatsApp
   - **Resumo ao Vivo:** Cartão estilo "ticket de luxo" atualizado em tempo real.
   - **Botão "Confirmar no WhatsApp":** Ao clicar, abre o WhatsApp da Nail Designer com a mensagem pronta e formatada com todos os dados da reserva.

6. **Orientações e Políticas**:
   - Tolerância de 15 minutos, sinal de reserva de horário, biossegurança (autoclave) e prazo de manutenção.

7. **Localização & Endereço**:
   - Card completo com horários de funcionamento e botões diretos para abrir rota no **Google Maps** e **Waze**.

---

## 🚀 Como testar no seu computador

Basta dar um duplo clique no arquivo [`index.html`](file:///c:/Users/USUARIO%20DE%20DROGA/Downloads/PROJETOS/site-agendamento-unhas/index.html) para abrir diretamente no navegador (Edge, Chrome, Opera, etc.). Não precisa de servidor nem de instalar nenhum programa.

---

## ⚙️ Como personalizar o WhatsApp e dados do estúdio

Abra o arquivo [`js/main.js`](file:///c:/Users/USUARIO%20DE%20DROGA/Downloads/PROJETOS/site-agendamento-unhas/js/main.js) e altere o bloco no topo:

```javascript
const STUDIO_CONFIG = {
  designerName: "Ana Luiza",
  profession: "Nail Designer",
  whatsappNumber: "5531999998888", // Coloque o número com DDD (apenas números)
  instagramHandle: "@analuizanails",
  address: "Rua das Flores, 120 - Centro, Belo Oriente - MG",
  workingDays: [2, 3, 4, 5, 6], // Dias de atendimento (Terça a Sábado)
  timeSlots: ["09:00", "11:00", "13:30", "15:30", "17:30"]
};
```
