<?php snippet('header') ?>
<main>
  <div class="intro">
    <!-- <div class="col-2"></div>
    <div class="col-2">
        <h3>
        Edited by 
        <span class="name">Marie-Pier Boucher,</span>
        <span class="name">Stefan Helmreich,</span>
        <span class="name">Leila W. Kinney,</span>
        <span class="name">Skylar Tibbits,</span>
        <span class="name">Rebecca Uchill, </span>
        and
        <span class="name">Evan Ziporyn</span>
        </h3>
    </div> -->
    <!-- <div id="gallery">
      <div></div>
      <div></div>

    </div> -->
  </div>
  <?php 
    $quotes = array(
      array("we need to understand how processes that may seem immaterial in character function within, and even rearrange, the material conditions of pro­duction, distribution, communication, and circulation", "Boucher, Helmreich, Kinney, Tibbits, Uchill, and Ziporyn"),
      array("the digital world has become more and more entan­gled with the physical realm rather than less and less", "Skylar Tibbits"),
      array("Every programming language is a distinct material.","Ben Fry and Casey Reas"),
      array("how do we harness the precision of machines without losing the creativity of individuals?","Nadya Peek"),
      array("matter is not simply natural; it is not just given but also revealed and assembled by working on the world.","Benjamin Bratton"),
      array("Together we are exploring the flaws and inaccuracies of algorithms, and what may happen if artificial intelligence gets it wrong","Christina Agapakis and Lucy McRae"),
      array("rethink what tools and people belong in gendered spaces","Christina Agapakis and Lucy McRae"),
      array("The media give us a disembodied experience of looking at events through a screen. It removes us from brutality by censoring and prefabricating the reports that we are supposed to interpret as reality.","Michelle Tolini Finamore, quoting Hussein Chalayan"),
      array("I seek to make social alienation visible by exploring relations between bodies and architecture /space and in relation to nomadism and migration.","Azra Akšamija"),
      array("How do computers see? What values are necessary for a computer to recognize a face? Do computers see all faces alike and ascribe the same values to what they see?","Hyphen-Labs"),
      array("A crucial element of the development of science and technology is for it to be transparent and accessible to the fringes of culture—to everybody.","Lucy McRae"),
      array("all media must be understood in terms of the supports that permit them to operate and circulate, all the way down to the elemental composition of satellite dishes, electric grids, and physical data centers that house ‘the cloud’","Rebecca Uchill and Stefan Helmreich"),
      array("Sometimes, despite how much money a corporation has or how many politicians have accepted favors or hearty friendships with lobbyists, the project should not go ahead, in the interests of the public.","Winona LaDuke"),
      array("When we began planning the ‘Being Material’ symposium, none of us could anticipate its unfolding in the dramatic context of an urgent, nationwide call to support art, science and the humanities.","Leila W. Kinney, preface"),
      array("In the texts and artifacts gathered here, we offer an account of how the digital and the material are together brokering new scientific, physical, social, and political forms.","Boucher, Helmreich, Kinney, Tibbits, Uchill, and Ziporyn"),
      array("The masses of carbon-dense exoskeletons and endoskeletons accumulating under pressure over geological time furnish the fuels we can’t seem to stop burning.","Claire Pentecost"),
      array("money itself—what we think of as money—is generally one part of a collection of infrastructures for the transfer of value","Bill Maurer"),
      array("most images are made by machines for other machines","Trevor Paglen"),
      array("If the infrastructural involves the process of organizing and operating a sociotechnical system that is distributed across territory and sustained over time as well as ways of thinking about that system, then the animal is inherently part of this process.","Lisa Parks"),
      array("if material things often bear traces of their conditions of production and circulation that are invisible to the unaided eye (as carbon footprints, as toxic waste, as chemical residue) how might this demand new ways of seeing the environments around us, and of reckoning with our responsibilities for them?","Rebecca Uchill and Stefan Helmreich"),
      array("To confront a life in commodified, objectified, and stereotyped form is simultaneously to expose the cruelty and absurdity of the sociological processes that would allow for such a human-to-thing transformation, and to resacralize that human life by way of the disconnection that such a revelation lays bare between one’s lived experience and one’s effigy. It is to be a narrator.","Sandy Alexandre"),
      array("Formaldehyde protects home construction materials from insect, bacteria, and fungal decay while also hastening the decay of human inhabitants.","Nicholas Shapiro"),
      array("‘eyes,’ in the age of new kinds of optical and photographic mediation, fresh sorts of computational imagining, and novel projects in physical cloaking, are ever-changing material things and networks","George Barbastathis"),
      array("It can be argued that every person living today who engages with music is also engaged with teasing out what is material from what is not.","Evan Ziporyn"),
    );
    $id = rand (0,22);
  ?>
  <div class="quotes">
  &ldquo;<?= $quotes[$id][0] ?>&rdquo; 
  <div class="byline">— <?= $quotes[$id][1] ?></div>
  </div>
</main>
<?php snippet('footer') ?>
