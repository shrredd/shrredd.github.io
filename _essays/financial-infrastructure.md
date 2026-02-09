---
title: "Building Financial Infrastructure from Zero"
subtitle: "What's different about building products that move real money"
byline: "Shravan Reddy &middot; February 2026"
description: "Lessons from building Stripe Treasury and banking infrastructure — from winning the Shopify deal to reconciling real dollars across multiple bank partners."
twitter_description: "Lessons from building Stripe Treasury and banking infrastructure — from winning the Shopify deal to reconciling real dollars across multiple bank partners."
date_published: "2026-02-08"
og_image: "/static/og-financial-infrastructure.png"
---
In January 2020, Shopify issued an RFI for a banking product. We were two months behind.
{: .lede}

Shopify had been quietly shifting dozens of engineers into financial services. They wanted to
offer bank accounts and cards to their merchants, and they were already in
conversations with other providers. Our small banking team at Stripe &mdash; barely a year
old &mdash; had to decide whether to compress a year of roadmap into six months to compete
for a deal that could define the trajectory of the entire product.

## The deal that changed everything

A year earlier, in January 2019, a small group from Stripe flew to Ottawa to meet with
Shopify's leadership. Everyone agreed the partnership had "high potential," but Shopify was
interested in using "more proven, existing providers." Stripe wasn't yet a bank. We didn't
have a treasury product. We had an idea and a tiny team.

What we didn't know was how far along Shopify already was. They had been exploring banking
and installment products with other providers for months. By the time the RFI landed, we
were playing catch-up.

The internal calculus was stark. Winning would give us immediate scale &mdash; distribution
to hundreds of thousands of small businesses and a marquee customer that could attract
every other platform. Losing meant Shopify would build with someone else, and we'd likely
never catch up.

Over the next five months, we designed the Banking API, iterated on the product with
Shopify's team, and navigated a pause in May when Shopify temporarily shelved the RFI. We
used that pause to refocus on shipping to our own direct users first. Then in June, Shopify
came back. We won.

Then came the hard part: actually building it.

The banking engineering team at that point was two people. Over the next several months it
grew to ten, but in those early weeks we were designing an API for a product that didn't
exist yet, against timelines we'd committed to in a contract. I wrote a milestone sequencing
doc to break the work into concrete deliverables with dates, and a Bank API questions doc
to get both teams aligned on what the API would and wouldn't do at each stage.

What followed was less like a normal vendor integration and more like building one product
across two companies. We were in constant communication with Shopify &mdash; not weekly
syncs, but daily back-and-forth as both teams iterated on the API design in real time.
When a question came up about how account provisioning should work, or what the card
activation flow looked like, it got resolved in hours, not days. We set contract dates for
each milestone and tracked progress against them week by week.

The team hit each of the first four milestones we'd promised Shopify. Given how aggressive
the timelines were &mdash; and that we'd started with two engineers &mdash; this was the
thing that earned trust. Not the pitch, not the contract terms. The fact that we said we'd
deliver something by a date, and then did. Four times in a row.

That single deal split our team in half. One group became Treasury, focused on platforms
like Shopify. The other became a direct-to-consumer banking product. Both were building on
infrastructure that barely existed yet.

## Real money, real consequences

In March 2021, we discovered that incoming wires from one of our bank partners had been
unreconciled for four days. One customer was affected &mdash; a small company whose
operating funds were sitting in limbo without them knowing it. The cause was a single
unhandled status code in our wire reconciler. We fixed it in a few hours. But those four
days changed how I thought about the work. In financial infrastructure, the code you write
determines whether someone's money is where they think it is.

It wasn't the last time. We later found six-figure balance discrepancies between our
ledger and a bank partner's. These weren't theoretical numbers &mdash; they affected whether
customer deposits maintained FDIC insurance eligibility. The discrepancies were small
individually but added up across thousands of accounts. Getting every number to match,
across every partner, every day, turned out to be the actual product. The dashboard and the
API were just the interface on top.

This changed how the team thought about what "shipping" meant. We stopped measuring
progress in features and started measuring it in reconciliation accuracy. We built
automated checkers that ran hourly, comparing our records against each bank's and alerting
on any mismatch. We built observability dashboards that showed exactly where money was at
any moment. Nobody tweeted about reconciliation pipelines. But they were the foundation
that everything else depended on.

## The hard middle

By January 2022, Treasury had been in alpha and private beta for over a year. It was
powering a handful of platforms, but it hadn't reached general availability. The roadmap
was a set of high-level line items that didn't clearly connect
to what platforms and end users actually needed. Leadership had been through repeated
delays. The general sentiment was: this has taken too long.

When I took over the GA push, the first thing I did was throw out the line items. In
partnership with the previous leads, we reduced Treasury GA to three concrete things: a
stable API, clear documentation, and dashboard surfaces that a platform's end users could
actually navigate. What's in, what's out, what can wait.

