<?php

use Kirby\Cms\Html;
use Kirby\Cms\Url;

/**
 * Default KirbyTags definition
 */
return [

    /* Date */
    'date' => [
        'attr' => [],
        'html' => function ($tag) {
            return strtolower($tag->date) === 'year' ? date('Y') : date($tag->date);
        }
    ],

    /* Email */
    'email' => [
        'attr' => [
            'class',
            'rel',
            'target',
            'text',
            'title'
        ],
        'html' => function ($tag) {
            return Html::email($tag->value, $tag->text, [
                'class'  => $tag->class,
                'rel'    => $tag->rel,
                'target' => $tag->target,
                'title'  => $tag->title,
            ]);
        }
    ],

    /* File */
    'file' => [
        'attr' => [
            'class',
            'download',
            'rel',
            'target',
            'text',
            'title'
        ],
        'html' => function ($tag) {
            if (!$file = $tag->file($tag->value)) {
                return $tag->text;
            }

            // use filename if the text is empty and make sure to
            // ignore markdown italic underscores in filenames
            if (empty($tag->text) === true) {
                $tag->text = str_replace('_', '\_', $file->filename());
            }

            return Html::a($file->url(), $tag->text, [
                'class'    => $tag->class,
                'download' => $tag->download !== 'false',
                'rel'      => $tag->rel,
                'target'   => $tag->target,
                'title'    => $tag->title,
            ]);
        }
    ],

    /* Gist */
    'gist' => [
        'attr' => [
            'file'
        ],
        'html' => function ($tag) {
            return Html::gist($tag->value, $tag->file);
        }
    ],

    /* Image */
    'image' => [
        'attr' => [
            'alt',
            'caption',
            'class',
            'height',
            'imgclass',
            'link',
            'linkclass',
            'rel',
            'target',
            'text',
            'title',
            'width'
        ],
        'html' => function ($tag) {
            if ($tag->file = $tag->file($tag->value)) {
                $tag->src     = $tag->file->url();
                $tag->alt     = $tag->alt     ?? $tag->file->alt()->or(' ')->value();
                $tag->title   = $tag->title   ?? $tag->file->title()->value();
                $tag->caption = $tag->caption ?? $tag->file->caption()->value();
            } else {
                $tag->src = Url::to($tag->value);
            }

            $link = function ($img) use ($tag) {
                if (empty($tag->link) === true) {
                    return $img;
                }
                
                if ($link = $tag->file($tag->link)) {
                    $link = $link->url();
                } else {
                    $link = $tag->link === 'self' ? $tag->src : $tag->link;
                }

                return Html::a($link, [$img], [
                    'rel'    => $tag->rel,
                    'class'  => $tag->linkclass,
                    'target' => $tag->target
                ]);
            };

            $image = Html::img($tag->src, [
                'width'  => $tag->width,
                'height' => $tag->height,
                'class'  => $tag->imgclass,
                'title'  => $tag->title,
                'alt'    => $tag->alt ?? ' '
            ]);

            if ($tag->kirby()->option('kirbytext.image.figure', true) === false) {
                return $link($image);
            }

            // render KirbyText in caption
            if ($tag->caption) {
                $tag->caption = [$tag->kirby()->kirbytext($tag->caption, [], true)];
            }

            return Html::figure([ $link($image) ], $tag->caption, [
                'class' => $tag->class
            ]);
        }
    ],

    /* Link */
    'link' => [
        'attr' => [
            'class',
            'lang',
            'rel',
            'role',
            'target',
            'title',
            'text',
            'caption'
        ],
        'html' => function ($tag) {
            if (empty($tag->lang) === false) {
                $tag->value = Url::to($tag->value, $tag->lang);
            }

            return Html::a($tag->value, $tag->text, [
                'rel'    => $tag->rel,
                'class'  => $tag->class,
                'role'   => $tag->role,
                'title'  => $tag->title,
                'target' => $tag->target,
            ]);
        }
    ],

    /* Tel */
    'tel' => [
        'attr' => [
            'class',
            'rel',
            'text',
            'title'
        ],
        'html' => function ($tag) {
            return Html::tel($tag->value, $tag->text, [
                'class' => $tag->class,
                'rel'   => $tag->rel,
                'title' => $tag->title
            ]);
        }
    ],

    /* Twitter */
    'twitter' => [
        'attr' => [
            'class',
            'rel',
            'target',
            'text',
            'title'
        ],
        'html' => function ($tag) {

            // get and sanitize the username
            $username = str_replace('@', '', $tag->value);

            // build the profile url
            $url = 'https://twitter.com/' . $username;

            // sanitize the link text
            $text = $tag->text ?? '@' . $username;

            // build the final link
            return Html::a($url, $text, [
                'class'  => $tag->class,
                'rel'    => $tag->rel,
                'target' => $tag->target,
                'title'  => $tag->title,
            ]);
        }
    ],

    /* Video */
    'video' => [
        'attr' => [
            'class',
            'caption',
            'height',
            'width'
        ],
        'html' => function ($tag) {
            $video = Html::video(
                $tag->value,
                $tag->kirby()->option('kirbytext.video.options', [])
            );

            return Html::figure([$video], $tag->caption, [
                'class'  => $tag->class  ?? $tag->kirby()->option('kirbytext.video.class', 'video'),
                'height' => $tag->height ?? $tag->kirby()->option('kirbytext.video.height'),
                'width'  => $tag->width  ?? $tag->kirby()->option('kirbytext.video.width'),
            ]);
        }
    ],


        'plyr-video' => [
            'attr' => [
            
                'url',
                'title',
                'caption'
            ],

            'html' => function($tag) {
                return    
                // movie file embed    
                '<video id="player" playsinline crossorigin controls>
                    <source src="'. $tag->url. '" type="video/mp4" />
                </video>
                <figcaption><p class="col-2">'. $tag->title .'</p><p class="col-2">'. $tag->caption .'</p></figcaption>';
                
                //youtube embedfor dummy
                // '<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="'. $tag->url. '"></div>
                // <figcaption><p class="col-2">'. $tag->title .'</p><p class="col-2">'. $tag->caption .'</p></figcaption>';
            }
        ],

        'plyr-audio' => [
            'attr' => [
                'url',
                'title',
                'caption'
            ],

            'html' => function($tag) {
                return        
                '<audio id="player" controls>
                    <source src="'. $tag->url . '.mp3" type="audio/mp3" />
                    <source src="'. $tag->url . '.ogg" type="audio/ogg" />
                </audio>
                <figcaption><p class="col-2">'. $tag->title .'</p><p class="col-2">'. $tag->caption .'</p></figcaption>';
            }
        ],

        /* code */

        'iframe' => [
            'attr' => [
                'url',
                'title',
                'caption'
            ],

            'html' => function($tag) {
                return        
                '<iframe ' . 'src="' . $tag->url . '"style="width: 100%; min-height: 400px; overflow: hidden;" scrolling="no" frameborder="0"></iframe> 
                <figcaption><p class="col-2">'. $tag->title .'</p><p class="col-2">'. $tag->caption .'</p></figcaption>';
            }
        ],

        /*html*/

        // 'code' => [
        //     'attr' => [
        //         'url',
        //         'title',
        //         'caption'
        //     ],

        //     'html' => function($tag) {
        //         return        
        //         '<iframe ' . 'src="' . $tag->url . '"></iframe> 
        //         <pre><code class="plaintext">...</code></pre>'           
        //     }
        // ],

        /* image */

        'img' => [
            'attr' => [
                'url',
                'title',
                'caption'
        
            ],

            'html' => function($tag) {
                return        
                '<img alt=""'.'src="' . $tag->url . '">
                <figcaption><p class="col-2">'. $tag->title .'</p><p class="col-2">'. $tag->caption .'</p></figcaption>';

            }
        ],





];
