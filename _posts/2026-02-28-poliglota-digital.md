---
title: "Digital Polyglot: The Same Idea in 5 Languages"
date: 2026-02-28
categories: [code]
subtitle: "How Ruby, JavaScript, C, Java, and Python solve the same problems"
---

One of the best ways to understand a programming language is to compare how it solves the same problem as another. Below, we implement common concepts in five different languages — each with its own personality.

## Hello World

The classic. The first thing every programmer writes.

### Ruby

```ruby
puts "Hello, World!"
```

### JavaScript

```javascript
console.log("Hello, World!");
```

### C

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```

### Java

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Python

```python
print("Hello, World!")
```

---

## Fibonacci

A sequence that appears in nature, art, and job interviews. Let's see how each language handles recursion and iteration.

### Ruby

```ruby
def fibonacci(n)
  return n if n <= 1

  a, b = 0, 1
  (n - 1).times { a, b = b, a + b }
  b
end

10.times { |i| print "#{fibonacci(i)} " }
# => 0 1 1 2 3 5 8 13 21 34
```

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;

  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

const result = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(result.join(" "));
// => 0 1 1 2 3 5 8 13 21 34
```

### C

```c
#include <stdio.h>

long fibonacci(int n) {
    if (n <= 1) return n;

    long a = 0, b = 1, temp;
    for (int i = 2; i <= n; i++) {
        temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}

int main(void) {
    for (int i = 0; i < 10; i++) {
        printf("%ld ", fibonacci(i));
    }
    printf("\n");
    return 0;
}
```

### Java

```java
public class Fibonacci {
    static long fibonacci(int n) {
        if (n <= 1) return n;

        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long temp = b;
            b = a + b;
            a = temp;
        }
        return b;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}
```

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n

    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print(" ".join(str(fibonacci(i)) for i in range(10)))
# => 0 1 1 2 3 5 8 13 21 34
```

---

## Sorting with a Custom Comparator

Sorting a list of people by age. This is where each language's personality shines.

### Ruby

```ruby
people = [
  { name: "Ana", age: 28 },
  { name: "Carlos", age: 22 },
  { name: "Maria", age: 35 }
]

sorted = people.sort_by { |p| p[:age] }
sorted.each { |p| puts "#{p[:name]}: #{p[:age]}" }
```

### JavaScript

```javascript
const people = [
  { name: "Ana", age: 28 },
  { name: "Carlos", age: 22 },
  { name: "Maria", age: 35 },
];

const sorted = [...people].sort((a, b) => a.age - b.age);
sorted.forEach((p) => console.log(`${p.name}: ${p.age}`));
```

### C

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
} Person;

int compare_age(const void *a, const void *b) {
    return ((Person *)a)->age - ((Person *)b)->age;
}

int main(void) {
    Person people[] = {
        {"Ana", 28},
        {"Carlos", 22},
        {"Maria", 35}
    };
    int n = sizeof(people) / sizeof(people[0]);

    qsort(people, n, sizeof(Person), compare_age);

    for (int i = 0; i < n; i++) {
        printf("%s: %d\n", people[i].name, people[i].age);
    }
    return 0;
}
```

### Java

```java
import java.util.*;

public class Sorting {
    record Person(String name, int age) {}

    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(List.of(
            new Person("Ana", 28),
            new Person("Carlos", 22),
            new Person("Maria", 35)
        ));

        people.sort(Comparator.comparingInt(Person::age));
        people.forEach(p ->
            System.out.println(p.name() + ": " + p.age())
        );
    }
}
```

### Python

```python
people = [
    {"name": "Ana", "age": 28},
    {"name": "Carlos", "age": 22},
    {"name": "Maria", "age": 35},
]

sorted_people = sorted(people, key=lambda p: p["age"])
for p in sorted_people:
    print(f"{p['name']}: {p['age']}")
```

---

## Reading a File Line by Line

A pattern every developer uses daily.

### Ruby

```ruby
File.foreach("data.txt") do |line|
  puts line.strip
end
```

### JavaScript (Node.js)

```javascript
import { createReadStream } from "fs";
import { createInterface } from "readline";

const rl = createInterface({
  input: createReadStream("data.txt"),
});

for await (const line of rl) {
  console.log(line);
}
```

### C

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("data.txt", "r");
    if (!fp) {
        perror("Error opening file");
        return 1;
    }

    char line[1024];
    while (fgets(line, sizeof(line), fp)) {
        printf("%s", line);
    }

    fclose(fp);
    return 0;
}
```

### Java

```java
import java.nio.file.*;
import java.io.IOException;

public class FileReader {
    public static void main(String[] args) throws IOException {
        Files.lines(Path.of("data.txt"))
             .forEach(System.out::println);
    }
}
```

### Python

```python
with open("data.txt") as f:
    for line in f:
        print(line.strip())
```

---

## Observations

Each language has its strengths:

| Language | Highlight |
|----------|-----------|
| **Ruby** | Expressiveness and elegant blocks |
| **JavaScript** | Ubiquity and async programming |
| **C** | Total control and performance |
| **Java** | Strong typing and enterprise ecosystem |
| **Python** | Clarity and rapid prototyping |

The best language is the one that solves your problem with clarity. The rest is preference.

---

*Being a polyglot in programming isn't about knowing every syntax — it's about understanding that each language thinks differently.*
