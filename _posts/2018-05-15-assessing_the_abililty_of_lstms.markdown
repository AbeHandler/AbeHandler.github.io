---
layout: post
title:  "Assessing the Ability of LSTMs to Learn Syntax-Sensitive Dependencies"
date:   2018-05-15
categories: syntax LSTMs
---
* Title: Assessing the Ability of LSTMs to Learn Syntax-Sensitive Dependencies [PDF](https://arxiv.org/pdf/1611.01368.pdf)
* Authors: Tal Linzen, Emmanuel Dupoux and Yoav Goldberg
* Venue: TAACL (2016)

LSTMs are sequence models, which represent natural language as an incremental
series of symbols. This is different from hierarchical models (e.g. PCFGs) which
represent language using nested structures. This very straightforward and well-executed
paper asks: to what extent can LSTM sequence models can learn syntactic dependencies?
Such dependencies might be more obviously encoded with hierarchical, rather than sequence, representations.

<br>

Because LTSMs are often said to
learn long-range relationships between words (syntactic or otherwise), understanding
their capacity to learn particular syntactic constraints would help illuminate
both the strengths and weaknesses of using LSTMs for language technologies.

<br>

The authors focus
on a particular syntactic dependency, subject--verb agreement, which is "typically regarded as
evidence for hierarchical structure in human language". The paper tests if RNNs
can represent this dependency between subject and verb.

<br>


More concretely, the authors introduce a new "number prediction" task in which
a LSTM is shown a sentence of words up to a given verb. The network is then trained to predict if the verb is singular
or plural, using a logistic regression classifier over features from the final hidden state of the RNN.

<br>

In English, if the subject of a 3rd person present tense verb is singular, the
verb must be singular. If the subject is plural, the verb must be plural. For instance,
we say that "the key**s** **are** on the table" and "the key **is** on the table."
The subject and verb must agree.
<br>


The primary empirical contribution of this paper is testing the performance of
LSTMs on this number prediction task. The authors automatically generate a corpus
of more than a million number prediction problems from English Wikipedia (using
dependency parses to find correct answers) and then train a traditional LSTM
to read in an input sequence and then predict the number of the verb.
They also test a baseline version of this classifier
which only uses a sequence of preceding nouns, without access to function words.
<br>


In general, the authors find that LSTMs perform well at this task, achieving an error rate of only .83%.
<br>


However, there are many nuances to this finding.
In some cases, there may be many intervening words
between the subject and the verb. For instance, we might say: "the keys, which
my friend left for me in my *house* before his *trip* to *Boston*, are on the table".
Here the subject **keys** agrees with the verb **are**, even though there are many
intervening nouns (*house*, *trip*, *Boston*). A sequence model which learns syntactic dependencies
would be able to ascertain that *keys* should agree with *are*, even with such intervening
nouns. The paper calls such nouns "agreement attractors", citing [Bock and Miller, 1991](
https://www.ncbi.nlm.nih.gov/pubmed/2001615)). The paper finds that the error rate increases with the number of agreement attractors. This makes sense, as it is more challenging for the LSTM to determine which of the preceding nouns determines the number
of the upcoming verb. The authors also find a higher error rate for the noun-only model, which suggests that LSTMs make use of grammatical function words to predict a
verb's number.

<br>

The authors also perform PCA on the word vectors from the model and then assigning
each vector with its expected (most common) POS tag from the corpus. The PCA
results show two distinct clusters in the low-dimensional representation,
corresponding to singular and plural nouns. This provides some intuition about why the LSTM appears to have at least some capacity to represent the information necessary for correctly resolving syntactic dependencies: singular and plural nouns are more likely to appear in certain regions of vector space.

<br>


The authors also report results for several alternative training methods: one in which
the network is allowed to see the form of a verb before making a prediction
(this should make the network's job easier by allowing semantic matching between
subject and verb), one in which the network decides if a sentence is grammatical
and one in which the network predicts the verb with a standard language model (using the relative probabilities of the singular and plural forms of the verb).
Notably, the language model, which receives no explicit symbol for verb number,
performs worse than systems directly trained on predicting the form of the subsequent verb. This might mean that standard neural network LMs need
explicit training signals to learn syntactic dependencies.

<br>


The authors conclude their paper by discussing and summarizing their results.
They point out that LSTMs are able to learn one particular syntactic
dependency with explicit supervision, but that standard language models have higher
error rates for this task without such supervision. One extension of this research would be to then modify LM training to make use of syntactic supervision.
