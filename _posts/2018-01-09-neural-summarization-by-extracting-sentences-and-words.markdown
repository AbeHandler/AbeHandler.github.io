---
layout: post
title:  "Neural Summarization by Extracting Sentences and Words"
date:   2018-01-10 13:40:53 -0400
categories: summarization neuralnets
---
* Title: Neural Summarization by Extracting Sentences and Words
* Authors: Jianpeng Cheng and Mirella Lapata
* Venue: ACL 2016

### Introduction

I found this paper on neural summarization while searching for neural network approaches
to sentence compression. Mirella Lapata has co-authored [influential papers](http://www.jair.org/media/2433/live-2433-3731-jair.pdf)
on compression using classical methods, so I was curious to read his deep learning approach.
The paper also uses [*pointer networks*](https://arxiv.org/abs/1506.03134), which I have seen in
[other recent](https://arxiv.org/abs/1704.04368) summarization papers, another reason I chose to read this one in depth.

According to Cheng and Lapata (sec 7), the main contributions of the paper are:
  - offering a hierarchical, neural model which creates a summary by choosing words and sentences, which they say reflects "the nature of the summarization task".
  - generation by extraction, by which they mean generating abstractively, using words limited from a single document (rather than the vocabulary of the whole corpus).

### Nutshell

The authors collect gold standard summaries by downloading article/highlight summary summary pairs from the DailyMail (a common summarization dataset). They then use a series of rules (see section 3) to identify which sentences from an article ''match a highlight''. They filter out articles whose highlights contain words which are not drawn from a given document, as they employ model which generates ''by extraction''.

Using this DailyMail dataset for supervision, the authors present a somewhat complex neural network model which:

1.  uses a convolutional neural network (CNN) to create a sentence embedding for each sentence in the input document
2. feeds the sequence of sentence embeddings into an LSTM to create a document embedding
3. decodes the document embedding timestep-by-timestep, attending to the importance of each sentence in the timestep
4. and then using the state of the decoder, attends to first each sentence of the document and then each word in the document to select a word type from the document for the output sequence.

The authors call step 4 ''hierarchical attention.''

###### Model details

 The model in this paper synthesises a number of
