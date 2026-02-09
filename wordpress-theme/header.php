<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Psicóloga Larissa Ruza - Psicoterapia online para brasileiros no mundo inteiro. Terapia do Esquema, orientação de carreira e mentoria para imigração.">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <div>
    <div class="logo-text">Larissa Ruza</div>
    <div class="logo-subtitle">PSICOLOGIA</div>
  </div>
  <a href="<?php echo esc_url(get_theme_mod('doctoralia_url', '#')); ?>" class="cta-btn" target="_blank" rel="noopener noreferrer">
    <span class="desktop-only">agende sua<br/>sessão</span>
    <span class="mobile-only" style="display:none;">agendar</span>
  </a>
</header>
