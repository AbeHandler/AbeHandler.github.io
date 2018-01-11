---
layout: post
title:  "Neural Summarization by Extracting Sentences and Words"
date:   2018-01-10 13:40:53 -0400
categories: summarization neuralnets
---
Title: Neural Summarization by Extracting Sentences and Words
Authors: Jianpeng Cheng and Mirella Lapata
Venue: ACL 2016

I found this paper on neural summarization while searching for neural network approaches
to sentence compression. Mirella Lapata has co-authored [influential papers](http://www.jair.org/media/2433/live-2433-3731-jair.pdf)
on compression using classical methods, so I was curious to read his deep learning approach.
The paper also uses [*pointer networks*](https://arxiv.org/abs/1506.03134), which I have seen in
(other recent)[https://arxiv.org/abs/1704.04368] summarization papers, which was another reason I chose to read this one in depth.
A *pointer network* simplifies the attention mechanism of a sequence-to-sequence model to just output a softmax over the input at each timestep during decoding.

According to Cheng and Lapata (sec 7), the main contributions of the paper are:
  - offering a hierharchical, neural model which creates a summary by choosing words and sentences, which they say reflects "the nature of the summarization task".
  - generation by extraction, by which they mean meaning generating words limited from a single document.

#One of the things I like about studying sentence compression is that it gives you the opportunity to
#really dig down into the nitty-gritty details of how sentences are structured. For instance, looking closely
#at how sentences are structured, helped me learn a lot of universal dependencies.