Trust was low, so I started sending daily updates to leadership. Not weekly summaries
&mdash; daily. Where we were, how confident we felt, what could go wrong. We kept this up
for a month. The goal wasn't to report upward. It was to make the work legible enough
that people could see for themselves whether we were on track.

The real turning point came in March. I organized an end-to-end product walkthrough for
leadership &mdash; not slides, not a roadmap, but the actual product experience a platform
would encounter when integrating with Treasury. Every screen, every API call, every rough
edge.

That walkthrough shifted the conversation from a ship date to a quality bar. Leadership
could see what was actually being put into users' hands, and they agreed that shipping
below that bar would be worse than being late. Showing the product &mdash; rather than
talking about it &mdash; earned the room to get it right.

The path to GA was still ugly. Other teams attached their own requirements to our milestone.
Key engineers left. Stripe's self-serve quality bar, designed for products you could sign up
for online, didn't map cleanly onto a product that was fundamentally sold, not self-served.
Each blocker had to be navigated one by one.

Treasury GA shipped that spring. Deposits on the platform grew 6x.

The moment that made it feel real was a fintech startup that went from a standing start to
a working Treasury integration in under two weeks &mdash; the fastest any platform had ever
integrated. Watching them move that fast on infrastructure we'd built from scratch was
proof that the quality-over-date decision had been right. When the foundation is solid,
people can move as fast as they want.

## Building on someone else's foundation

Treasury was built on top of bank partners. We weren't a bank ourselves. We were building
a product that depended, at every layer, on institutions we didn't control.

Nothing in my experience building software prepared me for what that meant in practice.
Each partner had a different technical stack, a different risk appetite, and a different
set of requirements. One sent us transaction data in nightly batch files. The other required
reconciliation reports in specific formatting. Both had compliance teams, risk teams, legal
teams, and regulators &mdash; all of whom had legitimate concerns about every new use case
we wanted to support.

The technical integration was the easy part. The hard part was everything around it. When
we tried to onboard a new category of customers to one partner, they took several weeks to
evaluate a straightforward case and ultimately rejected it &mdash; "a big departure from
prior stance." We had to pause sending new customers to that bank entirely while we sorted
out their risk appetite.

With another partner, the Fair Lending team requested APIs we'd never planned to build.
They wanted visibility into the underwriting data our platform customers used to make
credit decisions &mdash; not for decisioning power, but for "defensibility when auditors
come in." The challenge was that each platform had completely different underwriting
models. One focused on patients, another on creators, another on small businesses.
Building a single integration that worked across all of them was a problem nobody below
the executive level could resolve.

A bank partnership is not a vendor relationship. It's closer to a joint venture. Their
compliance requirements become your product requirements. Their risk appetite determines
which customers you can serve. And you can only move as fast as your slowest partner is
willing to go.

## The three-week estimate

In February 2021, we needed a card product for our direct banking users. The team that
owned cards had committed to rebuilding on new infrastructure, but that was eight months
away. We needed something now.

The solution was a lightweight card built on the existing infrastructure to bridge the gap.
The estimate was three engineering weeks.

Three months later, it had shipped to a single internal user.

This wasn't anyone's fault, exactly. The cards team was supporting four different
efforts simultaneously, with resources pulled in conflicting directions. Dependencies
between teams meant that small delays cascaded. And the reality of financial infrastructure
is that there's no such thing as a "lightweight" integration when real money and real
compliance requirements are involved.

I saw this pattern repeatedly. Estimates made by experienced engineers, using reasonable
assumptions, consistently undershot the actual effort by 3&ndash;5x. Not because anyone was
bad at estimating, but because financial products have a long tail of edge cases, compliance
requirements, and cross-team dependencies that don't show up until you're already in the
middle of the work. In fintech, the gap between "simple" and "shipped" is where most of the
time goes.

## What stays

Over four years, I watched the team grow from two engineers to dozens. I watched strategies
pivot, reorgs redraw the org chart, and entire product lines get deprioritized. The Shopify
deal that started everything eventually became just one of many platforms on Treasury. The
direct banking product I'd spent a year building was folded into something else entirely.

But the infrastructure persisted. The reconciliation pipelines, the bank integrations, the
compliance frameworks &mdash; they outlasted every reorg and every strategy shift. When that
product was deprioritized, the underlying financial infrastructure transferred cleanly
because it had been built to be correct, not to serve a single product narrative.

Building products that move real money is slower, more constrained, and less forgiving than
any other kind of software. But when it works &mdash; when the numbers match, when the
integrations hold, when a new platform can go from zero to a working financial product in
days instead of months &mdash; you've built something that people trust with their
livelihood. That trust outlasts whatever product strategy happens to be in favor this quarter.
{: .closing}
