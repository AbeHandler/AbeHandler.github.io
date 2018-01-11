---
layout: post
title:  "Sentence Reduction for Automatic Text Summarization"
date:   2018-01-11 13:40:53 -0400
categories: summarization compression
---
* Title: Sentence Reduction for Automatic Text Summarization [PDF](http://delivery.acm.org/10.1145/980000/974190/p310-jing.pdf?ip=74.105.10.86&id=974190&acc=OPEN&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E6D218144511F3437&CFID=850146679&CFTOKEN=43433700&__acm__=1515685122_a0b141d0232617369741d8940165acb6)
* Authors: Hongyan Jing
* Venue: Applied Natural Language Processing Conference (2000)

### Discussion

This is a very early sentence compression paper from Hongyan Jing, a student of [Kathleen McKeown](http://www.cs.columbia.edu/~kathy/). It was really interesting for me to read because I've looked at a bunch of recent work on the same topic. One thing which is striking is the deep similarity between this work and later approaches to sentence compression. The core concerns in Jing (2000), [Filipova and Strube](http://www.aclweb.org/anthology/W08-1105) (2008) and [Clarke and Lapata](http://www.jair.org/papers/paper2433.html) (2010) are quite similar: the goal is to retain ''important'' portions of a source sentence while retaining grammaticality. The techniques for determining how to automatically meet these criteria have shifted, but in many ways the basic ideas are the same. Of course, [recent](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43852.pdf) sentence compression [papers]({% post_url 2018-01-09-neural-summarization-by-extracting-sentences-and-words %})



Jing uses an importance score based on WordNet.

to take a look at this one. One thing which was really striking was
