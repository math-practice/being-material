<?php snippet('header-fixed') ?>
<main>
  <article class="note">
    <header class="note-header">
      <h1>
        <?= $page->title() ?><br>
        <?= $page->subtitle() ?>
      </h1>
      <?php if ($page->tags()->isNotEmpty()) : ?>
      <?php endif ?>
    </header>
    <div class="note-text text">
      <?= $page->text()->kt() ?>
    </div>
    


    <!-- <video width="320" height="240" controls>
      <source src="<?= $page->link() ?>" type="video/mp4">
      <source src="video: <?= $page->link() ?>" type="video/ogg">
      Your browser does not support the video tag.
    </video> -->

    <!-- <iframe width="560" height="315" src="(video: <?= $page->link() ?>) " frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
    <figcaption><?= $page->caption() ?></figcaption>


    <!-- <?php foreach($page->images() as $file): ?>
      <figure><img src="<?= $file->url() ?>"  alt="<?= $file->title() ?>"></figure>
      <figcaption> <?= $file->caption() ?></figcaption>
    <?php endforeach ?> -->
  </article>
</main>
<?php snippet('footer') ?>
