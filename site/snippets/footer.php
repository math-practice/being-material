 </div>
</div>
  <footer data-step='2' class='step' >
    <div class="wrapper">
      <!--artist list-->
      <?php if ($notePage = page('programmable')): ?>
            <span class="list-title"><?= $notePage->title() ?></span>
            <ul class="list">
              <?php foreach ($notePage->children()->listed() as $album): ?>
                <li>
                  <a href="<?= $album->url() ?>">
                   <span><?= $album->subtitle() ?></span><br>
                   <span class="indent"><?= $album->title() ?></span>
                  </a>
                </li>
              <?php endforeach ?>
            </ul>
      <?php endif ?>
      <?php if ($notePage = page('wearable')): ?>
            <span class="list-title"><?= $notePage->title() ?></span>
            <ul class="list">
              <?php foreach ($notePage->children()->listed() as $album): ?>
              <li>
                <a href="<?= $album->url() ?>">
                  <span><?= $album->subtitle() ?></span><br>
                  <span class="indent"><?= $album->title() ?></span>
                </a>
              </li>
              <?php endforeach ?>
            </ul>
      <?php endif ?>
      <?php if ($notePage = page('livable')): ?>
            <span class="list-title"><?= $notePage->title() ?></span>
            <ul class="list">
              <?php foreach ($notePage->children()->listed() as $album): ?>
              <li>
                  <a href="<?= $album->url() ?>">
                   <span><?= $album->subtitle() ?></span><br>
                   <span class="indent"><?= $album->title() ?></span>
                  </a>
                </li>              
              <?php endforeach ?>
            </ul>
      <?php endif ?>
      <?php if ($notePage = page('audible')): ?>
            <span class="list-title"><?= $notePage->title() ?></span>
            <ul class="list">
              <?php foreach ($notePage->children()->listed() as $album): ?>
              <li>
                  <a href="<?= $album->url() ?>">
                   <span><?= $album->subtitle() ?></span><br>
                   <span class="indent"><?= $album->title() ?></span>
                  </a>
                </li>              
                <?php endforeach ?>
            </ul>
      <?php endif ?>
      <div class="credit col-2">
        <p><?= $site->title() ?></p>
        <p>Cambridge, MA : The MIT Press, 2019</p>
        <p>Based on April 21-22, 2017 symposium entitled Being Material, presented by The MIT Center for Art, Science & Technology</p>
        <a href="http://mit.edu" target="_blank">&copy; <?= date('Y') ?> Massachusetts Institute of Technology</a>
          <?php if ($about = page('about')): ?>
          <?php endif ?>
      </div>
    </div>
  </footer>
<!-- Plyr resources and browser polyfills are specified in the pen settings -->
<script src="https://cdn.plyr.io/3.5.6/plyr.js"></script>
<script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,Array.prototype.includes,CustomEvent,Object.entries,Object.values,URL'></script>
<script src='https://unpkg.com/plyr@3'></script>
<script src="<?= $site->url() ?>/assets/js/script.js"></script>  
<script src="<?= $site->url() ?>/assets/js/scrollama.js"></script>
<script>
//https://github.com/sampotts/plyr/#initialising
// const players = Plyr.setup('.js-player');
//single video
// const player = new Plyr('video', { captions: { active: true } });
//single audio
// const player = new Plyr('#player');
//multiple 
const players = Plyr.setup('#player');
player.toggleControls(false)

player.on('play', event => {
     player.toggleControls(true);
});
  </script>
</body>
</html>
