<?php get_header(); ?>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg" style="background-image: url('<?php echo esc_url(get_theme_mod('hero_bg_image', get_template_directory_uri() . '/assets/hero-main.jpg')); ?>')"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1><?php echo esc_html(get_theme_mod('hero_title', 'A mudança começa com um passo.')); ?></h1>
    <a href="<?php echo esc_url(get_theme_mod('hero_cta_url', get_theme_mod('doctoralia_url', '#'))); ?>" class="hero-btn" target="_blank" rel="noopener noreferrer">
      <span>Agende sua sessão</span>
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
    </a>
  </div>
</section>

<!-- ABOUT -->
<section class="about-section" id="sobre">
  <div class="container">
    <div class="about-grid">
      <div class="about-text">
        <h2>Conheça sua psicóloga</h2>
        <p>Eu sou <strong>Lari Ruza (CRP 06/157739)</strong>, uma psicóloga nômade que já viveu e aprendeu em diferentes cantos do mundo — do Brasil à Espanha, Irlanda e além. Essa trajetória sem fronteiras aumenta minha percepção sobre as <strong>possibilidades que surgem a cada novo passo</strong>.</p>
        <p>Formada em <strong>Terapia do Esquema</strong> pelo Wainer e NJ/NYC Institute for Schema Therapy, em formação em <strong>Terapias de Terceira Geração</strong> pela Universidad Europea Miguel de Cervantes (Espanha) e pós graduanda em <strong>Terapias Contextuais</strong> pela PUC-PR, desenvolvo um espaço de acolhimento onde integro essas abordagens. Também trago comigo uma bagagem de <strong>11 anos de experiência em RH, mentoria de carreira e liderança</strong>, onde reúno prática e sensibilidade para potencializar cada etapa da sua transformação.</p>
        <p>Acredito que toda <strong>mudança</strong> — geográfica, profissional ou de alma, abre espaço para reescrever sua história e revelar novos sentidos. E eu posso te apoiar nesse caminho.</p>
      </div>
      <div class="about-image">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/lari-about.png" alt="Larissa Ruza - Psicóloga" />
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="services-section" id="servicos">
  <div class="container">
    <div class="services-grid">
      <div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/services-image2.png" alt="Psicoterapia online" style="border-radius: 0.5rem;" />
      </div>
      <div>
        <h2>Meu trabalho é dedicado em:</h2>
        <?php
        $services = array(
          'Psicoterapia online para brasileiros no mundo inteiro (adolescentes e adultos).',
          'Psicodiagnóstico e tratamento terapêutico para transtornos de humor e personalidade.',
          'Mentoria e orientação de carreira.',
          'Mentoria preparatória para imigração.',
        );
        foreach ($services as $service) : ?>
          <div class="service-item">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <p><?php echo esc_html($service); ?></p>
          </div>
        <?php endforeach; ?>

        <div style="margin-top: 3rem;">
          <p style="color: var(--text-gray); margin-bottom: 1.5rem;">Atualmente sou membro das seguintes associações:</p>
          <img src="<?php echo get_template_directory_uri(); ?>/assets/services-image1.png" alt="Associações" style="width: 50%; border-radius: 0.5rem;" />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section" id="depoimentos">
  <div class="container">
    <h2>O que dizem nossos pacientes</h2>
    <p class="testimonials-subtitle">Depoimentos reais de pessoas que transformaram suas vidas através da terapia</p>
    <div class="testimonials-grid">
      <?php
      $testimonials = array(
        array('name' => 'Erica', 'comment' => 'Foi a minha primeira consulta, e ja amei! O posicionamento dela, o olhar de atenção a empatia e os insights de visão sobre os assuntos. Ela é maravilhosa e indico desde ja!', 'date' => '30 de julho de 2025'),
        array('name' => 'LP', 'comment' => 'Ter a habilidade de escutar e acolher, é um diferencial para quem sofre, e senti isso por parte da Larissa, me senti acolhida e segura.', 'date' => '7 de julho de 2025'),
        array('name' => 'Joana', 'comment' => 'Adoro a Lari, ela me ajuda muito! Me sinto acolhida e sem julgamentos, as consultas são leves', 'date' => '31 de maio de 2025'),
        array('name' => 'Marina Reis', 'comment' => 'A Larissa é uma profissional super acolhedora, com escuta ativa e perguntas que ajudam no processo de imigração que estou passando. Me sinto confortável durante toda a sessão.', 'date' => '7 de maio de 2025'),
        array('name' => 'Julia', 'comment' => 'A Larissa tem uma escuta que acolhe de verdade, sabe olhar pro outro com empatia e sem julgamentos. É o tipo de profissional que faz a gente se sentir à vontade logo de cara.', 'date' => '2 de maio de 2025'),
        array('name' => 'Renata F.', 'comment' => 'A Larissa me ajudou a encontrar caminhos pra entender coisas que eu nem sabia que precisava. Ela tem uma gentileza ímpar, delicada, firme e é super dedicada.', 'date' => '30 de abril de 2025'),
      );
      foreach ($testimonials as $t) : ?>
        <div class="testimonial-card">
          <div class="testimonial-stars">
            <?php for ($i = 0; $i < 5; $i++) : ?>
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <?php endfor; ?>
          </div>
          <p class="testimonial-comment">"<?php echo esc_html($t['comment']); ?>"</p>
          <div class="testimonial-author">
            <p class="name"><?php echo esc_html($t['name']); ?></p>
            <p class="verified">Paciente verificado • <?php echo esc_html($t['date']); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CONTACT CTA -->
<section class="contact-section" style="background-image: url('<?php echo esc_url(get_theme_mod('contact_bg_image', get_template_directory_uri() . '/assets/contact-bg.jpg')); ?>')">
  <div class="contact-overlay"></div>
  <div class="contact-content">
    <h2>Autocuidado aonde você estiver.</h2>
    <p>
      <span class="contact-highlight">As sessões de terapia tem duração de 50 min e</span><br/>
      <span class="contact-highlight">acontecem 100% online, com total sigilo e segurança.</span>
    </p>
    <a href="<?php echo esc_url(get_theme_mod('doctoralia_url', 'http://bit.ly/psilariruza')); ?>" class="contact-cta" target="_blank" rel="noopener noreferrer">
      <span>PARA AGENDAR CLIQUE AQUI</span>
      <span class="arrow-circle">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </span>
    </a>
  </div>
</section>

<!-- CONTACT FORM -->
<section class="contact-form-section" id="contato">
  <div class="container">
    <h2>Entre em contato</h2>
    <?php if (isset($_GET['success'])) : ?>
      <p style="text-align:center; color: green; margin-bottom: 1rem;">Mensagem enviada com sucesso!</p>
    <?php endif; ?>
    <form class="contact-form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
      <input type="hidden" name="action" value="larissa_contact" />
      <?php wp_nonce_field('larissa_contact_form', 'larissa_contact_nonce'); ?>
      <div class="form-group">
        <label for="contact_name">Nome</label>
        <input type="text" id="contact_name" name="contact_name" required placeholder="Seu nome completo" />
      </div>
      <div class="form-group">
        <label for="contact_whatsapp">WhatsApp</label>
        <input type="tel" id="contact_whatsapp" name="contact_whatsapp" required placeholder="+55 11 99999-9999" />
      </div>
      <div class="form-group">
        <label for="contact_message">Mensagem</label>
        <textarea id="contact_message" name="contact_message" required placeholder="Escreva sua mensagem..."></textarea>
      </div>
      <button type="submit" class="form-submit">Enviar mensagem</button>
    </form>
  </div>
</section>

<?php get_footer(); ?>
