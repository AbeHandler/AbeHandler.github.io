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
  - generation by extraction, by which they mean generating output, using words from a single document (rather than the vocabulary of the whole corpus).

The paper is a nice synthesis and extension of much recent work on neural summarization using sequence-to-sequence models, such as [Rush, Chopra, Weston (2015)](https://arxiv.org/pdf/1509.00685.pdf).

### Nutshell

The authors collect gold standard summaries by downloading article/highlight summary summary pairs from the DailyMail, [a common dataset](https://arxiv.org/pdf/1606.02858.pdf). They then use a series of hand-written rules to identify which sentences from an article ''match a highlight''. They also filter articles with highlights containing words which are *not* drawn from a given document, as their model generates ''by extraction''.

Using this DailyMail dataset for supervision, the authors present a somewhat complex, multi-component neural network model which:

1.  uses a convolutional neural network (CNN) to create a sentence embedding for each sentence in the input document
2. feeds the sequence of sentence embeddings into an LSTM to create a document embedding
3. decodes the document embedding timestep-by-timestep
4. uses the state of the decoder as input to a **hierarchical** attention mechanism over first (a) each sentence in the document and then (b) each word type in the document to finally generate a word for the output sequence.

They then evaluate their model against competing approaches using ROUGE scores on the [DUC 2002](http://duc.nist.gov/) and DailyMail datasets.

The authors argue that that step 4 is a hybrid of extractive and true abstractive summarization. In many respects, step 4 (section 4.3 in the paper) represents the major contribution of the work.

### Details
- In section 4.3, the authors present a model which generates a word in a summary instead of a label for each sentence in the input sequence. Doesn't this then imply that the summary must have as many word tokens as the number of sentences in the document? If so, this is a sort of strange constraint for a model. If the pitch for this approach is that it offers a model which reflects "the nature of the summarization task", this seems like a significant limitation.
