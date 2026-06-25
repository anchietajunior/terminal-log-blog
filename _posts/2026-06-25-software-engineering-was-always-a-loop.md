---
title: "Software Engineering Was Always a Loop. We Only Now See It Clearly."
author: anchietajunior
date: 2026-06-25 00:00:00 -0300
categories: [AI, Engineering]
tags: [ai, software-engineering, agents, llm, loop]
layout: post
lang: en
---

## What Is a Loop in Computer Science

Before talking about software engineering as a loop, it helps to be precise about what a loop *is* in the discipline that gave us the word.

In computer science, a **loop** is a control structure that repeats a block of instructions while a condition holds, and stops once that condition is no longer satisfied. It is not an incidental feature of programming languages — it is one of the primitives from which every program is built. The *structured program theorem* (Böhm and Jacopini, 1966) established that any computable function can be expressed with just three control structures: **sequence, selection, and iteration**. The loop is iteration. Remove it and you can no longer express computation in general.

But the deepest lesson about loops in the canonical bibliography isn't *how to write* one — it's *how to reason* about one. In *Introduction to Algorithms* (Cormen, Leiserson, Rivest, and Stein — the standard reference at MIT, Stanford, and most CS programs), loops are understood through the idea of a **loop invariant**: a property that is true before the loop begins and stays true at the start of every iteration. The authors validate a loop with three questions:

- **Initialization** — is the invariant true before the first iteration?
- **Maintenance** — if it holds before an iteration, does it still hold before the next one?
- **Termination** — when the loop finally stops, does the invariant tell us something useful?

This is the part worth carrying into the rest of the post. A loop is not just repetition. It is repetition around something that stays constant — the invariant — while the state advances, step by step, toward a result. Hold on to that image: **the structure stays fixed while the position inside it changes.** That is exactly what is happening to the software engineer.

---

## Introduction

Software engineering has always worked as a cycle: requirements, building, validation, adjustment, and back to the start. This pattern has existed from the beginning. What changed over the past few years is not the loop itself, but **the engineer's position within it**. They stopped executing every stage by hand, moved on to refining instructions that an AI executes, and are now beginning to design systems that iterate on their own. Understanding this shift is understanding what is happening in software development today.

---

## Phase One: The Manual Loop

In the beginning, the engineer was entirely inside the loop. You gathered requirements in long conversations with the client, documented them, interpreted them. Then you wrote the code by hand, tested it, found the failures, and went back to the code. The client gave feedback, you incorporated it, and the cycle started over.

The loop wasn't a tidy methodology in a document. It was the raw reality of the work: weeks or months to close a single turn, a lot of manual effort, a lot of time waiting for feedback. **The engineer answered for every link in the chain**, from requirements to code, from tests to adjustments.

---

## Phase Two: Human in the Loop with AI

Artificial intelligence arrived in development and shrank the cycle from weeks to minutes, without changing its iterative nature. What changed was the engineer's point of contact with the work.

You no longer write the code directly. You write an instruction, a prompt, a specification, and the AI generates the code. When the result doesn't fit, you don't fix the code. **You fix the instruction that produced it.** The engineer stopped being the one who types each line and became the one who refines specifications.

This is what people tend to call *human in the loop*. Control, validation, and direction stay with the person. Only execution has been delegated. The engineer remains at the center of the process, but no longer carries all of the manual work.

---

## Phase Three: The Human Stepping Out of the Loop

Now a more radical view emerges. The engineer's role stops being to create software and becomes creating the thing that creates software, and, at the limit, **systems capable of refining themselves**.

In this phase, the instruction-result-adjustment cycle is no longer driven step by step by the person. The AI generates the code, tests it, identifies problems, reformulates its own instructions, and validates again. The loop is still a loop, but it runs without constant manual intervention.

The human doesn't leave the scene. They leave the interior of the cycle. The work moves from refining each iteration to defining the framework, the limits, and the objectives within which the system iterates. The central question stops being "what to adjust now" and becomes **"who is managing the loop."**

---

## Conclusion

The three phases are not different kinds of software engineering. They are different positions of the engineer facing the same structure: manual executor, refiner of instructions, designer of self-iterating systems. The loop was always there. Each generation of tools only made it more visible and pushed the person one step above it.

This reshapes what it means to have technical skill. When execution is delegated, the engineer's value moves to where the machine still doesn't reach: **framing the right problem, defining the right limits, and judging when the result is good enough.** The loop isn't disappearing. It's moving up a level, and taking us along with it. Seeing this clearly is the first step toward working well in the layer where the work actually happens now.
