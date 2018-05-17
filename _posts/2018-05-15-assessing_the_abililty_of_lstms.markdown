LSTMs are sequence models which represent natural language as an incremental
series of symbols. This contrasts with hierarchical models (e.g. PCFGs) which
represent language using nested structures. This very straightforward and well-executed
paper asks: to what extent can LSTM sequence models can learn syntactic dependencies?
The authors assert that subject--verb agreement is "typically regarded as
evidence for hierarchical structure in human language". They test if RNNs
can represent this dependency between subject and verb.

The authors focus on a new "number prediction" task: an LSTM is shown a sentence
up to a given verb. The network is then trained to predict if the verb is singular
or plural.

In English, if the subject of a 3rd person present tense verb is singular, the
verb must be singular. If the subject is plural, the verb must be plural. For instance,
we say "the key**s** **are** on the table" and "the key **is** on the table."
The subject and verb must agree.

These examples are simple, but as the authors point out, it is possible to
include many intervening words between the subject and the verb. For instance,
we might say: "the keys, which my friend left for me in my house before his trip
to Boston, are on the table". Here the subject keys agrees with the verb are,
even though there are many intervening nouns (house, trip, Boston).

One typical selling point for LTSMs is that they can try to learn long-range dependencies
between words, unlike an ngram model which only looks at a few (almost always less than five or six) prior symbols.
In this work, the authors ask: can LSTMs learn such syntactic information.

A syntactic
parse (e.g. a dependency parse) can represent the dependency between the word
keys and the word are. But of course LSTMs do not have access to such information.
