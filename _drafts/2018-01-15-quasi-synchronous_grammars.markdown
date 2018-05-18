---
layout: post
title:  "Quasi-Synchronous Grammars"
date:   2018-01-15 13:40:53 -0400
categories: formalisms MT
---
* Quasi-Synchronous Grammars: [PDF](https://www.cs.jhu.edu/~dasmith/qg_smt_2006.pdf)
* Authors: David A. Smith and Jason Eisner
* Venue: Workshop on Statistical Machine Translation, 2006

### Introduction

This paper from David A. Smith and Jason Eisner introduces a new formalism, a
''Quasi-Synchronous Grammar" (QG), motivated by problems in machine translation. I found it via [Woodsend and Lapata (2010)](http://www.aclweb.org/anthology/D11-1038), which applies the formalism to sentence simplification. I've also seen such grammars applied to [question answering](https://www.aclweb.org/anthology/D/D07/D07-1003.pdf). Given that QGs seem to be a (somewhat obscure) part of the [NLP research world](http://repository.cmu.edu/cgi/viewcontent.cgi?article=1205&context=lti) and because I am sort of sick reading [modifications]({% post_url 2018-01-09-neural-summarization-by-extracting-sentences-and-words %}) of [Bandanau et al. 2014](https://arxiv.org/abs/1409.0473) I decided to really dig into Smith and Eisner's approach.

At a high level, the paper does the following:
1. Introduce the QG formalism
2. Describe how to parameterize a probabilistic QG
3. Evaluate a QG on a machine translation task.

## The formalism

QGs are an extension of an earlier formalism: the synchronous grammar.  $$T_1$$
