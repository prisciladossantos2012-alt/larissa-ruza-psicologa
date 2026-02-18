
# Integrar Formulario de Contato com HubSpot

## Problema
O HubSpot nao consegue detectar o formulario porque ele e renderizado via React (SPA) e o envio padrao e bloqueado com `preventDefault`. O HubSpot precisa de um formulario HTML nativo presente no carregamento da pagina.

## Solucao Recomendada: Envio via HubSpot Forms API

Em vez de tentar fazer o HubSpot capturar o formulario automaticamente (o que e incompativel com SPAs React), vamos enviar os dados diretamente para a API do HubSpot apos o envio bem-sucedido do formulario. Isso garante que os leads aparecem no HubSpot sem precisar mudar a arquitetura do formulario.

## Passos

### 1. Atualizar a Edge Function `send-contact-email`
Apos enviar o email via Resend, fazer uma chamada adicional para a API de Forms do HubSpot para registrar o contato.

- Endpoint: `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}`
- Portal ID: `51092703`
- Form ID: sera necessario criar um formulario no HubSpot e obter o ID (ou usar a API de Contacts diretamente)

A chamada sera feita no servidor (edge function) para nao depender do comportamento do navegador.

### 2. Alternativa mais simples: API de Contacts
Usar a API de Contacts do HubSpot (`POST /crm/v3/objects/contacts`) para criar o contato diretamente. Isso requer uma API Key do HubSpot configurada como secret.

### 3. Fluxo atualizado

```text
Usuario preenche formulario
        |
        v
Edge Function recebe dados
        |
        +---> Envia email via Resend (existente)
        |
        +---> Cria contato no HubSpot via API (novo)
        |
        v
Retorna sucesso ao usuario
```

### 4. Configuracao necessaria

- Criar um formulario no painel do HubSpot para obter o `formGuid` (ID do formulario)
- OU configurar uma API Key/Private App Token do HubSpot como secret na edge function

## Secao Tecnica

### Arquivo: `supabase/functions/send-contact-email/index.ts`
- Adicionar chamada para `https://api.hsforms.com/submissions/v3/integration/submit/51092703/{formGuid}` apos o envio do email
- Mapear os campos: `firstName`, `lastName`, `email`, `phone` (whatsapp)
- A API de Forms do HubSpot nao requer autenticacao, apenas o portalId e formGuid
- Incluir `hutk` (cookie do HubSpot) se disponivel, passando do frontend

### Arquivo: `src/components/ContactForm.tsx`
- Capturar o cookie `hubspotutk` do navegador e envia-lo junto com os dados do formulario para a edge function
- Isso permite ao HubSpot associar o submit com a sessao de rastreamento do visitante

## Pergunta necessaria
Para prosseguir, preciso saber: voce ja criou um formulario dentro do HubSpot? Se sim, qual o ID dele? Se nao, posso usar a API de Forms com submissao direta — basta criar um formulario basico no HubSpot com os campos nome, email e telefone.
