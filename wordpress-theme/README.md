# Tema WordPress - Larissa Ruza Psicóloga

## Instalação

1. Copie a pasta `wordpress-theme` e renomeie para `larissa-ruza`
2. Coloque dentro de `wp-content/themes/`
3. Copie as imagens do site para a pasta `larissa-ruza/assets/`:
   - `hero-main.jpg`
   - `lari-about.png`
   - `services-image1.png`
   - `services-image2.png`
   - `contact-bg.jpg` (ou use a imagem de fundo da seção de contato)
4. Adicione um `screenshot.png` (1200x900px) na raiz do tema
5. Ative o tema em **Aparência > Temas**

## Personalização

Acesse **Aparência > Personalizar** para editar:

- **Seção Hero**: imagem de fundo e título
- **WhatsApp Flutuante**: número e mensagem padrão
- **Seção Contato**: imagem de fundo e URL do Doctoralia

## Formulário de Contato

O formulário envia emails para o email do administrador do WordPress.
Nenhum plugin adicional é necessário.

## Estrutura de Arquivos

```
larissa-ruza/
├── style.css        # Estilos do tema
├── functions.php    # Funções e configurações
├── header.php       # Cabeçalho
├── footer.php       # Rodapé + WhatsApp flutuante
├── index.php        # Página principal (todas as seções)
├── screenshot.png   # Preview do tema (você precisa criar)
└── assets/          # Imagens (você precisa copiar)
```
