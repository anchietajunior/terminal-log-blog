---
title: "The Art of Simple Systems"
date: 2026-02-25
categories: [reflections]
subtitle: "On the elegance of code that does only what it needs to"
---

There's a particular beauty in systems that do exactly what they need to do — nothing more, nothing less. Like a mechanical clock where every gear has its purpose, good software should have that same clarity.

## The complexity problem

Software's natural tendency is to grow. Every new feature, every edge case handled, every abstraction added — everything contributes to a more complex system. And complexity is the silent enemy of maintenance.

```ruby
# Too complex
class UserNotificationOrchestrator
  def initialize(user, notification_strategy_factory)
    @user = user
    @factory = notification_strategy_factory
  end

  def execute(event_type)
    strategy = @factory.create(event_type)
    strategy.notify(@user)
  end
end

# Simple enough
class User
  def notify(message)
    email.deliver(message)
  end
end
```

The first version looks "professional." The second one solves the problem.

## Lessons from Unix

The creators of Unix understood this deeply. The philosophy was clear:

1. **Do one thing and do it well**
2. **Expect the output of one program to be the input of another**
3. **Design to be tested early**

Each program was a simple tool. Complexity emerged from *composition*, not from individual construction.

### grep, sort, uniq

Three simple programs. Together, they solve problems that entire systems can't. That's design.

## The simplicity test

Before adding anything to a system, ask:

- Can I solve this by removing something?
- Would a newcomer understand this in 5 minutes?
- Am I solving a real problem or an imaginary one?

If the answer to any of these makes you uncomfortable, reconsider.

---

*Simple systems aren't simple to create. But they're the only ones that survive the test of time.*
