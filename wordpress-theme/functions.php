<?php
/**
 * Larissa Ruza Psicóloga - Theme Functions
 */

// Enqueue styles and fonts
function larissa_ruza_enqueue_assets() {
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap', array(), null);
    wp_enqueue_style('larissa-ruza-style', get_stylesheet_uri(), array(), '1.0');
}
add_action('wp_enqueue_scripts', 'larissa_ruza_enqueue_assets');

// Theme support
function larissa_ruza_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption'));

    register_nav_menus(array(
        'primary' => __('Menu Principal', 'larissa-ruza'),
    ));
}
add_action('after_setup_theme', 'larissa_ruza_setup');

// Custom image sizes
add_image_size('hero-bg', 1920, 1080, true);
add_image_size('about-portrait', 800, 1000, true);
add_image_size('services-img', 800, 600, true);

// Customizer settings
function larissa_ruza_customizer($wp_customize) {
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title' => 'Seção Hero',
        'priority' => 30,
    ));

    $wp_customize->add_setting('hero_bg_image');
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_bg_image', array(
        'label' => 'Imagem de Fundo do Hero',
        'section' => 'hero_section',
    )));

    $wp_customize->add_setting('hero_title', array('default' => 'A mudança começa com um passo.'));
    $wp_customize->add_control('hero_title', array(
        'label' => 'Título do Hero',
        'section' => 'hero_section',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hero_cta_url', array('default' => '#'));
    $wp_customize->add_control('hero_cta_url', array(
        'label' => 'URL do botão CTA',
        'section' => 'hero_section',
        'type' => 'url',
    ));

    // WhatsApp
    $wp_customize->add_section('whatsapp_section', array(
        'title' => 'WhatsApp Flutuante',
        'priority' => 35,
    ));

    $wp_customize->add_setting('whatsapp_number', array('default' => '5511999999999'));
    $wp_customize->add_control('whatsapp_number', array(
        'label' => 'Número do WhatsApp (com DDI)',
        'section' => 'whatsapp_section',
        'type' => 'text',
    ));

    $wp_customize->add_setting('whatsapp_message', array('default' => 'Olá, gostaria de agendar uma sessão.'));
    $wp_customize->add_control('whatsapp_message', array(
        'label' => 'Mensagem padrão',
        'section' => 'whatsapp_section',
        'type' => 'textarea',
    ));

    // Contact Section
    $wp_customize->add_section('contact_section', array(
        'title' => 'Seção Contato',
        'priority' => 40,
    ));

    $wp_customize->add_setting('contact_bg_image');
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'contact_bg_image', array(
        'label' => 'Imagem de Fundo do Contato',
        'section' => 'contact_section',
    )));

    $wp_customize->add_setting('doctoralia_url', array('default' => 'https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3'));
    $wp_customize->add_control('doctoralia_url', array(
        'label' => 'URL do Doctoralia',
        'section' => 'contact_section',
        'type' => 'url',
    ));
}
add_action('customize_register', 'larissa_ruza_customizer');

// Contact form handler
function larissa_ruza_handle_contact() {
    if (!isset($_POST['larissa_contact_nonce']) || !wp_verify_nonce($_POST['larissa_contact_nonce'], 'larissa_contact_form')) {
        wp_die('Requisição inválida.');
    }

    $name = sanitize_text_field($_POST['contact_name'] ?? '');
    $whatsapp = sanitize_text_field($_POST['contact_whatsapp'] ?? '');
    $message = sanitize_textarea_field($_POST['contact_message'] ?? '');

    if (empty($name) || empty($whatsapp) || empty($message)) {
        wp_redirect(home_url('/#contato?error=empty'));
        exit;
    }

    $to = get_option('admin_email');
    $subject = 'Nova mensagem de contato - ' . $name;
    $body = "Nome: $name\nWhatsApp: $whatsapp\n\nMensagem:\n$message";
    $headers = array('Content-Type: text/plain; charset=UTF-8');

    wp_mail($to, $subject, $body, $headers);

    wp_redirect(home_url('/#contato?success=1'));
    exit;
}
add_action('admin_post_nopriv_larissa_contact', 'larissa_ruza_handle_contact');
add_action('admin_post_larissa_contact', 'larissa_ruza_handle_contact');
