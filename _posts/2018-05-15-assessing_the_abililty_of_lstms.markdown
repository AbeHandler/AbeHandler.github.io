LSTMs are sequence models which represent natural language as an incremental
series of symbols. This is different from hierarchical models (e.g. PCFGs) which
represent language using nested structures. This very straightforward and well-executed
paper asks: to what extent can LSTM sequence models can learn syntactic dependencies,
which might be more obviously encoded with hierarchical representations. The authors focus
on a particular syntactic dependency, subject--verb agreement, which is "typically regarded as
evidence for hierarchical structure in human language". This paper tests if RNNs
can represent this dependency between subject and verb.

The authors make this question concrete by presenting a new "number prediction" task:
a LSTM is shown a sentence of words up to a given verb. The network is then trained to predict if the verb is singular
or plural, using a logistic regression classifier over features from the final hidden state of the RNN.

This task offers clearcut way to examine if LSTMs can learn syntactic relationships between
words in a sequence. In English, if the subject of a 3rd person present tense verb is singular, the
verb must be singular. If the subject is plural, the verb must be plural. For instance,
we say that "the key**s** **are** on the table" and "the key **is** on the table."
The subject and verb must agree. The previous examples are simple.
But as the authors point out, it is possible to include many intervening words
between the subject and the verb. For instance, we might say: "the keys, which
my friend left for me in my house before his trip to Boston, are on the table".
Here the subject keys agrees with the verb are, even though there are many
intervening nouns (house, trip, Boston). A sequence model which learns syntactic dependencies
would be able to ascertain that "keys" should agree with "are", even with such intervening
nouns. The paper calls such nouns "agreement attractors", citing [Bock and Miller, 1991](
https://www.ncbi.nlm.nih.gov/pubmed/2001615)).



One typical selling point for LTSMs is that they can try to learn long-range dependencies
between words, unlike an ngram model which only looks at a few (almost always less than five or six) prior symbols.
In this work, the authors ask: can LSTMs learn such syntactic information.

Because syntactic parses (e.g. a dependency parse) can represent the dependency
between subjects and verbs, the authors can easily create a large corpus for the
number prediction task (they use English Wikipedia).



One simple heuristic, in principle available to sequence models, is simply using
the most recent noun to predict the upcoming verb.

The authors thus introduce an additional challenge for the LSTM, by specifically
examining cases with such "agreement attraction errors."
is a noun with an opposite number from the target verb which occurs in the sequence
between the subject and the verb.

The primary empirical contribution of this paper is testing the performance of
LSTMs on the number prediction task. The authors automatically generate a corpus
of more than a million number prediction problems and train a traditional LSTM
to read in an input sequence and then predict the number of the verb with a
logistic regression classifier. They also test a baseline version of this classifier
which only uses a sequence of preceding nouns without access to function words.

In general, LSTMs perform well at this task, achieving an error rate of only .83%
with an increased error of 4.5% for the noun only model. The authors note that
this suggests that LSTMs make use of grammatical function words to predict a
verb's number. Similarly, error rates increased as one or more intervening
attractors were added to the number prediction problem, with dramatically decreasing
performance for the noun only models.

The authors perform PCA on the word vectors from the model while also assigning
each vector with its expected (most common) POS tag from the corpus. The PCA
results show two distinct clusters in the low-dimensional representation,
corresponding to singular and plural nouns.

The authors also report results for several auxilliary experiments: one in which
the network is allowed to see the form of a verb before making a prediction
(this should make the network's job easier by allowing semantic matching between
subject and verb), one in which the network decides if a sentence is grammatical
and one in which the network predicts the verb with a standard language model.
Notably, the language model, which receives no explict symbol for verb number,
performs very poorly on the task, compared with fully supervised methods.
The authors interpret this to mean that standard neural network LMs need
explicit training signals to learn syntactic dependencies.

The authors conclude their paper by discussing and summarizing their results.
They point out that LSTMs are able to learn one particular syntactic
dependency with explicit supervision but that language models, without such supervision,
perform poorly. One extension of this research would be to then modify LM training
to make use of syntactic supervision.
