/**
 * MLForge DSA Comprehensive Knowledge & Topic Syllabus
 * Explained in clear, simple English for beginners and interview candidates.
 * Covers all 27 syllabus topics from Programming Fundamentals to Advanced Data Structures.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};
window.MLForge.dsa.data = window.MLForge.dsa.data || {};

MLForge.dsa.data.topics = [
  // =========================================================================
  // Stage 1: Programming Fundamentals
  // =========================================================================
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals for DSA",
    stage: 1,
    stageName: "Programming Fundamentals",
    category: "Fundamentals",
    summary: "The building blocks you need before learning data structures: variables, loops, conditionals, functions, arrays, and basic memory concepts.",
    definition: "Programming fundamentals are the basic tools every programmer uses to tell a computer what to do. In Data Structures and Algorithms, we use these tools to store values, repeat actions, make decisions, and organize instructions into clean functions.",
    realLifeAnalogy: "Think of programming fundamentals like a kitchen toolkit. Variables are storage containers with labels on them, loops are like a blender that repeats until smooth, and conditionals are recipes that say 'if the sauce is too thick, add water'.",
    whyWeNeedIt: "Algorithms are just smart steps written with basic code. If you do not feel comfortable with loops, conditionals, and array indexes, even simple algorithms will look confusing.",
    keyConcepts: [
      "Variables & Primitive Data Types: Integers, floating-point numbers, characters, and booleans.",
      "Conditionals: 'if', 'else if', and 'else' branch your program depending on whether a condition is true or false.",
      "Loops: 'for' loops iterate through a known count or collection; 'while' loops continue until a condition turns false.",
      "Nested Loops: A loop inside another loop. Often seen when examining pairs or scanning a 2D matrix (rows and columns).",
      "Functions & Return Values: Reusable blocks of code that take inputs (arguments) and return an output.",
      "Pointers & Memory References: Variables in memory have addresses. Primitive types usually hold their value directly, while objects and arrays are referenced through memory addresses.",
      "Mutability vs Immutability: In Python, integers and strings cannot be changed in place (immutable); lists and dictionaries can be changed in place (mutable)."
    ],
    howItWorksSteps: [
      "1. Memory Allocation: When you write 'x = 10', the computer reserves a small slot in RAM, stores the binary number 1010, and points the name 'x' to that slot.",
      "2. Sequential Execution: Code runs line by line from top to bottom unless a branch (if/else) or loop changes the flow.",
      "3. Call Stack: When a function calls another function, the computer places the new function on top of a call stack. When it finishes and returns, it pops off the stack.",
      "4. Indexing: Arrays and lists start counting at index 0 in Python, C++, Java, and JavaScript."
    ],
    complexityTable: [
      { operation: "Variable Assignment (x = 5)", time: "O(1)", space: "O(1)", note: "Instant direct memory write" },
      { operation: "Single Loop (n iterations)", time: "O(n)", space: "O(1)", note: "Time grows directly with count n" },
      { operation: "Nested Loops (n × n iterations)", time: "O(n²)", space: "O(1)", note: "For every outer step, the inner loop runs n times" }
    ],
    commonPitfalls: [
      "Off-by-one errors: Stopping a loop at index n instead of n-1, causing an index out of bounds error.",
      "Infinite loops: Forgetting to increment the loop variable inside a 'while' loop.",
      "Modifying an array while iterating over it: Changing length during iteration causes elements to be skipped.",
      "Confusing variable assignment with reference copying: In Python, 'b = a' does not create a new list; both point to the same memory."
    ],
    codeExample: {
      python: `# Python: Fundamentals demonstration
def analyze_numbers(nums):
    total = 0
    even_count = 0
    
    # 1. Loop through numbers
    for num in nums:
        total += num
        # 2. Conditional check
        if num % 2 == 0:
            even_count += 1
            
    # 3. Return a dictionary of summary metrics
    return {
        "count": len(nums),
        "total": total,
        "evens": even_count,
        "average": total / len(nums) if nums else 0
    }

print(analyze_numbers([10, 15, 20, 25, 30]))`,
      cpp: `// C++: Fundamentals demonstration
#include <iostream>
#include <vector>

void analyzeNumbers(const std::vector<int>& nums) {
    int total = 0;
    int evenCount = 0;
    
    for (int num : nums) {
        total += num;
        if (num % 2 == 0) {
            evenCount++;
        }
    }
    
    std::cout << "Count: " << nums.size() 
              << ", Total: " << total 
              << ", Evens: " << evenCount << "\\n";
}`,
      java: `// Java: Fundamentals demonstration
import java.util.List;

public class Fundamentals {
    public static void analyzeNumbers(List<Integer> nums) {
        int total = 0;
        int evenCount = 0;
        
        for (int num : nums) {
            total += num;
            if (num % 2 == 0) {
                evenCount++;
            }
        }
        System.out.println("Total: " + total + ", Evens: " + evenCount);
    }
}`,
      javascript: `// JavaScript: Fundamentals demonstration
function analyzeNumbers(nums) {
    let total = 0;
    let evenCount = 0;
    
    for (const num of nums) {
        total += num;
        if (num % 2 === 0) {
            evenCount++;
        }
    }
    return { count: nums.length, total, evens: evenCount };
}`
    },
    relatedProblemIds: ["two-sum", "reverse-array", "palindrome-number"]
  },

  // =========================================================================
  // Stage 2: Complexity Analysis
  // =========================================================================
  {
    id: "complexity-analysis",
    title: "Time and Space Complexity (Big O Notation)",
    stage: 2,
    stageName: "Complexity Analysis",
    category: "Foundations",
    summary: "How to measure how fast an algorithm runs and how much memory it uses as the input size grows.",
    definition: "Complexity analysis is the mathematical way we evaluate algorithms without relying on a specific computer's clock speed. Big O notation describes the upper bound (worst-case growth rate) of an algorithm's running time or memory usage as the input size n becomes very large.",
    realLifeAnalogy: "Imagine sending a 100 GB movie to your friend. Transferring it over the internet takes time proportional to file size (Linear Time O(n)). But putting it on a USB flash drive and mailing it takes the same 1 day whether the drive has 1 GB or 100 GB (Constant Time O(1)).",
    whyWeNeedIt: "A slow algorithm might take 0.001 seconds on 10 items, but take 3,000 years on 1,000,000 items! Big O tells us which algorithm will survive real production workloads before we even run it.",
    keyConcepts: [
      "Big O (O): Upper bound / worst-case scenario. Guarantees the algorithm will never run slower than this.",
      "Big Omega (Ω): Lower bound / best-case scenario. The fastest the algorithm can possibly run.",
      "Big Theta (Θ): Tight bound. Used when best and worst cases have the same growth rate.",
      "Constant Time O(1): Running time does not depend on input size (e.g., accessing array element arr[0]).",
      "Logarithmic Time O(log n): Cuts the remaining problem in half at every step (e.g., Binary Search).",
      "Linear Time O(n): Takes time proportional to input size (e.g., scanning an array).",
      "Linearithmic Time O(n log n): Efficient divide-and-conquer algorithms (e.g., Merge Sort, Quick Sort).",
      "Quadratic Time O(n²): Nested loops over the input (e.g., Bubble Sort, comparing all pairs).",
      "Exponential Time O(2ⁿ): Tries every subset; doubles in time with every new element added.",
      "Factorial Time O(n!): Tries all permutations of n items. Unusable for n > 12.",
      "Auxiliary Space vs Input Space: Input space is memory needed to hold the original input. Auxiliary space is extra memory created by the algorithm.",
      "Amortized Analysis: The average time per operation over a long sequence (e.g., dynamic array resizing is O(1) amortized)."
    ],
    howItWorksSteps: [
      "1. Identify the input variable 'n' (e.g. length of array, number of graph vertices).",
      "2. Count the basic operations (comparisons, arithmetic, variable assignments).",
      "3. Keep only the fastest-growing term (e.g., 5n² + 100n + 50 becomes n²).",
      "4. Drop constant multiplicative factors (e.g., 3n² becomes O(n²)).",
      "5. Remember: Big O describes growth for large n; for tiny n (like n=3), constant factors matter more."
    ],
    complexityTable: [
      { operation: "Constant: O(1)", time: "1 operation", space: "Fixed", note: "Hash map lookup, array index access" },
      { operation: "Logarithmic: O(log n)", time: "log₂(n)", space: "O(1) / O(log n)", note: "Binary search in sorted array" },
      { operation: "Linear: O(n)", time: "n operations", space: "O(1) to O(n)", note: "Single loop, linear search" },
      { operation: "Linearithmic: O(n log n)", time: "n × log₂(n)", space: "O(n) / O(log n)", note: "Merge Sort, Heap Sort" },
      { operation: "Quadratic: O(n²)", time: "n² operations", space: "O(1)", note: "Nested loops, Bubble Sort" },
      { operation: "Exponential: O(2ⁿ)", time: "2ⁿ operations", space: "O(n)", note: "Generating all subsets" },
      { operation: "Factorial: O(n!)", time: "n! operations", space: "O(n)", note: "Generating all permutations" }
    ],
    commonPitfalls: [
      "Assuming O(n log n) is always faster than O(n²): For n=3, an O(n²) loop might be faster due to lower constant overhead.",
      "Ignoring hidden library complexity: In Python, 'x in my_list' is O(n), whereas 'x in my_set' is O(1) average.",
      "Forgetting call stack memory: Recursive calls consume space on the call stack. A recursion of depth n takes O(n) auxiliary space.",
      "Confusing best case with average case: Quick Sort worst-case is O(n²), but its average case is O(n log n)."
    ],
    codeExample: {
      python: `# Python: Complexity classes demonstrated
def constant_time(arr):
    # O(1) Time: Instant direct access
    return arr[0] if arr else None

def linear_time(arr):
    # O(n) Time: Loop through all n elements
    total = 0
    for val in arr:
        total += val
    return total

def quadratic_time(arr):
    # O(n²) Time: Check all pairs
    pairs = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            pairs.append((arr[i], arr[j]))
    return pairs`,
      cpp: `// C++: Complexity classes
#include <vector>

int constantTime(const std::vector<int>& arr) {
    return arr.empty() ? -1 : arr[0]; // O(1)
}

int linearTime(const std::vector<int>& arr) {
    int sum = 0;
    for (int x : arr) sum += x; // O(n)
    return sum;
}`,
      java: `// Java: Complexity classes
public class ComplexityDemo {
    public static int constantTime(int[] arr) {
        return arr.length > 0 ? arr[0] : -1; // O(1)
    }
    public static int linearTime(int[] arr) {
        int sum = 0;
        for (int x : arr) sum += x; // O(n)
        return sum;
    }
}`,
      javascript: `// JavaScript: Complexity classes
function constantTime(arr) { return arr[0]; } // O(1)
function linearTime(arr) { return arr.reduce((a, b) => a + b, 0); } // O(n)`
    },
    relatedProblemIds: ["two-sum", "binary-search", "merge-sort"]
  },

  // =========================================================================
  // Stage 3: Arrays & Strings
  // =========================================================================
  {
    id: "arrays",
    title: "Arrays & Dynamic Arrays",
    stage: 3,
    stageName: "Arrays and Strings",
    category: "Linear Data Structures",
    summary: "The most fundamental linear data structure: contiguous memory blocks with O(1) random index access.",
    definition: "An array is a collection of items stored at contiguous (neighboring) memory locations. Because each element has a fixed size and elements are placed side by side, the computer can jump directly to any element in O(1) time using its index: Address = Base + (Index × ElementSize).",
    realLifeAnalogy: "An array is like a numbered row of lockers in a school hallway: locker 0, locker 1, locker 2. If you know the locker number, you can walk straight to it immediately without checking every locker before it.",
    whyWeNeedIt: "Arrays are the bedrock of almost every other data structure, including strings, hash tables, stacks, heaps, and matrices. They provide the fastest possible random read access.",
    keyConcepts: [
      "Contiguous Memory: Elements reside in one unbroken physical block of RAM.",
      "Zero-Based Indexing: The first element is at index 0, the last at index n-1.",
      "Static vs Dynamic Arrays: Static arrays have a fixed capacity. Dynamic arrays (Python list, C++ std::vector, Java ArrayList) automatically double their capacity when full.",
      "Amortized O(1) Append: Appending to a dynamic array takes O(1) time on average, with occasional O(n) copy operations when resizing.",
      "Insertion & Deletion Cost: Inserting or deleting at the front or middle requires shifting all subsequent elements, taking O(n) time.",
      "2D Arrays (Matrices): Grids of rows and columns stored in row-major or column-major order.",
      "Kadane's Algorithm: A famous O(n) dynamic programming technique to find the maximum sum contiguous subarray."
    ],
    howItWorksSteps: [
      "1. Memory Calculation: Address = Base_Address + Index × Size_Of_Item.",
      "2. Read/Update: Instantly access arr[i] in O(1) time.",
      "3. Insertion at Index k: Shift elements from index n-1 down to k to the right by 1 slot. Insert new item at index k. Cost: O(n).",
      "4. Deletion at Index k: Shift elements from index k+1 up to n-1 to the left by 1 slot. Cost: O(n)."
    ],
    complexityTable: [
      { operation: "Access by Index (arr[i])", time: "O(1)", space: "O(1)", note: "Instant arithmetic offset lookup" },
      { operation: "Search (unsorted)", time: "O(n)", space: "O(1)", note: "Must check elements one by one" },
      { operation: "Search (sorted)", time: "O(log n)", space: "O(1)", note: "Binary search" },
      { operation: "Insert / Delete at End", time: "O(1) amortized", space: "O(1)", note: "Append is instant unless resizing" },
      { operation: "Insert / Delete at Beginning", time: "O(n)", space: "O(1)", note: "Must shift all n elements" }
    ],
    commonPitfalls: [
      "Using insert(0, val) inside a loop: Repeatedly prepending to an array causes an accidental O(n²) running time.",
      "Out of Bounds Index: Reading arr[len(arr)] triggers an IndexError because valid indexes stop at len(arr) - 1.",
      "Copying Arrays: Writing 'a = b' shares the reference. To create a fresh copy, use 'a = b.copy()' or 'a = b[:]'.",
      "Confusing Subarray with Subsequence: A subarray must be contiguous (touching). A subsequence keeps relative order but elements can skip."
    ],
    codeExample: {
      python: `# Python: Kadane's Algorithm for Maximum Subarray Sum
def max_subarray_sum(nums):
    max_so_far = nums[0]
    current_sum = nums[0]
    
    for x in nums[1:]:
        # Decide: extend existing subarray or start fresh from current x
        current_sum = max(x, current_sum + x)
        max_so_far = max(max_so_far, current_sum)
        
    return max_so_far

# Example test
print(max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4])) # Output: 6 ([4, -1, 2, 1])`,
      cpp: `// C++: Kadane's Algorithm
#include <vector>
#include <algorithm>

int maxSubArray(std::vector<int>& nums) {
    int maxSoFar = nums[0];
    int currentSum = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        currentSum = std::max(nums[i], currentSum + nums[i]);
        maxSoFar = std::max(maxSoFar, currentSum);
    }
    return maxSoFar;
}`,
      java: `// Java: Kadane's Algorithm
public class MaxSubArray {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentSum);
        }
        return maxSoFar;
    }
}`,
      javascript: `// JavaScript: Kadane's Algorithm
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentSum);
    }
    return maxSoFar;
}`
    },
    relatedProblemIds: ["two-sum", "maximum-subarray", "best-time-to-buy-and-sell-stock", "rotate-array", "move-zeroes"]
  },

  {
    id: "strings",
    title: "Strings & Pattern Matching",
    stage: 3,
    stageName: "Arrays and Strings",
    category: "Linear Data Structures",
    summary: "Sequences of characters, substring vs subsequence, frequency arrays, palindromes, and string matching algorithms.",
    definition: "A string is an indexed sequence of characters. In languages like Python and Java, strings are immutable (cannot be changed in place). Every modification creates a new string in memory. String algorithms focus on frequency counting, palindrome checking, and pattern matching.",
    realLifeAnalogy: "Think of a string like printed text on a paper book. You cannot erase an ink letter and swap it; to change a word, you must print a whole new page. Substrings are unbroken sentences on that page; subsequences are letters circled in order across different sentences.",
    whyWeNeedIt: "Most human data is text: search queries, URLs, DNA sequences, and chat messages. String processing is one of the most tested domains in technical interviews.",
    keyConcepts: [
      "Substring vs Subsequence: A substring is contiguous ('cde' in 'abcdef'). A subsequence maintains relative order but can skip characters ('ace' in 'abcdef').",
      "Immutability: Concatenating strings inside a loop with '+' creates an O(n²) trap. Use a list and ''.join() instead.",
      "Character Frequency Count: Using an array of size 26 for lowercase English letters (ord(c) - ord('a')) gives O(1) space frequency mapping.",
      "Anagrams: Two strings are anagrams if sorting them produces the same result or if their character frequency maps are identical.",
      "Palindromes: A word that reads the same forwards and backwards ('racecar'). Can be checked using two pointers from the outside inwards in O(n) time.",
      "Pattern Matching Algorithms: Naive O(n × m), KMP (Knuth-Morris-Pratt) O(n + m), Rabin-Karp (rolling hash), and Z-algorithm."
    ],
    howItWorksSteps: [
      "1. Palindrome Check: Place a left pointer at 0 and right pointer at length - 1. While left < right, compare characters. If they mismatch, return false; otherwise advance pointers.",
      "2. Frequency Counting: Initialize an array of 26 zeros. For each character c in string, increment counts[c - 'a'].",
      "3. Longest Common Prefix: Compare characters at each index across all strings until a mismatch occurs."
    ],
    complexityTable: [
      { operation: "Length & Character Access (s[i])", time: "O(1)", space: "O(1)", note: "Direct index access" },
      { operation: "Substring Extraction s[i:j]", time: "O(k)", space: "O(k)", note: "Copies k characters to new string" },
      { operation: "Concatenation in Loop with '+'", time: "O(n²)", space: "O(n)", note: "Each '+' copies the entire growing string" },
      { operation: "Join Array of Strings", time: "O(n)", space: "O(n)", note: "Pre-allocates memory and copies once" },
      { operation: "KMP Pattern Matching", time: "O(n + m)", space: "O(m)", note: "Precomputes Longest Prefix Suffix (LPS) array" }
    ],
    commonPitfalls: [
      "String concatenation inside a loop: In Python, doing 's += char' inside a loop of size n takes O(n²) time. Use a list and ''.join(lst) instead.",
      "Case sensitivity: 'A' has ASCII value 65 while 'a' is 97. Always convert to lowercase if case doesn't matter.",
      "Assuming ASCII: Unicode characters (emojis, accented letters) can take more than 1 byte.",
      "Confusing substring with subsequence: 'bdf' is a subsequence of 'abcdef', NOT a substring."
    ],
    codeExample: {
      python: `# Python: Check Valid Anagram using Frequency Array
def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
        
    counts = [0] * 26
    for c1, c2 in zip(s, t):
        counts[ord(c1) - ord('a')] += 1
        counts[ord(c2) - ord('a')] -= 1
        
    # If all counts are zero, they have identical character distributions
    return all(count == 0 for count in counts)

print(is_anagram("anagram", "nagaram")) # True
print(is_anagram("rat", "car"))         # False`,
      cpp: `// C++: Check Valid Anagram
#include <string>
#include <vector>

bool isAnagram(std::string s, std::string t) {
    if (s.length() != t.length()) return false;
    std::vector<int> counts(26, 0);
    for (size_t i = 0; i < s.length(); ++i) {
        counts[s[i] - 'a']++;
        counts[t[i] - 'a']--;
    }
    for (int c : counts) {
        if (c != 0) return false;
    }
    return true;
}`,
      java: `// Java: Check Valid Anagram
public class AnagramCheck {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int c : counts) {
            if (c != 0) return false;
        }
        return true;
    }
}`,
      javascript: `// JavaScript: Check Valid Anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }
    return counts.every(c => c === 0);
}`
    },
    relatedProblemIds: ["valid-anagram", "valid-palindrome", "longest-common-prefix", "longest-substring-without-repeating-characters"]
  },

  // =========================================================================
  // Stage 4: Searching & Sorting
  // =========================================================================
  {
    id: "searching",
    title: "Searching Algorithms",
    stage: 4,
    stageName: "Searching and Sorting",
    category: "Algorithms",
    summary: "Finding target values: Linear Search for unsorted collections and Binary Search on sorted intervals.",
    definition: "Searching algorithms locate the position of a specific target element within a collection. Linear search checks elements one by one in O(n) time. Binary search works on sorted data by repeatedly dividing the search space in half, achieving fast O(log n) time.",
    realLifeAnalogy: "Looking for a name in an unsorted pile of receipts requires checking every receipt from top to bottom (Linear Search). Looking up a word in a printed dictionary lets you flip directly to the middle, check the letter, and discard half the dictionary every time (Binary Search).",
    whyWeNeedIt: "Searching is the most frequent computational operation in software. Binary search cuts a search among 4 billion items down to just 32 checks!",
    keyConcepts: [
      "Linear Search: O(n) time. Works on any collection, sorted or unsorted.",
      "Binary Search: O(log n) time. Requires the search space to be sorted or monotonic (non-decreasing or non-increasing).",
      "Low, Mid, High Pointers: The search window is defined by [low, high]. Mid is computed as low + (high - low) // 2.",
      "Lower Bound & Upper Bound: Lower bound finds the first index where arr[i] >= target; Upper bound finds the first index where arr[i] > target.",
      "Binary Search on the Answer: When checking if an answer is feasible can be evaluated in O(n) time and feasibility is monotonic, we can binary search the answer range."
    ],
    howItWorksSteps: [
      "1. Initialize low = 0 and high = len(arr) - 1.",
      "2. While low <= high, compute mid = low + (high - low) // 2.",
      "3. If arr[mid] == target, return mid.",
      "4. If arr[mid] < target, the target must be on the right side: set low = mid + 1.",
      "5. If arr[mid] > target, the target must be on the left side: set high = mid - 1.",
      "6. If the loop ends without finding target, return -1."
    ],
    complexityTable: [
      { operation: "Linear Search", time: "O(n)", space: "O(1)", note: "Works on unsorted arrays" },
      { operation: "Binary Search", time: "O(log n)", space: "O(1)", note: "Requires sorted array" },
      { operation: "Binary Search on Answer", time: "O(f(n) × log(Range))", space: "O(1)", note: "f(n) is cost of feasibility check" }
    ],
    commonPitfalls: [
      "Integer Overflow in (low + high) / 2: In languages like C++ and Java, if low and high are large positive numbers, their sum can overflow. Use low + (high - low) / 2 instead.",
      "Infinite loop due to loop condition: Forgetting to move mid past the current position (using high = mid instead of high = mid - 1).",
      "Running Binary Search on Unsorted Data: Binary search only works if the array is sorted."
    ],
    codeExample: {
      python: `# Python: Clean Iterative Binary Search
def binary_search(nums, target):
    low = 0
    high = len(nums) - 1
    
    while low <= high:
        # Avoid integer overflow
        mid = low + (high - low) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1 # Search right half
        else:
            high = mid - 1 # Search left half
            
    return -1 # Target not present

print(binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)) # Output: 5`,
      cpp: `// C++: Binary Search
#include <vector>

int binarySearch(const std::vector<int>& nums, int target) {
    int low = 0;
    int high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `// Java: Binary Search
public class BinarySearch {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
      javascript: `// JavaScript: Binary Search
function binarySearch(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    relatedProblemIds: ["binary-search", "search-insert-position", "search-in-rotated-sorted-array", "find-peak-element"]
  },

  {
    id: "binary-search",
    title: "Binary Search & Search on Answer",
    stage: 4,
    stageName: "Searching and Sorting",
    category: "Algorithms",
    summary: "Cutting the search space in half repeatedly: Lower and upper bounds, rotated sorted arrays, and binary search on monotonic answer spaces.",
    definition: "Binary Search is a divide-and-conquer algorithm that repeatedly narrows down a target search range by comparing the target value against the midpoint of the current search interval. Because half of all remaining candidates are eliminated in every single step, it operates in fast O(log n) time.",
    realLifeAnalogy: "Imagine guessing a secret number between 1 and 100. If your friend says 'Too high' for 50, you instantly eliminate 50 through 100. You then test 25. If they say 'Too low', you eliminate 1 through 25. In at most 7 guesses, you are guaranteed to find any number up to 100!",
    whyWeNeedIt: "When data is sorted, or when an answer verification function is monotonic (true, true, ..., false, false), binary search finds optimal thresholds in O(log(Range)) steps rather than testing every possibility linearly.",
    keyConcepts: [
      "Range Halving: After 1 step, n/2 elements remain. After 2 steps, n/4 remain. After k steps, n / 2ᵏ elements remain. Setting n / 2ᵏ = 1 gives k = log₂(n) steps.",
      "Lower Bound: Finds the first index i such that arr[i] >= target.",
      "Upper Bound: Finds the first index i such that arr[i] > target.",
      "Search Insert Position: Where a target would fit if inserted in sorted order.",
      "Binary Search on Answer: Applicable when asking for 'minimum feasible speed', 'maximum minimum distance', or 'capacity'. If can_ship(capacity) is monotonic, binary search finds the exact minimum capacity in O(N × log(max - min))."
    ],
    howItWorksSteps: [
      "1. Initialize search window bounds: low = 0, high = len(arr) - 1.",
      "2. Compute middle index: mid = low + (high - low) // 2.",
      "3. Compare: If arr[mid] == target, return mid.",
      "4. Narrow window: If arr[mid] < target, target must be to the right -> set low = mid + 1. If arr[mid] > target, target must be to the left -> set high = mid - 1.",
      "5. Repeat until low > high. If not found, return -1 or low (for insert position)."
    ],
    complexityTable: [
      { operation: "Standard Binary Search", time: "O(log n)", space: "O(1)", note: "Halves search range every step" },
      { operation: "Search Insert Position", time: "O(log n)", space: "O(1)", note: "Returns low pointer at termination" },
      { operation: "Search in Rotated Sorted Array", time: "O(log n)", space: "O(1)", note: "One half is always strictly sorted" },
      { operation: "Binary Search on Answer", time: "O(f(n) × log(Range))", space: "O(1)", note: "f(n) is verification function runtime" }
    ],
    commonPitfalls: [
      "Integer overflow in (low + high) / 2 in C++/Java. Always use low + (high - low) / 2.",
      "Using while (low < high) instead of while (low <= high) when searching for an exact target value.",
      "Incorrect pointer movements in lower bound searches: When looking for first valid answer, use high = mid rather than high = mid - 1."
    ],
    codeExample: {
      python: `# Python: Binary Search on Answer (Integer Square Root)
def my_sqrt(x: int) -> int:
    if x < 2:
        return x
    low, high = 1, x // 2
    ans = 1
    while low <= high:
        mid = low + (high - low) // 2
        if mid * mid <= x:
            ans = mid     # Feasible answer, try larger
            low = mid + 1
        else:
            high = mid - 1 # Too large, search left
    return ans

print(my_sqrt(16)) # Output: 4
print(my_sqrt(8))  # Output: 2 (since 2.828... truncated is 2)`,
      cpp: `// C++: Integer Square Root via Binary Search
int mySqrt(int x) {
    if (x < 2) return x;
    long low = 1, high = x / 2, ans = 1;
    while (low <= high) {
        long mid = low + (high - low) / 2;
        if (mid * mid <= x) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return (int)ans;
}`,
      java: `// Java: Integer Square Root via Binary Search
public class SqrtBinarySearch {
    public static int mySqrt(int x) {
        if (x < 2) return x;
        long low = 1, high = x / 2, ans = 1;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (mid * mid <= x) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return (int)ans;
    }
}`,
      javascript: `// JavaScript: Integer Square Root via Binary Search
function mySqrt(x) {
    if (x < 2) return x;
    let low = 1, high = Math.floor(x / 2), ans = 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (mid * mid <= x) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}`
    },
    relatedProblemIds: ["binary-search", "search-insert-position", "search-in-rotated-sorted-array", "find-peak-element"]
  },

  {
    id: "sorting",
    title: "Sorting Algorithms",
    stage: 4,
    stageName: "Searching and Sorting",
    category: "Algorithms",
    summary: "Arranging elements in order: Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with stability and in-place analysis.",
    definition: "Sorting algorithms reorder elements in a list into ascending or descending order. Comparison-based sorting has a proven theoretical lower bound of Ω(n log n). Non-comparison sorts (Counting Sort, Radix Sort) can achieve O(n) under specific integer range constraints.",
    realLifeAnalogy: "Sorting a hand of playing cards: you pick cards one by one and insert each into its proper position among already sorted cards (Insertion Sort). Or sorting exam papers by splitting the stack in half, sorting both halves, and merging them together (Merge Sort).",
    whyWeNeedIt: "Sorted data unlocks lightning-fast binary searches, simplifies duplicate detection, enables two-pointer techniques, and powers database queries.",
    keyConcepts: [
      "Stability: A sorting algorithm is stable if elements with equal keys appear in the same relative order in the output as they did in the input.",
      "In-Place: An algorithm is in-place if it requires O(1) or O(log n) auxiliary memory beyond the input array.",
      "Bubble Sort: Repeatedly swaps adjacent elements if they are in the wrong order. O(n²) time.",
      "Selection Sort: Finds the minimum element from the unsorted part and places it at the beginning. Unstable, O(n²) time.",
      "Insertion Sort: Builds the sorted array one item at a time. Very fast for nearly-sorted or small arrays (O(n) best-case).",
      "Merge Sort: Divide and conquer. Divides array into halves, sorts them recursively, and merges sorted halves. Stable, guaranteed O(n log n) worst-case time, O(n) space.",
      "Quick Sort: Picks a pivot, partitions array into elements smaller and larger than the pivot, and recurses. Fast in practice with O(n log n) average time, but O(n²) worst-case if pivot is poorly chosen.",
      "Heap Sort: Builds a Max Heap and repeatedly extracts the maximum to the end. In-place, O(n log n) time, unstable."
    ],
    howItWorksSteps: [
      "1. Merge Sort Divide: If len(arr) <= 1, return arr. Split array at midpoint into left and right halves.",
      "2. Merge Sort Conquer: Recursively sort left and right halves.",
      "3. Merge Sort Combine: Use two pointers to merge the two sorted halves into a single sorted array by taking the smaller element at each step."
    ],
    complexityTable: [
      { operation: "Bubble Sort", time: "O(n²)", space: "O(1)", note: "Stable, in-place, simple" },
      { operation: "Selection Sort", time: "O(n²)", space: "O(1)", note: "Unstable, in-place, minimizes writes" },
      { operation: "Insertion Sort", time: "O(n²)", space: "O(1)", note: "Stable, in-place, O(n) best case" },
      { operation: "Merge Sort", time: "O(n log n)", space: "O(n)", note: "Stable, guaranteed O(n log n)" },
      { operation: "Quick Sort", time: "O(n log n) avg", space: "O(log n)", note: "Unstable, in-place, cache friendly" },
      { operation: "Heap Sort", time: "O(n log n)", space: "O(1)", note: "Unstable, in-place, guaranteed O(n log n)" }
    ],
    commonPitfalls: [
      "Assuming Quick Sort is always O(n log n): An already sorted array with the first element chosen as pivot degrades to O(n²). Use randomized pivots.",
      "Forgetting Merge Sort requires O(n) extra space: Merging requires allocating temporary buffer space.",
      "Using an unstable sort when original ordering of ties must be preserved: For example, sorting by price then by rating."
    ],
    codeExample: {
      python: `# Python: Clean Merge Sort implementation
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # Merge sorted halves
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
      cpp: `// C++: Merge Sort
#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    std::vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    std::vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    size_t i = 0, j = 0;
    int k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}`,
      java: `// Java: Merge Sort
public class MergeSort {
    public static void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            // merge logic...
        }
    }
}`,
      javascript: `// JavaScript: Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`
    },
    relatedProblemIds: ["merge-sorted-array", "sort-colors", "kth-largest-element-in-an-array"]
  },

  // =========================================================================
  // Stage 5: Hashing & Patterns (Two Pointers, Sliding Window, Prefix Sum)
  // =========================================================================
  {
    id: "hashing",
    title: "Hashing & Hash Tables",
    stage: 5,
    stageName: "Hashing and Common Patterns",
    category: "Data Structures",
    summary: "Key-value mapping using hash functions, collision resolution, and reducing O(n²) lookups to O(1) average time.",
    definition: "A hash table is a data structure that maps keys to values for highly efficient lookup, insertion, and deletion. A hash function converts an arbitrary key into an integer array index. Collisions (when two keys hash to the same bucket) are handled via separate chaining (linked lists) or open addressing (probing).",
    realLifeAnalogy: "A hash table is like a coat check room at a theatre. You give your coat, they give you a ticket number (hash). When you return with that ticket, they walk straight to that exact hook and return your coat immediately without looking through everyone else's coat.",
    whyWeNeedIt: "Checking if an element exists in an array takes O(n) time. A hash set or hash map does it in O(1) average time. This single data structure turns slow algorithms into blazing-fast solutions.",
    keyConcepts: [
      "Hash Function: Converts keys into a fixed-range integer index. A good hash function distributes keys uniformly.",
      "Hash Collisions: Inevitable due to the Pigeonhole Principle when the number of keys exceeds the number of slots.",
      "Collision Handling: Separate Chaining (stores a linked list in each bucket) vs Open Addressing (Linear probing, Quadratic probing).",
      "Load Factor (α): The ratio of stored items to bucket count (n / k). When α exceeds ~0.75, the table doubles its capacity and rehashes all keys.",
      "Average vs Worst Case: Hash operations are O(1) on average. In the worst case (if all keys collide into a single bucket), operations degrade to O(n)."
    ],
    howItWorksSteps: [
      "1. Insertion: Compute index = hash(key) % table_size. Insert (key, value) into that bucket.",
      "2. Lookup: Compute index = hash(key) % table_size. Scan that bucket for the key. Return value if found, else null.",
      "3. Deletion: Locate the key at index and remove its node from the bucket chain."
    ],
    complexityTable: [
      { operation: "Lookup (Average)", time: "O(1)", space: "O(1)", note: "Good uniform distribution" },
      { operation: "Lookup (Worst Case)", time: "O(n)", space: "O(1)", note: "All keys hash to the exact same bucket" },
      { operation: "Insert (Average)", time: "O(1)", space: "O(1)", note: "Constant bucket write" },
      { operation: "Delete (Average)", time: "O(1)", space: "O(1)", note: "Constant node removal" }
    ],
    commonPitfalls: [
      "Assuming O(1) is guaranteed: Worst-case hash collision attacks can force O(n) time.",
      "Mutable keys: Modifying a key object while it is inside a hash map alters its hash code, making it unfindable.",
      "Memory overhead: Hash tables allocate extra unused buckets and pointers, using more memory than packed arrays."
    ],
    codeExample: {
      python: `# Python: Two Sum using Hash Map in O(n) time
def two_sum(nums, target):
    seen = {} # Maps number to its index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
        
    return []

print(two_sum([2, 7, 11, 15], 9)) # Output: [0, 1]`,
      cpp: `// C++: Two Sum using unordered_map
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int comp = target - nums[i];
        if (seen.find(comp) != seen.end()) {
            return {seen[comp], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `// Java: Two Sum using HashMap
import java.util.HashMap;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (seen.containsKey(comp)) {
                return new int[] { seen.get(comp), i };
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      javascript: `// JavaScript: Two Sum using Map
function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (seen.has(comp)) return [seen.get(comp), i];
        seen.set(nums[i], i);
    }
    return [];
}`
    },
    relatedProblemIds: ["two-sum", "contains-duplicate", "group-anagrams", "longest-consecutive-sequence", "subarray-sum-equals-k"]
  },

  {
    id: "two-pointers",
    title: "Two Pointers Technique",
    stage: 5,
    stageName: "Hashing and Common Patterns",
    category: "Patterns",
    summary: "Using two index pointers to traverse a collection simultaneously, reducing nested loops from O(n²) to O(n).",
    definition: "The Two Pointers pattern coordinates two index pointers that move through an array or string according to specific rules. Pointers can move in opposite directions (one from start, one from end) or in the same direction (slow and fast pointers).",
    realLifeAnalogy: "Two people reading a list of prices from opposite ends. One person starts at the cheapest items (left) and the other starts at the most expensive items (right). If their combined sum is too small, the left person moves up; if too big, the right person moves down.",
    whyWeNeedIt: "Checking all pairs in an array normally takes two nested loops (O(n²)). If the array is sorted, two pointers find target pairs in a single linear pass (O(n)) with O(1) extra space.",
    keyConcepts: [
      "Opposite-Direction Pointers: Left pointer at index 0, Right pointer at index n-1. They move toward each other. Used for sorted pair sums, reversing arrays, and Container With Most Water.",
      "Same-Direction Pointers: Slow pointer writes filtered elements while Fast pointer scans ahead. Used for in-place deduplication and moving zeros.",
      "Fast & Slow Pointers (Floyd's Cycle Finding): Fast moves two steps, Slow moves one step. Used for detecting cycles in linked lists."
    ],
    howItWorksSteps: [
      "1. Sort the array if not already sorted.",
      "2. Initialize left = 0 and right = len(nums) - 1.",
      "3. While left < right: calculate current_sum = nums[left] + nums[right].",
      "4. If current_sum == target, pair found!",
      "5. If current_sum < target, we need a larger sum: advance left += 1.",
      "6. If current_sum > target, we need a smaller sum: decrement right -= 1."
    ],
    complexityTable: [
      { operation: "Two Pointers on Sorted Array", time: "O(n)", space: "O(1)", note: "Each element is inspected at most once" },
      { operation: "Sorting + Two Pointers", time: "O(n log n)", space: "O(1) / O(n)", note: "Dominated by sorting step" }
    ],
    commonPitfalls: [
      "Applying to unsorted arrays: Opposite-direction two pointers require sorted values to guarantee monotonicity.",
      "Pointer overlap errors: Using while left <= right when checking two distinct elements, causing an element to be paired with itself."
    ],
    codeExample: {
      python: `# Python: Container With Most Water in O(n)
def max_area(height):
    left = 0
    right = len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Move the pointer with the shorter height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_water

print(max_area([1,8,6,2,5,4,8,3,7])) # Output: 49`,
      cpp: `// C++: Container With Most Water
#include <vector>
#include <algorithm>

int maxArea(std::vector<int>& height) {
    int left = 0, right = height.size() - 1, maxWater = 0;
    while (left < right) {
        int width = right - left;
        int h = std::min(height[left], height[right]);
        maxWater = std::max(maxWater, width * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
      java: `// Java: Container With Most Water
public class ContainerWithMostWater {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1, maxWater = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, width * h);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
}`,
      javascript: `// JavaScript: Container With Most Water
function maxArea(height) {
    let left = 0, right = height.length - 1, maxWater = 0;
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`
    },
    relatedProblemIds: ["two-sum-ii-input-array-is-sorted", "container-with-most-water", "3sum", "trapping-rain-water", "move-zeroes"]
  },

  {
    id: "sliding-window",
    title: "Sliding Window Pattern",
    stage: 5,
    stageName: "Hashing and Common Patterns",
    category: "Patterns",
    summary: "Maintaining a running subsegment (fixed or dynamic) over an array or string to avoid recomputing overlapping elements.",
    definition: "The Sliding Window pattern maintains a contiguous window defined by two pointers [left, right] that moves across an array or string. Instead of recomputing results for every subarray from scratch (O(n²)), the window updates its state in O(1) by adding the incoming element at 'right' and removing the outgoing element at 'left'.",
    realLifeAnalogy: "Looking out of a moving train window. As the train moves forward, new trees enter your view on the right side and old trees exit your view on the left side. You do not need to rescan the entire landscape; you just notice what enters and what leaves.",
    whyWeNeedIt: "Problems asking for the 'maximum sum subarray of size k', 'longest substring without repeats', or 'minimum window containing target characters' become simple linear O(n) solutions with sliding windows.",
    keyConcepts: [
      "Fixed-Size Window: The window length k is constant. Slide right by 1: add arr[i], subtract arr[i-k].",
      "Dynamic / Variable Window: The window expands by moving 'right' until a condition is broken, then shrinks by advancing 'left' until the condition is restored.",
      "Distinction from Two Pointers: Sliding window specifically tracks a valid contiguous slice of items and maintains an aggregate metric (sum, distinct character count) across that slice."
    ],
    howItWorksSteps: [
      "1. Initialize left = 0, right = 0, and state variables.",
      "2. Expand window: include element at arr[right] in state.",
      "3. While window state is invalid: shrink window by removing arr[left] from state and increment left += 1.",
      "4. Update optimal answer with current valid window (right - left + 1).",
      "5. Advance right += 1 and repeat."
    ],
    complexityTable: [
      { operation: "Sliding Window Traversal", time: "O(n)", space: "O(k) / O(1)", note: "Each pointer moves at most n steps" }
    ],
    commonPitfalls: [
      "Using while loops inside and thinking it's O(n²): Since left pointer only moves forward and never resets, both left and right visit each element at most once: O(2n) = O(n).",
      "Forgetting to update the state when shrinking the left edge."
    ],
    codeExample: {
      python: `# Python: Longest Substring Without Repeating Characters
def length_of_longest_substring(s: str) -> int:
    char_index_map = {}
    max_len = 0
    left = 0
    
    for right, char in enumerate(s):
        # If character is seen and inside the current window, jump left past it
        if char in char_index_map and char_index_map[char] >= left:
            left = char_index_map[char] + 1
            
        char_index_map[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len

print(length_of_longest_substring("abcabcbb")) # Output: 3 ("abc")`,
      cpp: `// C++: Longest Substring Without Repeating Characters
#include <string>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    std::unordered_map<char, int> charMap;
    int maxLen = 0, left = 0;
    for (int right = 0; right < (int)s.length(); ++right) {
        if (charMap.find(s[right]) != charMap.end() && charMap[s[right]] >= left) {
            left = charMap[s[right]] + 1;
        }
        charMap[s[right]] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      java: `// Java: Longest Substring Without Repeating Characters
import java.util.HashMap;

public class LongestSubstring {
    public static int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      javascript: `// JavaScript: Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const map = new Map();
    let maxLen = 0, left = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            left = map.get(s[right]) + 1;
        }
        map.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
    },
    relatedProblemIds: ["longest-substring-without-repeating-characters", "minimum-size-subarray-sum", "sliding-window-maximum"]
  },

  {
    id: "prefix-sum",
    title: "Prefix Sum & Difference Arrays",
    stage: 5,
    stageName: "Hashing and Common Patterns",
    category: "Patterns",
    summary: "Precomputing cumulative sums to answer any range sum query in O(1) time.",
    definition: "A prefix sum array stores the cumulative sum of elements from index 0 up to index i: prefix[i] = prefix[i-1] + arr[i]. With this precomputed array, the sum of any subarray from index L to R can be calculated in O(1) time as prefix[R] - prefix[L-1].",
    realLifeAnalogy: "An odometer in a car. It tells you total miles driven since the car was built. To know how many miles you drove between Tuesday (mile 1,200) and Friday (mile 1,550), you don't count every mile as it happens; you simply subtract: 1,550 − 1,200 = 350 miles.",
    whyWeNeedIt: "If you need to answer 100,000 range sum queries on an array of size 100,000, calculating each range manually takes O(n × q) = 10 billion operations. With prefix sums, it takes O(n + q) = 200,000 operations!",
    keyConcepts: [
      "1D Prefix Sum: prefix[i] = prefix[i-1] + nums[i]. Range sum [L, R] = prefix[R] - prefix[L-1].",
      "Prefix Sum with Hash Map: Essential for finding subarrays with sum equal to K (storing prefix sum frequencies).",
      "2D Prefix Sum (Integral Image): Answers submatrix sum queries in O(1) time.",
      "Difference Array: Applies range updates (add val to all elements from L to R) in O(1) time per query, then computes the final array in O(n) with prefix sum."
    ],
    howItWorksSteps: [
      "1. Build prefix sum: prefix = [0] * (n + 1).",
      "2. For i from 0 to n-1: prefix[i + 1] = prefix[i] + nums[i].",
      "3. Query sum(L, R): return prefix[R + 1] - prefix[L]."
    ],
    complexityTable: [
      { operation: "Precomputation", time: "O(n)", space: "O(n)", note: "One linear pass to compute prefix array" },
      { operation: "Range Sum Query", time: "O(1)", space: "O(1)", note: "Single subtraction lookup" }
    ],
    commonPitfalls: [
      "Off-by-one errors with index 0: Always make the prefix array of size n+1 with prefix[0] = 0 to avoid checking 'if L == 0'.",
      "Negative numbers with hash map: If negative numbers exist, prefix sums are not monotonic; you cannot use two pointers, but hash map prefix sum works."
    ],
    codeExample: {
      python: `# Python: Subarray Sum Equals K using Prefix Sum + Hash Map
def subarray_sum_equals_k(nums, k):
    count = 0
    current_sum = 0
    prefix_counts = {0: 1} # Base case: a sum of 0 has occurred once
    
    for x in nums:
        current_sum += x
        # If (current_sum - k) was seen before, those prior prefixes form valid subarrays
        if (current_sum - k) in prefix_counts:
            count += prefix_counts[current_sum - k]
            
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
        
    return count

print(subarray_sum_equals_k([1, 1, 1], 2)) # Output: 2`,
      cpp: `// C++: Subarray Sum Equals K
#include <vector>
#include <unordered_map>

int subarraySum(std::vector<int>& nums, int k) {
    int count = 0, currentSum = 0;
    std::unordered_map<int, int> prefixMap;
    prefixMap[0] = 1;
    for (int x : nums) {
        currentSum += x;
        if (prefixMap.find(currentSum - k) != prefixMap.end()) {
            count += prefixMap[currentSum - k];
        }
        prefixMap[currentSum]++;
    }
    return count;
}`,
      java: `// Java: Subarray Sum Equals K
import java.util.HashMap;

public class SubarraySum {
    public static int subarraySum(int[] nums, int k) {
        int count = 0, currentSum = 0;
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        for (int x : nums) {
            currentSum += x;
            if (map.containsKey(currentSum - k)) {
                count += map.get(currentSum - k);
            }
            map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        }
        return count;
    }
}`,
      javascript: `// JavaScript: Subarray Sum Equals K
function subarraySum(nums, k) {
    let count = 0, currentSum = 0;
    const map = new Map([[0, 1]]);
    for (const x of nums) {
        currentSum += x;
        if (map.has(currentSum - k)) count += map.get(currentSum - k);
        map.set(currentSum, (map.get(currentSum) || 0) + 1);
    }
    return count;
}`
    },
    relatedProblemIds: ["subarray-sum-equals-k", "range-sum-query-immutable"]
  },

  // =========================================================================
  // Stage 6: Linked Lists, Stacks, Queues
  // =========================================================================
  {
    id: "linked-lists",
    title: "Linked Lists",
    stage: 6,
    stageName: "Linked Lists, Stacks, and Queues",
    category: "Linear Data Structures",
    summary: "Nodes connected by pointer references: Singly, Doubly, and Circular Linked Lists with reversal and cycle detection.",
    definition: "A linked list is a linear data structure where elements (called nodes) are not stored in contiguous memory. Instead, each node contains data and one or more pointers (references) pointing to the next (and optionally previous) node in the sequence.",
    realLifeAnalogy: "A treasure scavenger hunt. Clue #1 gives you instructions and the location of Clue #2. Clue #2 gives you instructions and points to Clue #3. You cannot teleport to Clue #5 directly; you must follow the trail from clue to clue.",
    whyWeNeedIt: "Unlike arrays, inserting or deleting a node at the head or after a known pointer takes instant O(1) time without shifting any elements. Linked lists also grow and shrink dynamically without memory reallocation.",
    keyConcepts: [
      "Singly Linked List: Each node points to next.",
      "Doubly Linked List: Each node points to both next and prev. Allows bidirectional traversal and O(1) node removal given a node pointer.",
      "Dummy / Sentinel Head: A temporary helper node placed before the real head to eliminate special edge cases for empty lists or head deletions.",
      "Reversing a Linked List: Adjusting pointers so each node points backwards (curr.next = prev).",
      "Floyd's Tortoise and Hare: Detecting a cycle by moving a slow pointer by 1 step and a fast pointer by 2 steps. If they meet, a cycle exists."
    ],
    howItWorksSteps: [
      "1. Reversal: Initialize prev = null, curr = head.",
      "2. While curr is not null: save next_node = curr.next. Set curr.next = prev.",
      "3. Advance prev = curr, curr = next_node.",
      "4. Return prev as the new head."
    ],
    complexityTable: [
      { operation: "Access / Search by Index", time: "O(n)", space: "O(1)", note: "Must traverse sequentially from head" },
      { operation: "Insert at Head", time: "O(1)", space: "O(1)", note: "New node points to head; update head pointer" },
      { operation: "Delete Head", time: "O(1)", space: "O(1)", note: "Head = head.next" },
      { operation: "Insert / Delete at End", time: "O(n) / O(1)", space: "O(1)", note: "O(1) if tail pointer is maintained" }
    ],
    commonPitfalls: [
      "Losing the reference before linking: Setting curr.next = prev before saving curr.next permanently cuts off the rest of the list.",
      "Null Pointer Dereference: Calling node.next when node is null/None.",
      "Forgetting to update the tail pointer when deleting the last node."
    ],
    codeExample: {
      python: `# Python: Reverse a Singly Linked List
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next # Save next node
        curr.next = prev      # Reverse pointer
        prev = curr           # Move prev forward
        curr = next_temp      # Move curr forward
        
    return prev # New head of reversed list`,
      cpp: `// C++: Reverse Linked List
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      java: `// Java: Reverse Linked List
public class ReverseLL {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
      javascript: `// JavaScript: Reverse Linked List
function reverseList(head) {
    let prev = null, curr = head;
    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
    },
    relatedProblemIds: ["reverse-linked-list", "linked-list-cycle", "merge-two-sorted-lists", "remove-nth-node-from-end-of-list", "middle-of-the-linked-list"]
  },

  {
    id: "stacks",
    title: "Stacks & Monotonic Stacks",
    stage: 6,
    stageName: "Linked Lists, Stacks, and Queues",
    category: "Linear Data Structures",
    summary: "Last-In First-Out (LIFO) structure: Push, Pop, Peek, balanced parentheses, and Next Greater Element using monotonic stacks.",
    definition: "A stack is a linear data structure that follows the Last-In, First-Out (LIFO) principle. The last element added to the stack is the first one removed. Operations happen exclusively at one end called the 'top'.",
    realLifeAnalogy: "A stack of dinner plates in a cafeteria. You place fresh clean plates on top of the stack, and people take clean plates from the top. The first plate placed on the bottom is the last one used.",
    whyWeNeedIt: "Stacks power function call stacks in programming languages, browser back buttons, undo/redo mechanisms, syntax parsers (balanced brackets), and monotonic stack algorithms.",
    keyConcepts: [
      "Push: Add item to the top (O(1)).",
      "Pop: Remove item from the top (O(1)).",
      "Peek / Top: View top item without removing it (O(1)).",
      "Valid Parentheses: Matching open and close brackets using a stack.",
      "Monotonic Stack: A stack whose elements are always strictly increasing or decreasing. Solves 'Next Greater Element' and 'Largest Rectangle in Histogram' in O(n) time."
    ],
    howItWorksSteps: [
      "1. Valid Parentheses: Iterate through characters in string.",
      "2. If character is an open bracket '(', '{', '[', push it onto stack.",
      "3. If character is a closing bracket, check if stack is empty (invalid) or top bracket doesn't match (invalid). If matching, pop from stack.",
      "4. At the end, return true if stack is empty, false otherwise."
    ],
    complexityTable: [
      { operation: "Push", time: "O(1)", space: "O(1)", note: "Add to top" },
      { operation: "Pop", time: "O(1)", space: "O(1)", note: "Remove from top" },
      { operation: "Peek", time: "O(1)", space: "O(1)", note: "Inspect top element" },
      { operation: "Monotonic Stack Pass", time: "O(n)", space: "O(n)", note: "Each element pushed and popped at most once" }
    ],
    commonPitfalls: [
      "Stack Underflow: Attempting to pop or peek from an empty stack.",
      "Forgetting to check if stack is empty at the end of balanced parentheses check."
    ],
    codeExample: {
      python: `# Python: Valid Parentheses Check
def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            # Closing bracket: check top of stack
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            # Opening bracket: push onto stack
            stack.append(char)
            
    return len(stack) == 0

print(is_valid_parentheses("()[]{}")) # True
print(is_valid_parentheses("(]"))     # False`,
      cpp: `// C++: Valid Parentheses
#include <string>
#include <stack>
#include <unordered_map>

bool isValid(std::string s) {
    std::stack<char> st;
    std::unordered_map<char, char> map = {{')','('}, {'}','{'}, {']','['}};
    for (char c : s) {
        if (map.count(c)) {
            if (st.empty() || st.top() != map[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}`,
      java: `// Java: Valid Parentheses
import java.util.Stack;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else if (st.isEmpty() || st.pop() != c) return false;
        }
        return st.isEmpty();
    }
}`,
      javascript: `// JavaScript: Valid Parentheses
function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`
    },
    relatedProblemIds: ["valid-parentheses", "min-stack", "next-greater-element-i", "daily-temperatures", "largest-rectangle-in-histogram"]
  },

  {
    id: "queues-deques",
    title: "Queues and Deques",
    stage: 6,
    stageName: "Linked Lists, Stacks, and Queues",
    category: "Linear Data Structures",
    summary: "First-In First-Out (FIFO) queue and Double-Ended Queue (Deque): Enqueue, Dequeue, BFS, and monotonic deques.",
    definition: "A queue is a linear collection following the First-In, First-Out (FIFO) principle. The first element added is the first one removed. Enqueue adds to the rear; Dequeue removes from the front. A Deque (double-ended queue) allows O(1) insertions and deletions at both the front and rear.",
    realLifeAnalogy: "A queue of people waiting in line at a cinema ticket counter. The first person to arrive in line is the first person served and allowed into the movie. Cutting in line is not allowed.",
    whyWeNeedIt: "Queues are the engine behind Breadth-First Search (BFS) in trees and graphs, printer job scheduling, web server request processing, and sliding-window maximums.",
    keyConcepts: [
      "FIFO: First In First Out.",
      "Enqueue (push_back): Add to rear (O(1)).",
      "Dequeue (pop_front): Remove from front (O(1)).",
      "Circular Queue: Reuses array slots using modulo arithmetic: index = (index + 1) % capacity.",
      "Deque (Double-Ended Queue): Supports push_front, pop_front, push_back, pop_back in O(1) time.",
      "Monotonic Deque: Maintains elements in monotonic order for O(n) sliding-window maximum."
    ],
    howItWorksSteps: [
      "1. In Python, use collections.deque (not a standard list) because list.pop(0) is O(n) while deque.popleft() is O(1).",
      "2. Enqueue: queue.append(val).",
      "3. Dequeue: val = queue.popleft().",
      "4. Front inspection: val = queue[0]."
    ],
    complexityTable: [
      { operation: "Enqueue", time: "O(1)", space: "O(1)", note: "Add to rear" },
      { operation: "Dequeue", time: "O(1)", space: "O(1)", note: "Remove from front" },
      { operation: "Peek Front", time: "O(1)", space: "O(1)", note: "Inspect front element" }
    ],
    commonPitfalls: [
      "Using Python list as a queue: Calling list.pop(0) shifts all n elements to the left, taking O(n) time instead of O(1). Always use collections.deque."
    ],
    codeExample: {
      python: `# Python: Queue Implementation using collections.deque
from collections import deque

class MyQueue:
    def __init__(self):
        self.items = deque()
        
    def enqueue(self, val):
        self.items.append(val)
        
    def dequeue(self):
        if not self.items:
            return None
        return self.items.popleft() # O(1)
        
    def peek(self):
        return self.items[0] if self.items else None
        
    def is_empty(self):
        return len(self.items) == 0

q = MyQueue()
q.enqueue(10)
q.enqueue(20)
print(q.dequeue()) # 10`,
      cpp: `// C++: Queue example
#include <queue>
#include <iostream>

int main() {
    std::queue<int> q;
    q.push(10);
    q.push(20);
    std::cout << q.front() << "\\n"; // 10
    q.pop();
    return 0;
}`,
      java: `// Java: Queue using LinkedList
import java.util.LinkedList;
import java.util.Queue;

public class QueueDemo {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(10);
        q.offer(20);
        System.out.println(q.poll()); // 10
    }
}`,
      javascript: `// JavaScript: Queue using array with pointer
class SimpleQueue {
    constructor() { this.items = []; this.head = 0; }
    enqueue(val) { this.items.push(val); }
    dequeue() { return this.items[this.head++]; }
    peek() { return this.items[this.head]; }
}`
    },
    relatedProblemIds: ["implement-queue-using-stacks", "sliding-window-maximum"]
  },

  // =========================================================================
  // Stage 7: Recursion & Backtracking
  // =========================================================================
  {
    id: "recursion",
    title: "Recursion",
    stage: 7,
    stageName: "Recursion and Backtracking",
    category: "Techniques",
    summary: "Functions that call themselves: Base cases, recursive cases, call stacks, and recursion trees.",
    definition: "Recursion is a programming technique where a function solves a problem by calling smaller instances of itself. Every recursive function must have two parts: 1) One or more Base Cases that stop the recursion, and 2) A Recursive Case that reduces the problem towards the base case.",
    realLifeAnalogy: "Russian nesting dolls (Matryoshka). You open a large doll to find a slightly smaller doll inside. You continue opening smaller and smaller dolls until you reach the smallest solid wooden doll (the base case) that cannot be opened.",
    whyWeNeedIt: "Many fundamental computer science structures (trees, graphs, file directories) are inherently recursive. Divide-and-conquer algorithms (Merge Sort, Quick Sort) rely on recursion.",
    keyConcepts: [
      "Base Case: The terminating condition that returns a direct answer without recursing.",
      "Recursive Step: The function calls itself with a strictly smaller or simpler input.",
      "Call Stack: Every recursive call adds a frame to RAM holding its local variables. When base case is hit, stack frames unwind.",
      "Stack Overflow: Occurs when base case is missing or never reached, exhausting available stack memory.",
      "Tail Recursion: A recursive call where the function call is the very last operation performed before returning."
    ],
    howItWorksSteps: [
      "1. Forward Phase: Function calls itself repeatedly with smaller arguments, pushing frames onto call stack.",
      "2. Base Case: The condition where the problem is trivially small (e.g. n <= 1) is reached.",
      "3. Unwinding Phase: Results return backwards down the call stack, popping frames one by one."
    ],
    complexityTable: [
      { operation: "Factorial n!", time: "O(n)", space: "O(n)", note: "n recursive stack frames" },
      { operation: "Naive Fibonacci", time: "O(2ⁿ)", space: "O(n)", note: "Binary recursion tree of height n" }
    ],
    commonPitfalls: [
      "Missing base case: Results in RecursionError / Maximum call stack size exceeded.",
      "Not moving towards base case: e.g. calling f(n) instead of f(n - 1)."
    ],
    codeExample: {
      python: `# Python: Recursive Factorial with step print
def factorial(n):
    # 1. Base case
    if n <= 1:
        return 1
    # 2. Recursive case
    return n * factorial(n - 1)

print(factorial(5)) # Output: 120 (5 * 4 * 3 * 2 * 1)`,
      cpp: `// C++: Factorial
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
      java: `// Java: Factorial
public class Factorial {
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`,
      javascript: `// JavaScript: Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`
    },
    relatedProblemIds: ["fibonacci-number", "subsets", "climbing-stairs"]
  },

  {
    id: "backtracking",
    title: "Backtracking",
    stage: 7,
    stageName: "Recursion and Backtracking",
    category: "Techniques",
    summary: "Systematic search using recursion: Choice, Explore, and Undo to find all valid combinations, permutations, and puzzle solutions.",
    definition: "Backtracking is an algorithmic paradigm that systematically explores all possible candidates to build a solution. If a candidate cannot possibly lead to a valid solution, the algorithm 'backtracks' (undoes the last choice) and tries the next alternative.",
    realLifeAnalogy: "Navigating a hedge maze. You walk down a path. If you hit a dead end, you retrace your steps back to the last fork in the road and try the other direction.",
    whyWeNeedIt: "Backtracking solves constraint satisfaction problems like Sudoku, N-Queens, crossword puzzles, generating subsets, permutations, and pathfinding.",
    keyConcepts: [
      "The Three Steps: 1. Make a choice. 2. Explore (recurse). 3. Undo the choice (backtrack).",
      "Decision Tree: Visual tree representing all possible choices at each step.",
      "Pruning: Checking constraints early and cutting off branches that cannot possibly lead to a solution, saving massive amounts of time.",
      "Subsets / Power Set: Generating all 2ⁿ subsets of an array.",
      "Permutations: Generating all n! orderings of elements."
    ],
    howItWorksSteps: [
      "1. Define backtrack(path, start_index).",
      "2. Base case: If path satisfies condition (e.g. length == k), save a copy of path.",
      "3. Loop through candidates from start_index to n-1:",
      "4. Choose: path.append(nums[i]).",
      "5. Explore: backtrack(path, i + 1).",
      "6. Unchoose: path.pop() (backtrack step!)."
    ],
    complexityTable: [
      { operation: "Subsets (Power Set)", time: "O(n × 2ⁿ)", space: "O(n)", note: "2ⁿ subsets each of length up to n" },
      { operation: "Permutations", time: "O(n × n!)", space: "O(n)", note: "n! leaf nodes" }
    ],
    commonPitfalls: [
      "Forgetting to make a shallow copy: In Python, writing result.append(path) appends a reference. When path is modified, earlier saved answers change! Use result.append(path[:]) or path.copy().",
      "Forgetting to undo the choice: Leaving elements in the path after returning from the recursive call."
    ],
    codeExample: {
      python: `# Python: Generate all Subsets (Power Set)
def subsets(nums):
    result = []
    
    def backtrack(start, current_path):
        # Every path state is a valid subset
        result.append(list(current_path))
        
        for i in range(start, len(nums)):
            # 1. Make choice
            current_path.append(nums[i])
            # 2. Explore
            backtrack(i + 1, current_path)
            # 3. Undo choice (Backtrack)
            current_path.pop()
            
    backtrack(0, [])
    return result

print(subsets([1, 2, 3]))
# Output: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]`,
      cpp: `// C++: Subsets
#include <vector>

void backtrack(int start, std::vector<int>& nums, std::vector<int>& path, std::vector<std::vector<int>>& res) {
    res.push_back(path);
    for (size_t i = start; i < nums.size(); ++i) {
        path.push_back(nums[i]);
        backtrack(i + 1, nums, path, res);
        path.pop_back(); // Undo
    }
}`,
      java: `// Java: Subsets
import java.util.ArrayList;
import java.util.List;

public class SubsetsGenerator {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), res);
        return res;
    }
    private static void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.remove(path.size() - 1); // Undo
        }
    }
}`,
      javascript: `// JavaScript: Subsets
function subsets(nums) {
    const res = [];
    function backtrack(start, path) {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop(); // Undo
        }
    }
    backtrack(0, []);
    return res;
}`
    },
    relatedProblemIds: ["subsets", "permutations", "combination-sum", "n-queens"]
  },

  // =========================================================================
  // Stage 8: Trees & BSTs
  // =========================================================================
  {
    id: "trees",
    title: "Trees & Binary Trees",
    stage: 8,
    stageName: "Trees and Binary Search Trees",
    category: "Non-Linear Data Structures",
    summary: "Hierarchical non-linear structure: Root, leaves, height, depth, and traversals (Preorder, Inorder, Postorder, Level-Order).",
    definition: "A tree is a non-linear, hierarchical data structure consisting of nodes connected by edges. The top node is the root. Nodes with no children are leaves. A Binary Tree is a tree where each node has at most two children, typically named left and right.",
    realLifeAnalogy: "A family tree or an organizational company hierarchy. The CEO is at the top (root). Under the CEO are Vice Presidents, and under them are managers and staff. Nobody reports to two different bosses (no cycles).",
    whyWeNeedIt: "Trees represent hierarchical data naturally (HTML DOM, filesystem folders, organization charts, JSON parsing) and serve as the foundation for search trees, heaps, and tries.",
    keyConcepts: [
      "Root: The topmost node with no parent.",
      "Leaf: A node with no children (left = null and right = null).",
      "Height vs Depth: Depth is number of edges from root down to node. Height is number of edges from node down to its deepest leaf.",
      "Full Binary Tree: Every node has 0 or 2 children.",
      "Complete Binary Tree: All levels are completely filled except possibly the last level, which is filled from left to right.",
      "Perfect Binary Tree: All internal nodes have 2 children and all leaves are at the same level.",
      "Traversals: Preorder (Root, Left, Right), Inorder (Left, Root, Right), Postorder (Left, Right, Root), Level-Order (Breadth-First using a queue)."
    ],
    howItWorksSteps: [
      "1. DFS (Recursive): Visit node, recurse on node.left, recurse on node.right.",
      "2. Inorder Traversal on BST yields elements in strictly sorted ascending order.",
      "3. BFS (Level Order): Use a queue. Enqueue root. While queue is not empty, pop node, process it, and enqueue its left and right children."
    ],
    complexityTable: [
      { operation: "Tree Traversal (DFS / BFS)", time: "O(n)", space: "O(h)", note: "Visits all n nodes. h is tree height" },
      { operation: "Height of Tree (balanced)", time: "O(n)", space: "O(log n)", note: "Balanced tree height is log₂(n)" }
    ],
    commonPitfalls: [
      "Confusing height and depth definitions.",
      "Ignoring the call stack space for skewed trees: In a degenerated (linked list-like) tree, recursion depth is O(n), risking stack overflow."
    ],
    codeExample: {
      python: `# Python: Maximum Depth of a Binary Tree
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if not root:
        return 0
    # Height of tree is 1 + maximum height of its subtrees
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      cpp: `// C++: Max Depth
#include <algorithm>

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
}`,
      java: `// Java: Max Depth
public class TreeDepth {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      javascript: `// JavaScript: Max Depth
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    },
    relatedProblemIds: ["maximum-depth-of-binary-tree", "invert-binary-tree", "diameter-of-binary-tree", "binary-tree-level-order-traversal"]
  },

  {
    id: "binary-search-trees",
    title: "Binary Search Trees (BST)",
    stage: 8,
    stageName: "Trees and Binary Search Trees",
    category: "Non-Linear Data Structures",
    summary: "Ordered binary tree property: Left < Root < Right. Fast O(log n) search, insertion, and deletion when balanced.",
    definition: "A Binary Search Tree (BST) is a binary tree with an ordering property: for every node, all values in its left subtree are strictly smaller than the node's value, and all values in its right subtree are strictly greater. Inorder traversal of a BST always yields sorted order.",
    realLifeAnalogy: "A game of 'Guess My Number' between 1 and 100. If your guess is 50 and the secret number is smaller, you eliminate everything from 50 to 100 and only search left.",
    whyWeNeedIt: "A BST combines the fast search capability of a sorted array (O(log n)) with the fast insertion and deletion flexibility of a linked list.",
    keyConcepts: [
      "BST Invariant: left.val < root.val < right.val for all nodes in the respective subtrees.",
      "Search: Compare target with current node. If target < val, go left; if target > val, go right.",
      "Insertion: Traverse down to the appropriate null spot and attach the new node.",
      "Deletion: 3 Cases: 1. Leaf node: just delete it. 2. Node with 1 child: bypass it. 3. Node with 2 children: replace with inorder successor (smallest node in right subtree) and delete that successor.",
      "Balanced vs Unbalanced: When balanced (AVL, Red-Black), operations take O(log n). If elements are inserted in sorted order, the tree degrades into a linked list with O(n) operations."
    ],
    howItWorksSteps: [
      "1. Search: Start at root.",
      "2. If root is null, value is not present.",
      "3. If root.val == target, found!",
      "4. If target < root.val, search left child.",
      "5. If target > root.val, search right child."
    ],
    complexityTable: [
      { operation: "Search (Balanced)", time: "O(log n)", space: "O(log n)", note: "Height is log₂(n)" },
      { operation: "Search (Worst / Skewed)", time: "O(n)", space: "O(n)", note: "Degrades into linked list" },
      { operation: "Insert (Balanced)", time: "O(log n)", space: "O(log n)", note: "Fast pointer updates" },
      { operation: "Inorder Traversal", time: "O(n)", space: "O(h)", note: "Produces sorted ascending output" }
    ],
    commonPitfalls: [
      "Checking only immediate children when validating BST: It's not enough that left < root and right > root. Every node in the left subtree must be smaller than root. Must pass valid range (min_val, max_val).",
      "Forgetting to handle the 2-children deletion case."
    ],
    codeExample: {
      python: `# Python: Validate Binary Search Tree
def is_valid_bst(root):
    def validate(node, low, high):
        if not node:
            return True
        # Node value must be strictly within range
        if not (low < node.val < high):
            return False
        # Left subtree must be < node.val; Right subtree must be > node.val
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        
    return validate(root, float('-inf'), float('inf'))`,
      cpp: `// C++: Validate BST
#include <climits>

bool validate(TreeNode* node, long long low, long long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    return validate(node->left, low, node->val) && validate(node->right, node->val, high);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LLONG_MIN, LLONG_MAX);
}`,
      java: `// Java: Validate BST
public class ValidateBST {
    public static boolean isValidBST(TreeDepth.TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private static boolean validate(TreeDepth.TreeNode node, long low, long high) {
        if (node == null) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}`,
      javascript: `// JavaScript: Validate BST
function isValidBST(root) {
    function validate(node, low, high) {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    return validate(root, -Infinity, Infinity);
}`
    },
    relatedProblemIds: ["validate-binary-search-tree", "lowest-common-ancestor-of-a-binary-search-tree", "kth-smallest-element-in-a-bst"]
  },

  // =========================================================================
  // Stage 9: Heaps & Tries
  // =========================================================================
  {
    id: "heaps-priority-queues",
    title: "Heaps and Priority Queues",
    stage: 9,
    stageName: "Heaps and Tries",
    category: "Non-Linear Data Structures",
    summary: "Complete binary trees stored as arrays: Min-Heaps and Max-Heaps providing O(1) top access and O(log n) insertions.",
    definition: "A Binary Heap is a complete binary tree that satisfies the Heap Property. In a Min-Heap, every parent node is less than or equal to its children (minimum element is at the root). In a Max-Heap, every parent is greater than or equal to its children. Because it is a complete tree, it is efficiently packed inside a standard 1D array.",
    realLifeAnalogy: "An emergency room triage. Patients are not treated in the order they walked through the door (FIFO); instead, the patient with the highest medical severity (priority) is treated first regardless of when they arrived.",
    whyWeNeedIt: "Heaps power Dijkstra's algorithm, Prim's algorithm, Top K Frequent Elements, continuous median stream tracking, and operating system process schedulers.",
    keyConcepts: [
      "Array Representation: For node at index i: Left child = 2i + 1, Right child = 2i + 2, Parent = (i - 1) // 2.",
      "Heapify Up (Bubble Up): Used during insertion. Place new element at end of array, swap with parent while it violates heap property.",
      "Heapify Down (Bubble Down / Sift Down): Used during deletion. Replace root with last element, swap with smallest/largest child until heap property is restored.",
      "Build Heap: Converting an arbitrary array into a valid heap takes O(n) time, NOT O(n log n)!",
      "Python's heapq: A Min-Heap by default. To make a Max-Heap, multiply values by -1."
    ],
    howItWorksSteps: [
      "1. Push: Append to end of array. Bubble up by comparing with parent at (i-1)//2.",
      "2. Pop Min: Save root (arr[0]). Move last element to root. Pop last. Bubble down from root by swapping with smaller child.",
      "3. Peek Min: Return arr[0] in O(1) time."
    ],
    complexityTable: [
      { operation: "Get Min / Max", time: "O(1)", space: "O(1)", note: "Inspect root element at arr[0]" },
      { operation: "Insert (Push)", time: "O(log n)", space: "O(1)", note: "Bubbles up at most tree height" },
      { operation: "Extract Min / Max (Pop)", time: "O(log n)", space: "O(1)", note: "Bubbles down at most tree height" },
      { operation: "Build Heap (heapify)", time: "O(n)", space: "O(1)", note: "Linear mathematical summation" }
    ],
    commonPitfalls: [
      "Thinking building a heap takes O(n log n): Building a heap in-place takes O(n) time.",
      "Forgetting Python heapq is a min-heap: To get maximums, store negative numbers: -val."
    ],
    codeExample: {
      python: `# Python: Kth Largest Element using Min-Heap of size K
import heapq

def find_kth_largest(nums, k):
    # Maintain a min-heap of size k
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
            
    # The top of the min-heap is the kth largest element
    return heap[0]

print(find_kth_largest([3, 2, 1, 5, 6, 4], 2)) # Output: 5`,
      cpp: `// C++: Kth Largest Element using priority_queue
#include <vector>
#include <queue>

int findKthLargest(std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int x : nums) {
        minHeap.push(x);
        if (minHeap.size() > (size_t)k) minHeap.pop();
    }
    return minHeap.top();
}`,
      java: `// Java: Kth Largest Element
import java.util.PriorityQueue;

public class KthLargest {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int x : nums) {
            minHeap.offer(x);
            if (minHeap.size() > k) minHeap.poll();
        }
        return minHeap.peek();
    }
}`,
      javascript: `// JavaScript: Kth Largest (conceptual min-heap logic)
function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}`
    },
    relatedProblemIds: ["kth-largest-element-in-an-array", "top-k-frequent-elements", "merge-k-sorted-lists"]
  },

  {
    id: "tries",
    title: "Tries (Prefix Trees)",
    stage: 9,
    stageName: "Heaps and Tries",
    category: "Non-Linear Data Structures",
    summary: "Tree structure optimized for string prefixes: Autocomplete, dictionary lookups, and spellcheckers in O(L) time.",
    definition: "A Trie (pronounced 'try', from retrieval) or Prefix Tree is an organized tree data structure used to store a dynamic set of strings. Each node represents a common prefix character, with edges representing character transitions. Words sharing prefixes share the same path from root.",
    realLifeAnalogy: "Search engine autocomplete. When you type 'car', Google instantly shows 'card', 'carpet', 'carrot'. It doesn't scan millions of words; it walks down the 'c' -> 'a' -> 'r' node in its Trie and lists all child branches.",
    whyWeNeedIt: "Looking up whether a word of length L exists in a hash set takes O(L) time, but finding all words starting with a prefix of length L takes O(N × L) in a hash set. A Trie finds all prefix matches in O(L) time.",
    keyConcepts: [
      "Trie Node: Typically contains an array or dictionary of children (size 26 for English lowercase) and a boolean is_end_of_word flag.",
      "Root is Empty: The root node represents an empty string.",
      "Insertion: Walk character by character. If child doesn't exist, create it. Mark last node with is_end_of_word = True.",
      "Prefix Search: Walk down prefix characters. If all exist, return True."
    ],
    howItWorksSteps: [
      "1. Insert word: Set curr = root. For each char c in word: if c not in curr.children, curr.children[c] = TrieNode(). Set curr = curr.children[c]. Set curr.is_end = True.",
      "2. Search word: Walk characters. If child missing, return False. At end, return curr.is_end.",
      "3. StartsWith prefix: Walk characters. If child missing, return False. At end, return True."
    ],
    complexityTable: [
      { operation: "Insert Word of length L", time: "O(L)", space: "O(L)", note: "Creates at most L new nodes" },
      { operation: "Search Word of length L", time: "O(L)", space: "O(1)", note: "L pointer transitions" },
      { operation: "Prefix Check startsWith(P)", time: "O(P)", space: "O(1)", note: "P pointer transitions" }
    ],
    commonPitfalls: [
      "High memory usage: Each node can hold an array of 26 pointers, which can consume significant RAM if alphabet is large. Use a hash map or compressed trie (Radix Tree) when memory is tight."
    ],
    codeExample: {
      python: `# Python: Trie (Prefix Tree) Implementation
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end_of_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True

trie = Trie()
trie.insert("apple")
print(trie.search("apple"))   # True
print(trie.search("app"))     # False
print(trie.starts_with("app"))# True`,
      cpp: `// C++: Trie Node
#include <unordered_map>
#include <string>

class Trie {
    struct Node {
        std::unordered_map<char, Node*> children;
        bool isEnd = false;
    } *root;
public:
    Trie() { root = new Node(); }
    void insert(std::string word) {
        Node* curr = root;
        for (char c : word) {
            if (!curr->children.count(c)) curr->children[c] = new Node();
            curr = curr->children[c];
        }
        curr->isEnd = true;
    }
};`,
      java: `// Java: Trie
import java.util.HashMap;

public class Trie {
    static class Node {
        HashMap<Character, Node> children = new HashMap<>();
        boolean isEnd = false;
    }
    private Node root = new Node();
    public void insert(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            curr.children.putIfAbsent(c, new Node());
            curr = curr.children.get(c);
        }
        curr.isEnd = true;
    }
}`,
      javascript: `// JavaScript: Trie
class TrieNode { constructor() { this.children = {}; this.isEnd = false; } }
class Trie {
    constructor() { this.root = new TrieNode(); }
    insert(word) {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children[c]) curr.children[c] = new TrieNode();
            curr = curr.children[c];
        }
        curr.isEnd = true;
    }
}`
    },
    relatedProblemIds: ["implement-trie-prefix-tree", "word-search-ii"]
  },

  // =========================================================================
  // Stage 10: Graphs
  // =========================================================================
  {
    id: "graphs",
    title: "Graphs & Graph Algorithms",
    stage: 10,
    stageName: "Graphs",
    category: "Non-Linear Data Structures",
    summary: "Networks of vertices and edges: BFS, DFS, Dijkstra's shortest path, Topological Sort, and Connected Components.",
    definition: "A graph is a non-linear data structure consisting of a finite set of vertices (nodes) and edges (connections between pairs of vertices). Graphs can be directed (one-way streets) or undirected (two-way streets), and edges can have weights (distances, costs).",
    realLifeAnalogy: "A flight route network. Cities are vertices; direct flight routes between cities are edges. The ticket price or flight duration is the edge weight. If flights only go one way, the graph is directed.",
    whyWeNeedIt: "Graphs model the real world: social networks (followers), GPS navigation (shortest driving route), internet routing protocols, dependency resolution (npm/pip packages), and electrical circuits.",
    keyConcepts: [
      "Representations: Adjacency List (memory efficient O(V + E)) vs Adjacency Matrix (dense graphs, O(V²)).",
      "Breadth-First Search (BFS): Level-by-level traversal using a Queue. Finds shortest path in unweighted graphs in O(V + E).",
      "Depth-First Search (DFS): Goes deep down a branch before backtracking using a Stack / Recursion.",
      "Cycle Detection: Visited set + Parent pointer (undirected) or 3-color states (directed).",
      "Topological Sort (Kahn's Algorithm): Linear ordering of vertices in a Directed Acyclic Graph (DAG) using indegrees.",
      "Dijkstra's Algorithm: Shortest path in graphs with non-negative edge weights using a Min-Priority Queue in O((V + E) log V).",
      "Connected Components / Islands: Counting disjoint clusters in a 2D grid using BFS/DFS."
    ],
    howItWorksSteps: [
      "1. BFS: Create visited set and queue with start node.",
      "2. While queue has nodes: pop node u.",
      "3. For each neighbor v of u: if v not in visited, add v to visited and enqueue v.",
      "4. Dijkstra: Track distances array initialized to infinity. Push (0, start) to Min-Heap. While heap has nodes, extract (dist, u). If dist > distances[u], continue. Relax edges: for neighbor (v, weight), if dist + weight < distances[v], update and push."
    ],
    complexityTable: [
      { operation: "BFS / DFS Traversal", time: "O(V + E)", space: "O(V)", note: "V vertices, E edges" },
      { operation: "Dijkstra's Algorithm", time: "O((V + E) log V)", space: "O(V)", note: "Min-Heap priority queue" },
      { operation: "Topological Sort (Kahn's)", time: "O(V + E)", space: "O(V)", note: "Indegree queue processing" }
    ],
    commonPitfalls: [
      "Infinite loop due to cycles: Forgetting to maintain a visited set.",
      "Using Dijkstra with negative edge weights: Dijkstra fails with negative weights; use Bellman-Ford instead.",
      "Running Topological Sort on a Cyclic Graph: Topo sort only works on Directed Acyclic Graphs (DAGs)."
    ],
    codeExample: {
      python: `# Python: Number of Islands (2D Grid Graph DFS)
def num_islands(grid):
    if not grid:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def dfs(r, c):
        # Out of bounds or water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0' # Sink island (mark visited)
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
                
    return islands`,
      cpp: `// C++: Number of Islands
#include <vector>

void dfs(std::vector<std::vector<char>>& grid, int r, int c) {
    if (r < 0 || r >= (int)grid.size() || c < 0 || c >= (int)grid[0].size() || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c); dfs(grid, r - 1, c);
    dfs(grid, r, c + 1); dfs(grid, r, c - 1);
}

int numIslands(std::vector<std::vector<char>>& grid) {
    int count = 0;
    for (size_t r = 0; r < grid.size(); ++r) {
        for (size_t c = 0; c < grid[0].size(); ++c) {
            if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
        }
    }
    return count;
}`,
      java: `// Java: Number of Islands
public class Islands {
    public static int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
            }
        }
        return count;
    }
    private static void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
}`,
      javascript: `// JavaScript: Number of Islands
function numIslands(grid) {
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    }
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') { count++; dfs(r, c); }
        }
    }
    return count;
}`
    },
    relatedProblemIds: ["number-of-islands", "course-schedule", "network-delay-time", "clone-graph"]
  },

  // =========================================================================
  // Stage 11: Greedy Algorithms
  // =========================================================================
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms",
    stage: 11,
    stageName: "Greedy Algorithms",
    category: "Algorithms",
    summary: "Making the locally optimal choice at each step: Intervals, jump games, activity selection, and why greedy can fail.",
    definition: "A greedy algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate (local) benefit, without worrying about future consequences. A greedy algorithm yields a globally optimal solution only if the problem exhibits Optimal Substructure and the Greedy-Choice Property.",
    realLifeAnalogy: "Making change using standard coins (25¢, 10¢, 5¢, 1¢). To give 41¢ in change, you greedily take the largest coin that fits: one 25¢ quarter (16¢ left), then one 10¢ dime (6¢ left), one 5¢ nickel (1¢ left), and one 1¢ penny. Total: 4 coins.",
    whyWeNeedIt: "When applicable, greedy algorithms are dramatically faster than dynamic programming, often running in O(n log n) (due to sorting) or O(n) time.",
    keyConcepts: [
      "Greedy-Choice Property: A globally optimal solution can be reached by making a locally optimal choice.",
      "Optimal Substructure: An optimal solution to the problem contains optimal solutions to subproblems.",
      "Interval Scheduling: Sort intervals by end time and greedily select non-overlapping intervals.",
      "Counterexample Proof: If you can construct even one small input where the greedy choice fails, you must use Dynamic Programming instead (e.g. coin change with denominations [1, 3, 4] for amount 6; greedy chooses 4+1+1=3 coins, but optimal is 3+3=2 coins!)."
    ],
    howItWorksSteps: [
      "1. Identify the greedy criterion (e.g. earliest end time, highest ratio).",
      "2. Sort the inputs based on this criterion.",
      "3. Iterate linearly through the sorted list, accepting choices that don't violate constraints.",
      "4. Verify with a proof or test with counterexamples."
    ],
    complexityTable: [
      { operation: "Interval Scheduling", time: "O(n log n)", space: "O(1)", note: "Dominated by sorting intervals" },
      { operation: "Jump Game I", time: "O(n)", space: "O(1)", note: "Tracks furthest reachable index" }
    ],
    commonPitfalls: [
      "Assuming greedy works without proof: Many problems look greedy but are actually 0/1 Knapsack or DP in disguise."
    ],
    codeExample: {
      python: `# Python: Jump Game I (Can Reach End)
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False # Cannot reach this index
        max_reach = max(max_reach, i + jump)
        if max_reach >= len(nums) - 1:
            return True
    return True

print(can_jump([2, 3, 1, 1, 4])) # True
print(can_jump([3, 2, 1, 0, 4])) # False`,
      cpp: `// C++: Jump Game
#include <vector>
#include <algorithm>

bool canJump(std::vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (i > maxReach) return false;
        maxReach = std::max(maxReach, i + nums[i]);
    }
    return true;
}`,
      java: `// Java: Jump Game
public class JumpGame {
    public static boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }
}`,
      javascript: `// JavaScript: Jump Game
function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`
    },
    relatedProblemIds: ["jump-game", "merge-intervals", "non-overlapping-intervals"]
  },

  // =========================================================================
  // Stage 12: Dynamic Programming
  // =========================================================================
  {
    id: "dynamic-programming",
    title: "Dynamic Programming (DP)",
    stage: 12,
    stageName: "Dynamic Programming",
    category: "Advanced Algorithms",
    summary: "Breaking complex problems into overlapping subproblems: Memoization (top-down), Tabulation (bottom-up), and Space Optimization.",
    definition: "Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them down into smaller subproblems, solving each subproblem once, and storing its answer in memory (a table or cache) to avoid redundant recalculations.",
    realLifeAnalogy: "Writing '1 + 1 + 1 + 1 + 1' on a piece of paper. You ask someone 'What does that equal?'. They count and say '5'. Then you write another '+ 1' at the end and ask 'What about now?'. They instantly answer '6' because they remembered the previous answer '5' and simply added 1, rather than recounting from scratch!",
    whyWeNeedIt: "Naive recursion computes the exact same subproblems exponentially many times (Fibonacci takes O(2ⁿ)). DP reduces this to simple linear O(n) time by caching subproblem solutions.",
    keyConcepts: [
      "Overlapping Subproblems: The same subproblems are solved repeatedly during recursion.",
      "Optimal Substructure: An optimal solution to the problem can be constructed from optimal solutions to its subproblems.",
      "Top-Down (Memoization): Start from the original problem, recurse downwards, and store results in a hash map or array cache.",
      "Bottom-Up (Tabulation): Start from base cases and fill an iterative DP table from 0 upwards.",
      "State Definition: What does dp[i] represent? (e.g. dp[i] is the maximum money storable from first i houses).",
      "Recurrence Relation: The mathematical equation linking state dp[i] to earlier states.",
      "Space Optimization: If dp[i] only depends on the previous 1 or 2 states, we can drop the array and use just two variables, saving O(n) memory down to O(1)!"
    ],
    howItWorksSteps: [
      "1. Simple Recursive Formulation: Write the brute force recursive relation.",
      "2. Identify Overlapping Subproblems: Notice where f(i) is called multiple times.",
      "3. Memoize: Add a cache dictionary/array to store answers before returning.",
      "4. Tabulate: Invert the logic to build an iterative loop from base cases upward.",
      "5. Optimize Space: Notice if only the last k rows or variables are needed."
    ],
    complexityTable: [
      { operation: "Climbing Stairs (Tabulation)", time: "O(n)", space: "O(1) optimized", note: "dp[i] = dp[i-1] + dp[i-2]" },
      { operation: "0/1 Knapsack", time: "O(n × W)", space: "O(W)", note: "n items, capacity W" },
      { operation: "Longest Common Subsequence", time: "O(m × n)", space: "O(min(m, n))", note: "Strings of length m and n" },
      { operation: "Edit Distance", time: "O(m × n)", space: "O(min(m, n))", note: "Insertion, deletion, replacement" }
    ],
    commonPitfalls: [
      "Failing to define the DP state clearly before writing code.",
      "Off-by-one errors in table dimensions (always use size n+1 when index 0 represents empty state).",
      "Forgetting to verify base cases."
    ],
    codeExample: {
      python: `# Python: House Robber (1D DP with O(1) space)
def rob(nums):
    if not nums:
        return 0
    # prev2: max money up to i-2; prev1: max money up to i-1
    prev2 = 0
    prev1 = 0
    
    for x in nums:
        # Either rob current house + money from i-2, OR skip current house
        curr = max(x + prev2, prev1)
        prev2 = prev1
        prev1 = curr
        
    return prev1

print(rob([2, 7, 9, 3, 1])) # Output: 12 (Rob house 0, 2, 4: 2 + 9 + 1 = 12)`,
      cpp: `// C++: House Robber
#include <vector>
#include <algorithm>

int rob(std::vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int x : nums) {
        int curr = std::max(x + prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      java: `// Java: House Robber
public class HouseRobber {
    public static int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int curr = Math.max(x + prev2, prev1);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
      javascript: `// JavaScript: House Robber
function rob(nums) {
    let prev2 = 0, prev1 = 0;
    for (const x of nums) {
        const curr = Math.max(x + prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`
    },
    relatedProblemIds: ["climbing-stairs", "house-robber", "coin-change", "longest-increasing-subsequence", "unique-paths"]
  },

  // =========================================================================
  // Stage 13: Advanced Data Structures
  // =========================================================================
  {
    id: "disjoint-set-union",
    title: "Disjoint Set Union (Union-Find)",
    stage: 13,
    stageName: "Advanced Data Structures",
    category: "Advanced Data Structures",
    summary: "Tracking elements partitioned into disjoint subsets: Find, Union, Path Compression, and Union by Rank in near O(1) amortized time.",
    definition: "Disjoint Set Union (DSU), also known as Union-Find, is a data structure that tracks a partition of a set into disjoint (non-overlapping) subsets. It supports two primary operations: 1) Find (which subset an element belongs to), and 2) Union (join two subsets together). With Path Compression and Union by Rank, operations run in nearly constant α(n) (Inverse Ackermann) time.",
    realLifeAnalogy: "Merging social friend groups. Alice is leader of Group A, and Bob is leader of Group B. When Alice and Bob shake hands, their entire friend circles merge into one big group under a single leader.",
    whyWeNeedIt: "DSU solves dynamic connectivity queries, cycle detection in undirected graphs, Kruskal's Minimum Spanning Tree algorithm, and network cluster tracking in near O(1) time.",
    keyConcepts: [
      "Parent Array: parent[i] points to the representative leader of element i.",
      "Find with Path Compression: During find, point every visited node directly to the root leader. Flattens the tree.",
      "Union by Rank / Size: Attach the shorter tree under the taller tree root, keeping tree depth minimal.",
      "Inverse Ackermann Function α(n): For all practical values of n (even number of atoms in the universe), α(n) < 5. Essentially O(1) amortized!"
    ],
    howItWorksSteps: [
      "1. Find(x): If parent[x] == x, return x. Otherwise parent[x] = find(parent[x]) (path compression) and return parent[x].",
      "2. Union(x, y): Find roots rootX = find(x) and rootY = find(y). If rootX == rootY, already connected (cycle!). If different, attach root with smaller rank to larger rank."
    ],
    complexityTable: [
      { operation: "Find with Path Compression", time: "O(α(n)) ≈ O(1)", space: "O(1)", note: "Near instant" },
      { operation: "Union by Rank", time: "O(α(n)) ≈ O(1)", space: "O(1)", note: "Near instant" }
    ],
    commonPitfalls: [
      "Forgetting path compression: Without path compression, trees can become linear chains with O(n) operations."
    ],
    codeExample: {
      python: `# Python: Full Disjoint Set Union (Union-Find) with Rank & Path Compression
class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
        self.count = size # Number of connected components

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        
        if root_i != root_j:
            # Union by rank
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1
            self.count -= 1
            return True
        return False # Already connected (cycle detected)

uf = UnionFind(5)
uf.union(0, 1)
uf.union(1, 2)
print(uf.find(0) == uf.find(2)) # True`,
      cpp: `// C++: Disjoint Set Union
#include <vector>
#include <numeric>

class DSU {
    std::vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
};`,
      java: `// Java: DSU
public class DSU {
    int[] parent, rank;
    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    public boolean union(int i, int j) {
        int rI = find(i), rJ = find(j);
        if (rI == rJ) return false;
        if (rank[rI] < rank[rJ]) parent[rI] = rJ;
        else if (rank[rI] > rank[rJ]) parent[rJ] = rI;
        else { parent[rJ] = rI; rank[rI]++; }
        return true;
    }
}`,
      javascript: `// JavaScript: DSU
class DSU {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    find(i) {
        if (this.parent[i] === i) return i;
        return this.parent[i] = this.find(this.parent[i]);
    }
    union(i, j) {
        const rI = this.find(i), rJ = this.find(j);
        if (rI === rJ) return false;
        if (this.rank[rI] < this.rank[rJ]) this.parent[rI] = rJ;
        else if (this.rank[rI] > this.rank[rJ]) this.parent[rJ] = rI;
        else { this.parent[rJ] = rI; this.rank[rI]++; }
        return true;
    }
}`
    },
    relatedProblemIds: ["number-of-connected-components-in-an-undirected-graph", "redundant-connection"]
  },

  {
    id: "segment-fenwick-trees",
    title: "Segment Trees & Fenwick Trees",
    stage: 13,
    stageName: "Advanced Data Structures",
    category: "Advanced Data Structures",
    summary: "Range query powerhouses: Point updates and range sum / min queries in O(log n) time.",
    definition: "Segment Trees and Fenwick Trees (Binary Indexed Trees / BIT) are tree data structures designed for fast range queries and point updates on dynamic arrays. While prefix sums take O(1) for queries but O(n) for updates, Segment and Fenwick Trees balance both operations to O(log n).",
    realLifeAnalogy: "A corporate budget report. Instead of storing just individual receipts (slow to sum) or just grand totals (slow when receipts change), you store totals by store, by district, by region. Updating one receipt only updates its direct parent branches up to the top in log steps.",
    whyWeNeedIt: "Used when array values change frequently and range queries (sum, minimum, maximum, GCD) must be answered continuously.",
    keyConcepts: [
      "Segment Tree: A full binary tree where each node represents an interval [L, R]. Supports range sum, min, max in O(log n).",
      "Fenwick Tree (Binary Indexed Tree): Compact array representation utilizing binary lowest set bit (i & -i) to store cumulative intervals. Simpler to write and uses less memory than Segment Tree.",
      "Lazy Propagation: A technique for Segment Trees that enables range updates (updating all values from L to R) in O(log n) time instead of O(n)."
    ],
    howItWorksSteps: [
      "1. Fenwick Tree: index & (-index) isolates the lowest set bit.",
      "2. Update index i: while i <= n, tree[i] += delta, i += i & (-i).",
      "3. Prefix Query up to i: while i > 0, sum += tree[i], i -= i & (-i)."
    ],
    complexityTable: [
      { operation: "Fenwick Tree Point Update", time: "O(log n)", space: "O(n)", note: "Visits log n bits" },
      { operation: "Fenwick Tree Prefix Query", time: "O(log n)", space: "O(n)", note: "Visits log n bits" },
      { operation: "Segment Tree Build", time: "O(n)", space: "O(4n)", note: "4n nodes allocated" }
    ],
    commonPitfalls: [
      "Using 0-based indexing for Fenwick Trees: Fenwick trees rely on bit manipulation (i & -i) which loops infinitely on 0. Always use 1-based indexing."
    ],
    codeExample: {
      python: `# Python: Fenwick Tree (Binary Indexed Tree)
class FenwickTree:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1) # 1-based indexing
        
    def update(self, index, delta):
        i = index + 1
        while i <= self.size:
            self.tree[i] += delta
            i += i & (-i) # Add lowest set bit
            
    def query(self, index):
        sum_val = 0
        i = index + 1
        while i > 0:
            sum_val += self.tree[i]
            i -= i & (-i) # Subtract lowest set bit
        return sum_val

bit = FenwickTree(5)
bit.update(0, 3) # arr[0] = 3
bit.update(1, 2) # arr[1] = 2
print(bit.query(1)) # sum(arr[0..1]) = 5`,
      cpp: `// C++: Fenwick Tree
#include <vector>

class FenwickTree {
    int n;
    std::vector<int> tree;
public:
    FenwickTree(int n) : n(n), tree(n + 1, 0) {}
    void update(int i, int delta) {
        for (++i; i <= n; i += i & -i) tree[i] += delta;
    }
    int query(int i) {
        int sum = 0;
        for (++i; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    }
};`,
      java: `// Java: Fenwick Tree
public class FenwickTree {
    int[] tree;
    int n;
    public FenwickTree(int n) { this.n = n; tree = new int[n + 1]; }
    public void update(int i, int delta) {
        for (++i; i <= n; i += i & -i) tree[i] += delta;
    }
    public int query(int i) {
        int sum = 0;
        for (++i; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    }
}`,
      javascript: `// JavaScript: Fenwick Tree
class FenwickTree {
    constructor(n) { this.n = n; this.tree = new Array(n + 1).fill(0); }
    update(i, delta) {
        for (++i; i <= this.n; i += i & -i) this.tree[i] += delta;
    }
    query(i) {
        let sum = 0;
        for (++i; i > 0; i -= i & -i) sum += this.tree[i];
        return sum;
    }
}`
    },
    relatedProblemIds: ["range-sum-query-mutable"]
  },

  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    stage: 2,
    stageName: "Programming Fundamentals",
    category: "Foundations",
    summary: "Operating at the machine level with binary bits: AND, OR, XOR, NOT, bit shifts, and bitmasks.",
    definition: "Bit manipulation is the process of performing algorithmic operations directly on the individual binary bits (0s and 1s) of integers. Bitwise operations are executed directly by the CPU in a single clock cycle, making them blisteringly fast.",
    realLifeAnalogy: "A row of light switches on a control panel. Instead of writing a long sentence describing which lights are on, you write an 8-bit number like 10010011 where 1 means ON and 0 means OFF.",
    whyWeNeedIt: "Bit manipulation solves problems with zero extra memory (finding unique numbers with XOR), enables state representation for bitmask dynamic programming, and speeds up low-level code.",
    keyConcepts: [
      "AND (&): 1 only if both bits are 1.",
      "OR (|): 1 if either bit is 1.",
      "XOR (^): 1 if bits differ. Crucial properties: x ^ x = 0, and x ^ 0 = x.",
      "NOT (~): Inverts all bits.",
      "Left Shift (<<): Multiplies by 2: x << 1 equals x * 2.",
      "Right Shift (>>): Divides by 2: x >> 1 equals x // 2.",
      "Check if kth bit is set: (n & (1 << k)) != 0.",
      "Set kth bit: n | (1 << k).",
      "Clear kth bit: n & ~(1 << k).",
      "Toggle kth bit: n ^ (1 << k).",
      "Brian Kernighan's Algorithm: n & (n - 1) removes the lowest set bit. Counts set bits in O(set bits) time.",
      "Check Power of Two: (n > 0) and (n & (n - 1)) == 0."
    ],
    howItWorksSteps: [
      "1. XOR cancellation: Array where every element appears twice except one. XOR all numbers: duplicates cancel out to 0, leaving the single unique number!"
    ],
    complexityTable: [
      { operation: "Bitwise AND, OR, XOR, Shift", time: "O(1)", space: "O(1)", note: "Single CPU cycle" },
      { operation: "Count Set Bits (Kernighan)", time: "O(k)", space: "O(1)", note: "k is number of 1s" }
    ],
    commonPitfalls: [
      "Operator Precedence: Bitwise operators have lower precedence than comparison operators! Writing '(n & 1 == 0)' is evaluated as 'n & (1 == 0)'. Always use parentheses: '((n & 1) == 0)'."
    ],
    codeExample: {
      python: `# Python: Single Number using XOR
def single_number(nums):
    unique = 0
    for x in nums:
        unique ^= x # x ^ x = 0; duplicate numbers cancel out
    return unique

print(single_number([4, 1, 2, 1, 2])) # Output: 4`,
      cpp: `// C++: Single Number
#include <vector>

int singleNumber(std::vector<int>& nums) {
    int unique = 0;
    for (int x : nums) unique ^= x;
    return unique;
}`,
      java: `// Java: Single Number
public class SingleNumber {
    public static int singleNumber(int[] nums) {
        int unique = 0;
        for (int x : nums) unique ^= x;
        return unique;
    }
}`,
      javascript: `// JavaScript: Single Number
function singleNumber(nums) {
    return nums.reduce((acc, curr) => acc ^ curr, 0);
}`
    },
    relatedProblemIds: ["single-number", "number-of-1-bits", "counting-bits"]
  },

  {
    id: "advanced-data-structures",
    title: "Advanced Data Structures & Patterns",
    stage: 13,
    stageName: "Advanced Data Structures",
    category: "Advanced Data Structures",
    summary: "LRU Cache, Monotonic Queues, Sparse Tables, Rolling Hash, and Binary Lifting.",
    definition: "Advanced data structures are specialized tools designed for high-performance computing, competitive programming, and large-scale systems. These include Least Recently Used (LRU) Caches, Sparse Tables for Range Minimum Queries in O(1), and Binary Lifting for Lowest Common Ancestors.",
    realLifeAnalogy: "A high-speed espresso machine in a cafe. The barista keeps the most frequently used coffee beans directly within arm's reach on the counter (LRU Cache). Less common decaf beans are kept in the back cupboard.",
    whyWeNeedIt: "Standard data structures cannot solve certain problems within strict time limits. For example, answering millions of Static Range Minimum Queries requires Sparse Tables for O(1) query time.",
    keyConcepts: [
      "LRU Cache: Combines a Hash Map (for O(1) key lookup) with a Doubly Linked List (for O(1) recency eviction).",
      "Monotonic Queue: Maintains elements in increasing or decreasing order to answer sliding window minimum/maximum in O(n).",
      "Sparse Table: Precomputes powers of 2 (table[i][j]) to answer Range Minimum Queries (RMQ) on static arrays in O(1) time.",
      "Binary Lifting: Precomputes 2ᵏ ancestors of tree nodes to find Lowest Common Ancestor (LCA) in O(log n) time."
    ],
    howItWorksSteps: [
      "1. LRU Cache Get: Look up key in map. Move its node to the front of the doubly linked list. Return value.",
      "2. LRU Cache Put: If key exists, update value and move to front. If new key and cache is at capacity, evict tail node from list and map. Add new node to front and map."
    ],
    complexityTable: [
      { operation: "LRU Cache Get / Put", time: "O(1)", space: "O(Capacity)", note: "Hash map + Doubly Linked List" },
      { operation: "Sparse Table RMQ Query", time: "O(1)", space: "O(n log n)", note: "Static arrays only" }
    ],
    commonPitfalls: [
      "Modifying the doubly linked list pointers incorrectly when detaching a node."
    ],
    codeExample: {
      python: `# Python: LRU Cache using Doubly Linked List + Hash Map
class DNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # key -> DNode
        # Sentinel dummy nodes
        self.head = DNode()
        self.tail = DNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = DNode(key, value)
        self.cache[key] = node
        self._add_to_front(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]

lru = LRUCache(2)
lru.put(1, 1); lru.put(2, 2)
print(lru.get(1)) # 1
lru.put(3, 3)     # evicts key 2
print(lru.get(2)) # -1`,
      cpp: `// C++: LRU Cache
#include <unordered_map>
#include <list>

class LRUCache {
    int cap;
    std::list<std::pair<int, int>> dll;
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> map;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!map.count(key)) return -1;
        dll.splice(dll.begin(), dll, map[key]);
        return map[key]->second;
    }
    void put(int key, int value) {
        if (map.count(key)) {
            map[key]->second = value;
            dll.splice(dll.begin(), dll, map[key]);
            return;
        }
        if (dll.size() == (size_t)cap) {
            map.erase(dll.back().first);
            dll.pop_back();
        }
        dll.push_front({key, value});
        map[key] = dll.begin();
    }
};`,
      java: `// Java: LRU Cache
import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) { return super.getOrDefault(key, -1); }
    public void put(int key, int val) { super.put(key, val); }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
      javascript: `// JavaScript: LRU Cache using Map insertion order
class LRUCache {
    constructor(capacity) { this.cap = capacity; this.map = new Map(); }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }
    put(key, val) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, val);
        if (this.map.size > this.cap) {
            const firstKey = this.map.keys().next().value;
            this.map.delete(firstKey);
        }
    }
}`
    },
    relatedProblemIds: ["lru-cache", "sliding-window-maximum"]
  }
];
