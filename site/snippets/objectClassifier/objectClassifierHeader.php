
<?= css(['assets/css/objectClassifier.css']) ?>

<?= js([
	'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/addons/p5.dom.min.js',
	'https://unpkg.com/ml5@0.3.1/dist/ml5.min.js',
	'assets/js/ObjectClassifier-v1.js'
]) ?>
<!-- https://rawgit.com/leigler/BookClassifier/master/ObjectClassifier.js -->
<!-- start live video -->
<script>
  let startVideo = () => {
    Site.classifier = new p5( ObjectClassifier, 'sketch');
    document.querySelector("#startVideo").style.display = "none";
  }

</script>