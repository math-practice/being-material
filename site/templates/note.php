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
      <h4 class="pt-m">The content displayed in this page is part of the publication Being Material 
Cambridge, MA : The MIT Press, 2019, hosted by MIT Libraries.</h4>
    </div> 
  </article>
</main>
<?php snippet('footer') ?>
