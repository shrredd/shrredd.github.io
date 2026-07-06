---
title: "Underhyped and Overvalued"
subtitle: "AI can be an Industrial Revolution and still be a bad investment at the wrong price"
byline: "Shravan Reddy &middot; July 2026"
description: "AI can transform the economy without producing explosive near-term GDP growth and create extraordinary companies without making trillion-dollar outcomes ordinary."
twitter_description: "AI can be an Industrial Revolution and still be a bad investment at the wrong price."
date_published: "2026-07-02"
---

I recently attended a Stripe event where Elad Gil interviewed Patrick Collison. Elad asked what GDP growth Patrick expects from AI, while noting that he'd just been in a room of VCs who had converged on doubling or tripling U.S. GDP over the next decade.

Patrick's answer was far more measured: **5% annualized real growth**.
{: .lede}

Since GDP records began in 1929, only the 1940s averaged more than 5% a year, and that required a world war. So it's telling that the discourse around AI has shifted so far that even the *cautious* take in the room implies the strongest peacetime decade in American history. 

Two things can be true at once: AI can be a genuinely transformative technology, and the value many companies are priced to capture from it can still be wildly overstated.


## The forecasts don't support the hype

The 2-3x GDP numbers appear to come from a misreading of Dario Amodei's Machines of Loving Grace,[^mlg] which described a "dream scenario" of 20% growth in the *developing* world, not a base case for the U.S. 

The actual published forecasts are much lower. Here’s how major institutions and labs stack up as expected average annual U.S. real GDP growth over the next decade (on top of the ~2% baseline):

![Chart of AI growth forecasts as average annual U.S. real GDP growth over the next decade. Published forecasts cluster just above the ~2% no-AI baseline: Acemoglu, the CBO, and Goldman's 2026 read near 2.1%, Penn Wharton 2.2%, the OECD's 2025 estimate 2.3–2.9%, the IMF's 2026 U.S. forecast at 2.4%, and Anthropic's 2026 revision at 2.4–2.5% after cutting its original 2025 estimate of ~3.8%. The beliefs in the room sit far higher: Collison at 5% and the VC-room consensus at 7.2–11.6% if a 2–3x economy is meant.](/static/images/ai-industrial-revolution/forecast-ladder.png){: .article-img width="800" loading="lazy"}

Sources: Acemoglu,[^acemoglu] CBO,[^cbo] Penn Wharton,[^wharton] OECD,[^oecd] IMF,[^imf] Goldman Sachs,[^goldman2026] Anthropic.[^anthropic2025]
{: .article-img-caption}

Most published forecasts cluster under 3% a year, with Anthropic's revised 2026 estimate[^anthropic2026] sitting at 2.5%. Even Goldman Sachs, which once anchored the bull case,[^goldman2023] now finds no meaningful economy-wide productivity link from AI so far.[^goldman2026]

## Historical context makes the gap obvious

For perspective, here’s average annual U.S. real GDP growth by decade:

