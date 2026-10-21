# Series bible - Engineering Mathematics (Engineering CS, 68 episodes)

Standard: the v2 episode standard in `docs/series/principles-of-management.md` ("Every episode must have") applies unchanged, except the running story below. Look and components: copy Ep 01 of this series (`videos/engg-cs-functions-limits-and-continuity/`, once approved). It ports the v2 components of `videos/mba-scientific-management-f-w-taylor/` and `videos/mba-introduction-to-marketing/` into the engg-cs world (Under the hood: deep navy #0A1022, 40 px blueprint grid, panels #101A33, cyan #38D9F5 as the only accent, IBM Plex Sans headings, IBM Plex Mono labels).
Eyebrow chip: `EP NN · ENGINEERING MATHEMATICS`. Title format: `<Hook-style title> Explained Simply | Engineering Mathematics Ep N` (<= 70 chars). meta.json `"series": {"name": "Engineering Mathematics", "ep": N}`, world "engg-cs". Kit branch: kit-engg-cs.
Illustrations: `assets/illustrations/engg-cs/ecs-*` (dark world: never cut out onto the navy background; show the full image on a light plate card #F4F1EA, see docs/ILLUSTRATIONS.md).

## Who it is for
Any B.E./B.Tech CS student in India, whatever the university. The topic list was checked against GATE CS (2026), Anna University R2021 (MA3151, MA3251, MA3354), VTU 2022 (BCS301), Mumbai University (DJSCE Comps SE) and the AICTE-pattern Maths-I (MAKAUT M-101). Never mention exam weightage. Say "most universities" only where it is true; never name a university's marks.

## The running story (canon - keep it consistent)
**Dabba Dash** - a food-ordering app that four people grow from one college canteen in Pune to the whole city. Every maths idea solves a real problem the app hits next.
- **Kavya** - 20, second-year CSE student, founder, writes the app. Restless; asks "why" before "how". Cyan hoodie.
- **Rohan** - 21, her classmate, backend and servers. Calm; hates guesswork. Navy shirt, glasses.
- **Fatima** - 19, first-year student, the data and maths whiz. Quiet; questions every number. Grey cardigan, hijab.
- **Joseph uncle** - 48, runs the college canteen, the first partner kitchen. Practical, doubts apps, loves his steel tiffin carriers. Apron.
- **Prof. Iyer** - 55, maths professor and mentor. Answers with one question that unlocks the problem. Grey moustache, round glasses, chalk.
- Product: order lunch from a phone, delivered to hostel rooms, labs and later homes. Riders appear as plain scooter icons, unnamed.
- Growth arc, in order:
  1. Eps 1-16 Calculus: ONE canteen (Joseph uncle's) at Kavya's college. Delivery fees, lunch-rush rates, peaks, growth curves, how fast the order queue fills and drains.
  2. Eps 17-30 Linear Algebra: THREE colleges and five kitchens. Order matrices, solving for ingredients, row reduction of the daily plan, "you may also like" recommendations.
  3. Eps 31-48 Discrete Mathematics: the app's rules and logic, login checks, coupon codes, counting combos, delivery routes across Pune drawn as graphs.
  4. Eps 49-63 Probability and Statistics: the WHOLE CITY. Demand forecasts, ratings, rain-day odds, delivery-time promises, A/B tests.
  5. Eps 64-68 Numerical Methods: city-scale computing, fast ETAs, simulations. Ep 68 ends the series.
- Never introduce real brands into the story (no real apps, phones, restaurants, banks). Real mathematicians (Cauchy, Newton, Leibniz, Euler, Gauss, Bayes, Boole, Laplace, Fourier...) appear only as text or quote cards with verified facts and dates.
- Workplace examples ("At work today") are generic, with no brand names: a bank, a hospital, an airline, a phone maker, a weather office, a tax office, a game studio, a bakery.
- Illustrative numbers carry the ghost chip "EXAMPLE FIGURES". All arithmetic on screen is correct.
- Code or formulas on screen are tested (run the numbers in Python before they appear).

## Episodes
**A. Calculus** 1 Functions, Limits and Continuity · 2 Sequences and Series · 3 Differentiation and Its Applications · 4 Mean Value Theorems · 5 Partial Derivatives and Jacobians · 6 Maxima, Minima and Lagrange Multipliers · 7 Taylor and Maclaurin Series · 8 Indefinite and Definite Integration · 9 Improper Integrals, Beta and Gamma Functions · 10 Multiple Integrals · 11 Applications of Integration · 12 Ordinary Differential Equations · 13 Laplace Transform · 14 Fourier Series · 15 Vector Calculus - Gradient, Divergence and Curl · 16 Line, Surface and Volume Integrals
**B. Linear Algebra** 17 Matrices and Determinants · 18 Systems of Linear Equations · 19 Gaussian Elimination, Row Reduction and LU Decomposition · 20 Vector Spaces and Subspaces · 21 Linear Independence, Basis and Dimension · 22 Rank and Null Space · 23 Linear Transformations · 24 Eigenvalues and Eigenvectors · 25 Cayley-Hamilton Theorem · 26 Diagonalisation · 27 Orthogonality and Projections · 28 Least-Squares Approximation · 29 Singular Value Decomposition · 30 Linear Algebra in Graphics, Data Science and Machine Learning
**C. Discrete Mathematics** 31 Propositions and Logical Operators · 32 Truth Tables and Logical Equivalence · 33 Predicate Logic and Quantifiers · 34 Proofs - Direct, Contradiction and Induction · 35 Sets, Relations and Functions · 36 Equivalence Relations, Partial Orders and Lattices · 37 Counting Principles · 38 Permutations and Combinations · 39 Pigeonhole Principle · 40 Inclusion-Exclusion Principle · 41 Recurrence Relations · 42 Generating Functions · 43 Introduction to Graph Theory · 44 Euler and Hamilton Paths · 45 Graph Colouring, Matching and Planar Graphs · 46 Trees, Paths, Cycles and Connectivity · 47 Algebraic Structures - Groups, Monoids, Rings and Fields · 48 Boolean Algebra
**D. Probability and Statistics** 49 Mean, Median, Mode and Standard Deviation · 50 Sample Spaces and Events · 51 Conditional Probability and Independence · 52 Bayes' Theorem · 53 Random Variables · 54 Discrete and Continuous Distributions · 55 Expectation and Variance · 56 Bernoulli, Binomial and Poisson Distributions · 57 Uniform, Exponential and Normal Distributions · 58 Joint Distributions and Covariance · 59 Sampling, Estimation and the Central Limit Theorem · 60 Confidence Intervals and Hypothesis Testing · 61 Chi-Square Test and ANOVA · 62 Correlation and Regression · 63 Stochastic Processes and Markov Chains
**E. Numerical Methods** 64 Roots of Equations - Bisection and Newton-Raphson · 65 Iterative Methods - Gauss-Jacobi and Gauss-Seidel · 66 Interpolation · 67 Numerical Integration - Trapezoidal and Simpson's Rules · 68 Numerical Solution of ODEs - Euler and Runge-Kutta

## Canon (update after every batch)
- Ep 01: Dabba Dash launches in Kavya's college with Joseph uncle's canteen as the only kitchen. Hostel and labs are within about 3 km. First delivery fee: free up to 2 km, ₹30 beyond (a jump). Fixed fee: free up to 1 km, then ₹15 for every km after that (₹15 at 2 km, ₹30 at 3 km), no jumps.
