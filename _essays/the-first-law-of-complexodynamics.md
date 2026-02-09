---
title: "The First Law of Complexodynamics"
subtitle: "Why interesting systems rise, peak, and fade"
byline: "Shravan Reddy &middot; February 2026"
description: "Takeaways from Scott Aaronson's The First Law of Complexodynamics: why interestingness can rise and fall while entropy still increases."
twitter_description: "Why interestingness rises and falls even when entropy only goes up."
date_published: "2026-02-08"
og_image: "/static/og-the-first-law-of-complexodynamics.png"
---
Ilya Sutskever recommended [30 papers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE) with a tantalizing promise: "If you really learn all of these, you'll know 90% of what matters today." This essay is my takeaway from Scott Aaronson's [*The First Law of Complexodynamics*](https://scottaaronson.blog/?p=762).
{: .lede}
The statement posed at the beginning of this article (not really a paper) is "why does 'complexity' or 'interestingness' of physical systems seem to increase with time and then hit a maximum and decrease, in contrast to the entropy, which of course increases monotonically?"

It's easy enough to understand intuitively why the entropy in a system increases. But how interesting that system looks first rises, then peaks, and finally drops. The author uses milk being poured into espresso as an analogy: perfectly separate layers are tidy but dull, the swirling marbled phase is mesmerizing, and the final homogeneous mocha is... boring again. An alternative example would be ice crystals (low entropy) vs. a jar of mixed sand (high entropy). Both of these would still be considered simple. In between the two is something like snow (medium entropy), which is composed of snowflakes with impossibly complex patterns.

To formalize the term interesting, the author introduces Kolmogorov complexity. Sidenote: it's amusing how academic authors introduce new concepts. The exact statement in the paper is "Recall that the Kolmogorov complexity of a string x is the length of the shortest computer program that outputs x." I recall no such thing...

Anyway, KC is defined as the number of bits in the shortest computer program to reproduce a string. Ordered patterns like AAAA... compress into a tiny loop, so they have low KC. A truly random 1000-bit string has no shorter representation, so its KC is 1000 itself. My main takeaway from this section was to think of KC as a means to measure "lossless compression." If the KC is low, then it can be compressed without any data loss. If it's high, then the level of compression possible is minimal.

But the paradox the author points out is that high-KC random strings don't feel sophisticated. You can summarize everything about the random string in six words: "It came from fair coin flips."

So if KC alone doesn't capture what we mean by interesting, we need something else. Sophistication (or "complextropy") captures a second measure - how many bits does it take to specify a model that captures the regularities in the data? Pure order takes barely any description. Pure noise doesn't need much either, since the only rule is basically "just randomness all the way down." The sweet spot is in between, where you need a non-trivial model and some extra bits to pick out one particular instance. That middle zone - snowflakes, marbled coffee, Shakespeare's prose - all match our gut feeling of maximum interestingness.

My main takeaway from this article was that training a neural network is glorified compression. The optimal weight configurations can capture vast datasets with as few bits as possible along with their structure. Too small a model and you underfit like an ice crystal. Too large and you memorize noise like that random string. Compression is insight; randomness isn't inherently interesting; and peak complexity is fleeting.
