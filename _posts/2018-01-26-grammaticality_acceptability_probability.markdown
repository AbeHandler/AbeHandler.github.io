---
layout: post
title:  "Grammaticality, Acceptability and Probability"
date:   2018-01-26 13:40:53 -0400
categories: acceptability linguistics
---
* Title: Grammaticality, Acceptability and Probability [PDF](http://delivery.acm.org/10.1145/980000/974190/p310-jing.pdf?ip=74.105.10.86&id=974190&acc=OPEN&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E6D218144511F3437&CFID=850146679&CFTOKEN=43433700&__acm__=1515685122_a0b141d0232617369741d8940165acb6)
* Authors: Jey Han Lau, Alexander Clark, Shalom Lapin
* Venue: Cognitive Science

### Nutshell

One of the things I really like about NLP is that it intersects with philosophy,
linguistics and cognitive science. This paper comes from that interesting middle
area. The authors use language models (from NLP) to predict which sentences are
acceptable and which sentences are not acceptable. They then use the accuracy of
such predictions to claim that "linguistic knowledge can be intrinsically probabilistic".

I want to mostly focus on what they authors did in the paper, then briefly summarize
their much deeper claims about the nature of human linguistic knowledge.

In linguistics, an **[acceptability judgement](http://www.socsci.uci.edu/~jsprouse/papers/Judgment%20data.pdf)** is a self-reported human description of the naturalness or wellformedness of a linguistic expression. Acceptability judgements can inform theories involving many, many areas of linguistics. How to solicit and interpret such judgements is a major topic within the field. In natural language processing, a **[language model](https://en.wikipedia.org/wiki/Language_model)** assigns a probability to a sequence of words. The basic idea of this paper is that language models (from NLP) can be used to predict acceptability. 
