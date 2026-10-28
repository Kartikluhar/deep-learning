/**
 * MLForge DSA Pattern Recognition Guide
 * Helps students and developers diagnose coding problems and pick the right technique.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};
window.MLForge.dsa.data = window.MLForge.dsa.data || {};

MLForge.dsa.data.patterns = [
  {
    id: "hash-map-pattern",
    name: "Hash Map / Frequency Counting",
    category: "Lookup & Counting",
    summary: "Instant O(1) key lookup and frequency tracking to eliminate nested loops.",
    whatItMeans: "Using a hash table (dictionary, unordered_map, HashMap) to remember elements we have previously seen or to count the occurrences of each element.",
    clues: [
      "Problem asks to find a pair, triplet, or complement that sums to a target (e.g. x + y = target).",
      "Problem involves frequency of elements, finding duplicates, or checking anagrams.",
      "You find yourself writing a nested loop where the inner loop just asks 'Have I seen this before?' or 'Where is the complement?'."
    ],
    simpleExample: "In Two Sum, for each number x, we check if (target - x) is in our hash map. If yes, we found our pair immediately!",
    commonProblems: ["Two Sum", "Contains Duplicate", "Group Anagrams", "First Unique Character in a String"],
    whenNotSuitable: "When space is constrained to strictly O(1) and the array is already sorted (use Two Pointers instead), or when elements must be processed in strict numeric order (use BST or Heap).",
    relatedProblemIds: ["two-sum", "contains-duplicate", "group-anagrams", "longest-consecutive-sequence"]
  },
  {
    id: "two-pointers-pattern",
    name: "Two Pointers (Opposite & Same Direction)",
    category: "Search & Partitioning",
    summary: "Two indexes moving inward or scanning sequentially to solve pair and partition problems in O(n) time.",
    whatItMeans: "Using two index variables that traverse an array or string together. Usually one starts at the left (0) and one at the right (n-1), moving toward each other based on comparison conditions.",
    clues: [
      "Input array is already sorted, or can be sorted without violating problem requirements.",
      "Problem asks for a pair or triplet meeting a sum or difference constraint.",
      "Problem asks to reverse an array/string, check palindromes, or partition elements in-place (like moving zeros).",
      "Problem involves trapped rain water or maximum container area."
    ],
    simpleExample: "In a sorted array, if arr[left] + arr[right] is smaller than target, increment left. If larger, decrement right.",
    commonProblems: ["Two Sum II (Sorted Input)", "Container With Most Water", "3Sum", "Trapping Rain Water", "Move Zeroes"],
    whenNotSuitable: "When the array is unsorted and you must preserve original indexes, or when the relationship between elements is not monotonic.",
    relatedProblemIds: ["two-sum-ii-input-array-is-sorted", "container-with-most-water", "3sum", "trapping-rain-water"]
  },
  {
    id: "sliding-window-pattern",
    name: "Sliding Window",
    category: "Subarrays & Substrings",
    summary: "Moving a contiguous slice across data, updating state incrementally in O(1) per step.",
    whatItMeans: "Maintaining a contiguous range [left, right] that expands and contracts to find an optimal (maximum, minimum, or target) subsegment.",
    clues: [
      "Input is an array, list, or string.",
      "Problem asks about contiguous subarrays or substrings (e.g. 'longest substring without repeats', 'maximum sum subarray of size k').",
      "Problem asks for the minimum or maximum window containing certain characters or numbers."
    ],
    simpleExample: "Find the maximum sum of any 3 consecutive numbers: calculate the sum of the first 3 numbers, then slide the window right by adding the new 4th number and subtracting the 1st number.",
    commonProblems: ["Maximum Average Subarray I", "Longest Substring Without Repeating Characters", "Minimum Size Subarray Sum", "Sliding Window Maximum"],
    whenNotSuitable: "When the problem asks about non-contiguous subsequences or subsets (use Dynamic Programming or Backtracking instead).",
    relatedProblemIds: ["longest-substring-without-repeating-characters", "minimum-size-subarray-sum", "sliding-window-maximum"]
  },
  {
    id: "prefix-sum-pattern",
    name: "Prefix Sum & Cumulative Aggregates",
    category: "Range Queries",
    summary: "Precomputing cumulative sums to answer any range sum query in O(1) time.",
    whatItMeans: "Creating an auxiliary array where prefix[i] stores the sum of all elements from 0 to i-1. The sum of range [L, R] is simply prefix[R+1] - prefix[L].",
    clues: [
      "Frequent range sum queries on an array that does NOT change (static array).",
      "Problems asking for the count or existence of subarrays summing to k.",
      "Need to find equilibrium points where sum of elements on left equals sum on right."
    ],
    simpleExample: "To find the sum of numbers between index 2 and index 5, calculate prefix[6] - prefix[2] in one instant subtraction.",
    commonProblems: ["Range Sum Query - Immutable", "Subarray Sum Equals K", "Find Pivot Index", "Product of Array Except Self"],
    whenNotSuitable: "When the array undergoes frequent modifications and updates (use Segment Trees or Fenwick Trees instead).",
    relatedProblemIds: ["subarray-sum-equals-k", "range-sum-query-immutable"]
  },
  {
    id: "binary-search-pattern",
    name: "Binary Search & Search on Answer",
    category: "Divide & Conquer",
    summary: "Repeatedly halving the search range on sorted data or monotonic answer spaces in O(log n) time.",
    whatItMeans: "Comparing the target against the middle element. If not found, discarding the half that cannot contain the target.",
    clues: [
      "Input array is sorted or rotated sorted.",
      "Required time complexity in problem description is explicitly O(log n).",
      "Problem asks for 'maximum minimum' or 'minimum maximum' feasible answer (Binary Search on Answer).",
      "Finding peak elements or boundaries in monotonic functions."
    ],
    simpleExample: "Finding whether 42 exists in a sorted list of 1,000 numbers: check number 500. If 500 > 42, search only the first 499 numbers.",
    commonProblems: ["Binary Search", "Search Insert Position", "Search in Rotated Sorted Array", "Find Peak Element", "Koko Eating Bananas"],
    whenNotSuitable: "When data is completely unsorted and cannot be sorted, or when there is no monotonic condition to guide the left/right decision.",
    relatedProblemIds: ["binary-search", "search-insert-position", "search-in-rotated-sorted-array", "find-peak-element"]
  },
  {
    id: "fast-slow-pointers-pattern",
    name: "Fast & Slow Pointers (Floyd's Tortoise and Hare)",
    category: "Pointers & Cycles",
    summary: "Moving two pointers at different speeds (1x and 2x) to detect cycles and find middle nodes.",
    whatItMeans: "Advancing a slow pointer by 1 node and a fast pointer by 2 nodes simultaneously. In a cyclic structure, the fast pointer will eventually lap and meet the slow pointer.",
    clues: [
      "Linked list problems asking to detect a loop or cycle.",
      "Need to find the exact middle node of a linked list in a single pass without knowing its length.",
      "Happy Number problems where numbers loop indefinitely."
    ],
    simpleExample: "Two runners on a circular running track. The faster runner (moving at twice the speed) will inevitably catch up and meet the slower runner from behind.",
    commonProblems: ["Linked List Cycle", "Linked List Cycle II (Find Start of Cycle)", "Middle of the Linked List", "Happy Number"],
    whenNotSuitable: "When random access is available (arrays), or when there are no pointer-based connections.",
    relatedProblemIds: ["linked-list-cycle", "middle-of-the-linked-list"]
  },
  {
    id: "monotonic-stack-pattern",
    name: "Monotonic Stack",
    category: "Next/Previous Element",
    summary: "A stack kept in strictly increasing or decreasing order to find next greater or previous smaller elements in O(n).",
    whatItMeans: "Iterating through an array while maintaining elements in a stack in sorted monotonic order. Before pushing a new item, pop all elements that violate the monotonic property.",
    clues: [
      "Problem asks for the 'Next Greater Element' or 'Previous Greater Element'.",
      "Problem asks for the 'Next Smaller Element' or 'Previous Smaller Element'.",
      "Histogram-based problems (e.g. Largest Rectangle in Histogram, Trapping Rain Water).",
      "Temperature tracking (e.g. Daily Temperatures: how many days until a warmer day?)."
    ],
    simpleExample: "In Daily Temperatures, whenever today's temperature is warmer than the temperature on top of the stack, pop from the stack and record today as its warmer day.",
    commonProblems: ["Next Greater Element I", "Daily Temperatures", "Largest Rectangle in Histogram", "Online Stock Span"],
    whenNotSuitable: "When you need random access to arbitrary elements or when elements do not have an order-based relationship.",
    relatedProblemIds: ["next-greater-element-i", "daily-temperatures", "largest-rectangle-in-histogram"]
  },
  {
    id: "backtracking-pattern",
    name: "Backtracking & Decision Trees",
    category: "Exhaustive Search",
    summary: "Explores all possible candidate choices, undoing invalid steps to generate combinations and permutations.",
    whatItMeans: "A recursive framework that builds candidate solutions step-by-step. If a candidate violates constraints, the algorithm abandons it (prunes) and backtracks to try the next option.",
    clues: [
      "Problem asks to generate 'all possible' combinations, permutations, subsets, or paths.",
      "Puzzle solving (Sudoku, N-Queens, Word Search in a 2D grid, Maze pathfinding).",
      "Constraint satisfaction where you must test possibilities and back up when stuck."
    ],
    simpleExample: "Solving a maze: walk forward until you hit a dead end, step backwards to the last fork, and try the alternative branch.",
    commonProblems: ["Subsets", "Permutations", "Combination Sum", "N-Queens", "Word Search"],
    whenNotSuitable: "When you only need to find the count or optimal score rather than the actual paths (use Dynamic Programming instead).",
    relatedProblemIds: ["subsets", "permutations", "combination-sum", "n-queens"]
  },
  {
    id: "bfs-dfs-pattern",
    name: "Breadth-First Search (BFS) & Depth-First Search (DFS)",
    category: "Graph & Tree Traversal",
    summary: "BFS uses a Queue for shortest paths layer-by-layer; DFS uses Recursion/Stack to explore deeply.",
    whatItMeans: "BFS explores all neighbors at the current depth before moving deeper. DFS plunges as deep as possible along each branch before backtracking.",
    clues: [
      "Input is a tree, graph, matrix of cells, or 2D maze.",
      "BFS: Problem asks for the shortest path or minimum steps in an unweighted graph.",
      "DFS: Problem asks to traverse all nodes, count connected islands, detect cycles, or evaluate expressions."
    ],
    simpleExample: "Finding connected land in Number of Islands: when an unvisited '1' is found, run DFS/BFS to visit and sink all neighboring land cells.",
    commonProblems: ["Number of Islands", "Binary Tree Level Order Traversal", "Clone Graph", "Word Ladder", "Course Schedule"],
    whenNotSuitable: "When edges have varying positive weights and you need the shortest path (use Dijkstra's algorithm instead).",
    relatedProblemIds: ["number-of-islands", "binary-tree-level-order-traversal", "course-schedule"]
  },
  {
    id: "topological-sort-pattern",
    name: "Topological Sort (Kahn's Algorithm)",
    category: "Dependencies & Ordering",
    summary: "Linear ordering of vertices in a DAG respecting directed dependencies using indegree tracking.",
    whatItMeans: "Ordering tasks such that for every directed edge from u to v, u comes before v in the order. Uses indegrees (incoming edges count) and a queue.",
    clues: [
      "Problem involves prerequisites, task scheduling, or build dependencies (e.g. 'Must take Course A before Course B').",
      "Need to detect if a directed graph contains a cycle.",
      "Compilation order in build tools."
    ],
    simpleExample: "Putting on clothes in the morning: you must put on socks before shoes, and an undershirt before a jacket.",
    commonProblems: ["Course Schedule", "Course Schedule II", "Alien Dictionary", "Minimum Height Trees"],
    whenNotSuitable: "When the graph is undirected or contains known cycles (a cyclic graph has no topological ordering).",
    relatedProblemIds: ["course-schedule"]
  },
  {
    id: "union-find-pattern",
    name: "Union-Find / Disjoint Set Union (DSU)",
    category: "Dynamic Connectivity",
    summary: "Near O(1) subset merging and connectivity checks for graphs and networks.",
    whatItMeans: "Tracking connected components as trees with path compression and rank optimization to unite components and check if two nodes share a root.",
    clues: [
      "Edges are added dynamically over time and you must answer connectivity queries.",
      "Need to detect cycles in an undirected graph.",
      "Need to find connected components in an undirected network.",
      "Kruskal's Minimum Spanning Tree algorithm."
    ],
    simpleExample: "Are user A and user B in the same social network cluster? Call find(A) == find(B).",
    commonProblems: ["Number of Connected Components", "Redundant Connection", "Accounts Merge", "Graph Valid Tree"],
    whenNotSuitable: "When edges are directed, or when you need the exact path between nodes rather than just connectivity.",
    relatedProblemIds: ["number-of-connected-components-in-an-undirected-graph", "redundant-connection"]
  },
  {
    id: "greedy-pattern",
    name: "Greedy Strategy",
    category: "Optimization",
    summary: "Making the best local choice at each step to reach a global optimum.",
    whatItMeans: "Choosing the option that looks best right now without reconsidering or undoing previous choices.",
    clues: [
      "Problem asks for the minimum or maximum of something (optimal solution).",
      "Sorting the input naturally groups optimal candidates together.",
      "Interval problems (scheduling, non-overlapping intervals, meeting rooms).",
      "Gas station, Jump game, Huffman coding."
    ],
    simpleExample: "Interval scheduling: always pick the activity that ends earliest to leave the maximum possible time for remaining activities.",
    commonProblems: ["Jump Game", "Merge Intervals", "Non-overlapping Intervals", "Gas Station"],
    whenNotSuitable: "When a local choice blocks a better global outcome (e.g. 0/1 Knapsack, Coin Change with non-canonical denominations). Use DP instead.",
    relatedProblemIds: ["jump-game", "merge-intervals", "non-overlapping-intervals"]
  },
  {
    id: "dynamic-programming-pattern",
    name: "Dynamic Programming (DP)",
    category: "Optimization & Counting",
    summary: "Breaking down problems with overlapping subproblems and optimal substructure into memoized states.",
    whatItMeans: "Storing subproblem solutions so that each subproblem is calculated only once. Expressed via recurrence relations: dp[state] = optimal(subproblems).",
    clues: [
      "Problem asks for maximum, minimum, or total number of ways.",
      "Decisions at current step depend on decisions made in earlier steps.",
      "Brute force recursion gives Time Limit Exceeded (TLE) because identical function calls recur repeatedly.",
      "Subproblems overlap extensively (e.g. Fibonacci, Knapsack, Longest Common Subsequence)."
    ],
    simpleExample: "Climbing stairs: To reach step n, you must come from either step n-1 or step n-2. Therefore, ways(n) = ways(n-1) + ways(n-2).",
    commonProblems: ["Climbing Stairs", "House Robber", "Coin Change", "Longest Increasing Subsequence", "Unique Paths", "Edit Distance"],
    whenNotSuitable: "When subproblems do not overlap (use Divide and Conquer like Merge Sort), or when a greedy choice is proven optimal.",
    relatedProblemIds: ["climbing-stairs", "house-robber", "coin-change", "longest-increasing-subsequence", "unique-paths"]
  },
  {
    id: "two-heaps-pattern",
    name: "Two Heaps Pattern",
    category: "Stream & Median",
    summary: "Using a Max-Heap for the smaller half and a Min-Heap for the larger half to find medians dynamically.",
    whatItMeans: "Partitioning incoming data stream into two halves: a Max-Heap holding the smaller half of numbers and a Min-Heap holding the larger half.",
    clues: [
      "Data arrives dynamically as a continuous stream.",
      "Problem asks to calculate or track the running median at any moment.",
      "Need to partition elements into two halves with O(1) median retrieval."
    ],
    simpleExample: "Find Median from Data Stream: balance heaps so sizes differ by at most 1. The median is either the top of the larger heap or the average of both tops.",
    commonProblems: ["Find Median from Data Stream", "Sliding Window Median"],
    whenNotSuitable: "When the entire dataset is static and known upfront (simple sorting takes O(n log n) once).",
    relatedProblemIds: ["kth-largest-element-in-an-array"]
  },
  {
    id: "bit-manipulation-pattern",
    name: "Bitmask & Bit Manipulation",
    category: "Bitwise",
    summary: "Using integer bits as compact boolean arrays or XOR properties to cancel duplicates in O(1) space.",
    whatItMeans: "Treating the binary bits of an integer as a set of boolean flags (e.g. bit k is 1 if item k is included). Using bitwise operators (&, |, ^, ~).",
    clues: [
      "Every number appears twice except one unique number (use XOR cancellation).",
      "Generating all subsets of a small array (size n <= 20) using integer bitmasks from 0 to 2ⁿ - 1.",
      "Problem asks about powers of two or counting set bits.",
      "State representation in Traveling Salesperson or matching problems with small n."
    ],
    simpleExample: "XOR all numbers in [2, 1, 4, 1, 2]: 2^2=0, 1^1=0, leaving 4 as the unique number in O(n) time and O(1) space.",
    commonProblems: ["Single Number", "Number of 1 Bits", "Counting Bits", "Subsets via Bitmask"],
    whenNotSuitable: "When n > 64 (standard integers have 64 bits), or when elements are floating-point numbers.",
    relatedProblemIds: ["single-number", "number-of-1-bits", "counting-bits"]
  }
];

