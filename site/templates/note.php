<?php snippet('header-fixed') ?>
<main>
  <article class="note">
    <header class="note-header"> 
      <h1>
        <?= $page->title() ?><br>
        <?= $page->subtitle() ?>
      </h1>
    </header>
    <div class="note-text text">
      <?= $page->text()->kt() ?>
    </div> 
  </article>
</main>
<?php snippet('footer') ?>
