<?php snippet('header') ?>

<main>
  <header class="intro">
    <h1><?= $page->title() ?></h1>
  </header>
  <div class="notes">
    <?php foreach ($notepage->children()->listed()->sortBy('date', 'desc') as $alubum): ?>
    <article class="note">
      <header class="note-header">
        <a href="<?= $alubum->url() ?>">
          <h2><?= $alubum->title() ?></h2>
        </a>
      </header>
    </article>
    <?php endforeach ?>
  </div>

</main>

<?php snippet('footer') ?>
