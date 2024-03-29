<?php snippet('header-fixed') ?>
<main>
  <article class="note">
    <header class="note-header"> 
      <h1 class="list">
        <span class="subtitle"><?= $page->subtitle() ?></span><br>
        <span class="title"><?= $page->title() ?></span>
      </h1>
    </header>
    <div class="note-text text">
      <?= $page->text()->kt() ?>
      <div class="pt-l license">The content displayed in this page is part of the publication Being Material 
Cambridge, MA : The MIT Press, 2019, hosted by MIT Libraries, MIT Libraries, Distinctive Collections department.</h4>
    </div> 
  </article>
</main>
<?php snippet('footer') ?>
