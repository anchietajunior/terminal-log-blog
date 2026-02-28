---
title: "Teaching Machines and Humans"
date: 2026-02-23
categories: [teaching, ai]
subtitle: "On the similarities between the classroom and model training"
---

Teaching programming to undergraduates and training machine learning models are surprisingly similar activities. In both cases, you're trying to get a system — biological or artificial — to generalize from examples.

## The generalization problem

When I show a first-year class how a `for` loop works, I walk through specific examples:

```python
# Example 1: count from 1 to 10
for i in range(1, 11):
    print(i)

# Example 2: sum elements of a list
total = 0
for num in [3, 7, 2, 9]:
    total += num
```

The goal isn't for them to memorize these two programs. It's for them to *generalize* the pattern — to understand the concept of iteration and apply it in new contexts.

That's exactly what we want from an ML model. We don't want it to memorize the training dataset (overfitting). We want it to learn the underlying patterns.

## Overfitting in humans

Students also suffer from overfitting. They memorize solutions from previous exercises instead of understanding the principles. On the exam, when the problem changes slightly, they freeze.

The solution is the same in both worlds:

1. **Diversity of examples** — show the concept in multiple contexts
2. **Regularization** — in the classroom, this means avoiding ready-made recipes and forcing reasoning
3. **Fast feedback** — immediate corrections help both students and models adjust their "weights"

## What AI taught me about teaching

Since starting my AI graduate program, my teaching has changed. Understanding how neural networks learn made me rethink how *people* learn:

- **Learning rate** — if you dump information too fast, nothing converges. Pacing matters.
- **Curriculum learning** — presenting concepts in increasing order of difficulty works for both transformers and freshmen.
- **Attention** — in the literal sense. Models that learn *where to pay attention* are more efficient. So are students.

## The bridge

Being a teacher and AI researcher at the same time is a privileged position. Every insight about machine learning illuminates something about human learning — and vice versa.

---

*The best model is the one that generalizes. The best teacher, too.*