![Column chart of average annual U.S. real GDP growth by decade, 1900s through 2020s. Every decade sits between 1 and 4.5 percent except the 1940s at 5.6 percent. A dashed line marks Collison's 5 percent scenario, and a shaded band at 7.2 to 11.6 percent marks the VC-room claim if 2 to 3x referred to the GDP level.](/static/images/ai-industrial-revolution/us-gdp-growth-by-decade.png){: .article-img width="800" loading="lazy"}

Computed from BEA real GDP via FRED;[^fred] pre-1929 bars are Maddison Project[^maddison] estimates; the 2020s run through 2025.
{: .article-img-caption}

Only the 1940s exceeded 5%, and the room’s implied 7–12% numbers have no modern precedent.


## Faster tasks don't equal a faster economy

If AI makes a lawyer twice as fast at drafting contracts, you haven't doubled legal output. The client, negotiations, and court system still move at their old pace.

This is Amdahl’s law in practice[^amdahl]. Only a fraction of work is exposed to AI, only some of that is worth automating, and even then the time savings are partial.

Rough math: 20% of tasks exposed × 25% worth fully automating × under 30% time saved = roughly 1.5% of total work hours freed up. Spread over a decade, that adds just a fraction of a percentage point to annual GDP growth.

Patrick made the same point from operating Stripe. In sales, engineering, and product, output per person is climbing, and those teams have continued hiring aggressively, because there's always more to build and more markets to expand into. All of which ultimately translate into more revenue.

In back office functions like compliance and G&A, however, the calculus is different. The work simply gets *cheaper*. No CFO closes the books twice as often because the close got faster. For a lot of white-collar work, AI mostly just reduces costs, and there's only so much cost to cut.


## Every previous revolution was slow at first

Yes, software spreads faster than steam engines or electricity, and AI adoption has been unusually quick.[^adoption] But every previous general-purpose technology still took decades to show up in productivity statistics.

Steam power barely moved British productivity before 1830[^crafts]. Electricity took roughly 40 years because factories had to be rebuilt around it[^david]. Computers were "everywhere but in the productivity statistics" until the late 1990s.

The gains are real: they just require reorganizing work and institutions around the new technology. That takes time.

## The productivity J-curve is the realistic path

A more likely outcome is the classic pattern of the productivity J-curve[^jcurve] seen with previous technologies:

![The productivity J-curve: measured productivity dips below the prior trend during early adoption of a general-purpose technology, then rises well above it years later. A marker suggests AI is currently near the crossing point.](/static/images/ai-industrial-revolution/productivity-j-curve.png){: .article-img width="800" loading="lazy"}

Adapted from Brynjolfsson, Rock, and Syverson (2021).
{: .article-img-caption}

Measured productivity often dips or stays flat during the messy early adoption and reorganization phase, then rises sharply later. We’re likely still near the bottom of that curve.


## One Anthropic doesn't create a new base rate

A slower-growing economy doesn’t prevent individual companies from becoming enormous. But it does make today’s valuations much harder to justify.

Anthropic reached a $965 billion post-money[^seriesh] in May 2026, just five years after its Series A,[^seriesa] on a ~$47 billion revenue run rate. OpenAI[^openai] took more than a decade to reach $852 billion. The revenue ramps[^ramps] at Anthropic and OpenAI are among the fastest in business history.

Here’s how long it historically took major companies to reach $1 trillion in value[^trillion]:

![Bar chart of years from founding to a one trillion dollar valuation: Microsoft 44, Apple 42, NVIDIA 30, Amazon 24, SpaceX 24 via a private mark in the xAI merger, Alphabet 21, Tesla 18, Meta 17. OpenAI is at about 10 years and 852 billion dollars, Anthropic at 5 years and 965 billion, neither yet at a trillion.](/static/images/ai-industrial-revolution/trillion-club-timelines.png){: .article-img width="800" loading="lazy"}

SpaceX's $1T is a private mark from the February 2026 xAI merger.[^spacex] OpenAI and Anthropic haven't crossed $1T; both are shown at their mid-2026 marks.
{: .article-img-caption}

Zero-to-near-trillion in five years has basically never happened. Anthropic showed that it's possible. But, two companies riding the same wave doesn't make it a repeatable base rate you can bank a portfolio strategy on.


## The early-stage frenzy is even more aggressive

While the big labs are further along, the neolabs are pricing in even more aggressive outcomes. Some have raised billions at multi-billion-dollar valuations with little to no product. AI captured over 65% of U.S. venture funding last year.[^nvca]

The math is unforgiving at these levels. Even strong outcomes can deliver disappointing returns when the entry price is this high. History[^pastor] shows this pattern clearly — during the Railway Mania of the 1840s, investors correctly identified a real technological revolution but still lost heavily because they overpaid for uncertain winners.


## Three separate bets

People often collapse three distinct questions into one. 
- Will AI create enormous value? → Very likely yes.
- Will this company capture a durable share of that value? → Much harder. It depends on whether AI grows their customers' revenue or mostly cuts their customers’ costs, and whether future models strengthen or commoditize their position.
- Does today’s price leave room for attractive returns? → Only if the entry valuation, future dilution, and value capture all work out favorably.

The internet created far more value than almost anyone expected in 1999. Most of it still went to users and to companies that didn’t exist yet.

## Both things are true

Even if we grant the most optimistic plausible scenario, sustained 5% growth, the investment case at current frontier valuations still isn’t automatic.

AI doesn’t need to double GDP to create extraordinary companies.
One extraordinary company doesn’t make trillion-dollar outcomes ordinary.

The technology can be underhyped in its long-term importance while being overvalued at today’s prices in the near term.

The technology can win.
A company can win.
And the investor can still lose.
{: .closing}


## Footnotes
[^mlg]: Dario Amodei, [Machines of Loving Grace](https://darioamodei.com/essay/machines-of-loving-grace).
[^anthropic2025]: [Anthropic, Estimating Productivity Gains from AI](https://www.anthropic.com/research/estimating-productivity-gains).
[^anthropic2026]: [Anthropic Economic Index, January 2026 report](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report).
[^acemoglu]: Daron Acemoglu, [The Simple Macroeconomics of AI](https://www.nber.org/papers/w32487) (NBER Working Paper 32487).
[^cbo]: [Congressional Budget Office, Publication 62105](https://www.cbo.gov/publication/62105).
[^wharton]: [Penn Wharton Budget Model, The Projected Impact of Generative AI on Future Productivity Growth](https://budgetmodel.wharton.upenn.edu/p/2025-09-08-the-projected-impact-of-generative-ai-on-future-productivity-growth/).
[^oecd]: [OECD, Macroeconomic Productivity Gains from Artificial Intelligence in G7 Economies](https://www.oecd.org/en/publications/macroeconomic-productivity-gains-from-artificial-intelligence-in-g7-economies_a5319ab5-en.html) (2025; supersedes the 2024 "Miracle or Myth" paper).
[^goldman2023]: Goldman Sachs, [Generative AI Could Raise Global GDP by 7%](https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent) (2023).
[^goldman2026]: [Goldman finds no meaningful economy-wide link between AI and productivity](https://fortune.com/2026/03/03/goldman-earnings-ai-anxiety-no-meaningful-impact-productivity-economy-30-percent-in-2-areas/) (Fortune, reporting Goldman Sachs research, March 2026).
[^imf]: [IMF sees steady global growth in 2026 as AI boom offsets trade headwinds](https://www.theglobeandmail.com/business/economy/article-international-monetary-fund-global-growth-forecast-2026/) (IMF World Economic Outlook, January 2026; U.S. 2026 growth forecast 2.4%).
[^fred]: [U.S. real GDP (GDPCA), via FRED](https://fred.stlouisfed.org/series/GDPCA).
[^maddison]: [Maddison Project Database, via Our World in Data](https://ourworldindata.org/grapher/gdp-maddison-project-database).
[^amdahl]: [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law), Wikipedia.
[^crafts]: Nicholas Crafts, [Steam as a General Purpose Technology: A Growth Accounting Perspective](https://eprints.lse.ac.uk/22354/) (LSE Economic History Working Paper 75/03; free full text).
[^david]: Paul A. David, [The Dynamo and the Computer: An Historical Perspective on the Modern Productivity Paradox](https://www.almendron.com/tribuna/wp-content/uploads/2018/03/the-dynamo-and-the-computer-an-historical-perspective-on-the-modern-productivity-paradox.pdf).
[^epoch]: [Epoch AI, Explosive Growth from AI: A Review of the Arguments](https://epoch.ai/blog/explosive-growth-from-ai-a-review-of-the-arguments).
[^adoption]: [St. Louis Fed, The State of Generative AI Adoption (2025)](https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025).
[^jcurve]: Brynjolfsson, Rock, and Syverson, [The Productivity J-Curve: How Intangibles Complement General Purpose Technologies](https://www.nber.org/papers/w25148) (NBER Working Paper 25148; free full text).
[^seriesh]: [Anthropic, Series H](https://www.anthropic.com/news/series-h).
[^seriesa]: [Anthropic raises $124 million to build more reliable, general AI systems](https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems).
[^ramps]: [Epoch AI, Anthropic and OpenAI revenue](https://epoch.ai/data-insights/anthropic-openai-revenue).
[^trillion]: [Visual Capitalist, How Long It Took U.S. Companies to Reach a $1 Trillion Valuation](https://www.visualcapitalist.com/berkshire-hathaway-1-trillion-club-how-long/).
[^spacex]: [CNBC, Musk's xAI-SpaceX merger valued at $1.25 trillion](https://www.cnbc.com/2026/02/03/musk-xai-spacex-biggest-merger-ever.html).
[^openai]: [OpenAI, Accelerating the next phase](https://openai.com/index/accelerating-the-next-phase-ai/).
[^pastor]: Ľuboš Pástor and Pietro Veronesi, [Technological Revolutions and Stock Prices](https://www.nber.org/papers/w11876) (NBER Working Paper 11876).
[^nvca]: [NVCA, 2026 Yearbook: A Venture Industry in Transition](https://nvca.org/press_releases/nvca-releases-2026-yearbook-charts-a-venture-industry-in-transition/).
