/**
 * MLForge DSA Complexity Cheat Sheet Data
 * Exhaustive reference for time and space complexity with realistic real-world assumptions.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};
window.MLForge.dsa.data = window.MLForge.dsa.data || {};

MLForge.dsa.data.cheatsheet = {
  dataStructures: [
    {
      name: "Array / Dynamic Array",
      category: "Linear",
      access: "O(1)",
      search: "O(n)",
      insertion: "O(n)",
      deletion: "O(n)",
      space: "O(n)",
      assumptions: "Access is instant via memory arithmetic base + i * size. Appending to dynamic array is O(1) amortized. Insert/delete in middle or front requires shifting remaining elements in O(n)."
    },
    {
      name: "Singly Linked List",
      category: "Linear",
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1) at head",
      deletion: "O(1) at head",
      space: "O(n)",
      assumptions: "Random access requires sequential traversal from head. Inserting/deleting at head takes O(1) pointer updates. Insertion at tail takes O(1) if tail pointer is maintained."
    },
    {
      name: "Doubly Linked List",
      category: "Linear",
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1) given node",
      deletion: "O(1) given node",
      space: "O(n)",
      assumptions: "Each node holds both next and prev pointers. Deleting a node given its pointer takes O(1) without needing to traverse from head."
    },
    {
      name: "Stack",
      category: "Linear",
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1) push",
      deletion: "O(1) pop",
      space: "O(n)",
      assumptions: "LIFO structure. Operations strictly restricted to the top of the stack. Peek is O(1)."
    },
    {
      name: "Queue",
      category: "Linear",
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1) enqueue",
      deletion: "O(1) dequeue",
      space: "O(n)",
      assumptions: "FIFO structure. Enqueue at rear and dequeue from front both take O(1) when implemented with linked list or circular array."
    },
    {
      name: "Hash Table / Hash Map",
      category: "Associative",
      access: "N/A",
      search: "O(1) avg / O(n) worst",
      insertion: "O(1) avg / O(n) worst",
      deletion: "O(1) avg / O(n) worst",
      space: "O(n)",
      assumptions: "Average case assumes a uniform hash function distributing keys evenly. Worst case O(n) happens if all keys collide into the exact same bucket."
    },
    {
      name: "Binary Search Tree (Unbalanced)",
      category: "Trees",
      access: "O(log n) avg / O(n) worst",
      search: "O(log n) avg / O(n) worst",
      insertion: "O(log n) avg / O(n) worst",
      deletion: "O(log n) avg / O(n) worst",
      space: "O(n)",
      assumptions: "Average case assumes random insertion order (tree height log n). Worst case O(n) occurs when elements are inserted in sorted order, forming a degenerate linked list."
    },
    {
      name: "Balanced BST (AVL / Red-Black)",
      category: "Trees",
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)",
      space: "O(n)",
      assumptions: "Guaranteed O(log n) worst case because self-balancing rotations keep the maximum height strictly bounded to O(log n)."
    },
    {
      name: "Binary Heap (Min / Max Heap)",
      category: "Heaps",
      access: "O(1) peek root",
      search: "O(n)",
      insertion: "O(log n)",
      deletion: "O(log n) extract",
      space: "O(n)",
      assumptions: "Root peek is instant O(1). Building a heap from an array of n items takes O(n) time via heapify."
    },
    {
      name: "Trie (Prefix Tree)",
      category: "Trees",
      access: "O(L)",
      search: "O(L)",
      insertion: "O(L)",
      deletion: "O(L)",
      space: "O(ALPHABET × L × N)",
      assumptions: "L is length of the key string. Operations do not depend on the total number of words N in the trie, only on string length L."
    },
    {
      name: "Disjoint Set Union (Union-Find)",
      category: "Advanced",
      access: "O(α(n))",
      search: "O(α(n)) find",
      insertion: "O(α(n)) union",
      deletion: "N/A",
      space: "O(n)",
      assumptions: "With path compression and union by rank, operation time is bounded by the Inverse Ackermann function α(n) < 5, which is practically constant O(1)."
    },
    {
      name: "Fenwick Tree (Binary Indexed Tree)",
      category: "Advanced",
      access: "N/A",
      search: "O(log n) query",
      insertion: "O(log n) update",
      deletion: "N/A",
      space: "O(n)",
      assumptions: "Point updates and prefix sum queries both take O(log n) time by hopping lowest set bits (i & -i)."
    },
    {
      name: "Segment Tree",
      category: "Advanced",
      access: "O(log n) range query",
      search: "O(log n)",
      insertion: "O(log n) point update",
      deletion: "N/A",
      space: "O(4n)",
      assumptions: "Range queries and point updates take O(log n). Range updates take O(log n) when implemented with lazy propagation."
    }
  ],

  sortingAlgorithms: [
    {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      inPlace: "Yes",
      notes: "Best case O(n) if optimized with an early-exit flag when no swaps occur."
    },
    {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "No",
      inPlace: "Yes",
      notes: "Always makes O(n) swaps, making it useful when memory write operations are exceptionally expensive."
    },
    {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      inPlace: "Yes",
      notes: "Exceptionally fast for nearly-sorted arrays or small arrays (n < 20). Used as base in Timsort."
    },
    {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
      stable: "Yes",
      inPlace: "No",
      notes: "Guaranteed O(n log n) in all cases. Requires O(n) auxiliary space for temporary merge buffers."
    },
    {
      name: "Quick Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)",
      stable: "No",
      inPlace: "Yes",
      notes: "Fastest general-purpose comparison sort in practice due to cache locality. Worst case O(n²) occurs if pivot splits unbalanced."
    },
    {
      name: "Heap Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
      stable: "No",
      inPlace: "Yes",
      notes: "Guaranteed O(n log n) with strict O(1) extra memory, but has poorer cache locality than Quick Sort."
    },
    {
      name: "Counting Sort",
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
      space: "O(k)",
      stable: "Yes",
      inPlace: "No",
      notes: "Non-comparison sort. k is the range of non-negative integer keys. Blazing fast when k = O(n)."
    },
    {
      name: "Radix Sort",
      best: "O(d × (n + b))",
      average: "O(d × (n + b))",
      worst: "O(d × (n + b))",
      space: "O(n + b)",
      stable: "Yes",
      inPlace: "No",
      notes: "Sorts digit by digit (d digits, base b). Linear time when digit count d is small."
    }
  ],

  graphAlgorithms: [
    {
      name: "Breadth-First Search (BFS)",
      time: "O(V + E)",
      space: "O(V)",
      useCase: "Shortest path in unweighted graphs; level-by-level exploration."
    },
    {
      name: "Depth-First Search (DFS)",
      time: "O(V + E)",
      space: "O(V)",
      useCase: "Cycle detection, connected components, topological sorting, maze solving."
    },
    {
      name: "Dijkstra's Algorithm",
      time: "O((V + E) log V)",
      space: "O(V)",
      useCase: "Single-source shortest path with non-negative edge weights using Min-Heap."
    },
    {
      name: "Bellman-Ford Algorithm",
      time: "O(V × E)",
      space: "O(V)",
      useCase: "Shortest paths in graphs that may contain negative edge weights; detects negative weight cycles."
    },
    {
      name: "Floyd-Warshall Algorithm",
      time: "O(V³)",
      space: "O(V²)",
      useCase: "All-pairs shortest paths on dense graphs."
    },
    {
      name: "Kruskal's Algorithm (MST)",
      time: "O(E log E)",
      space: "O(V)",
      useCase: "Minimum Spanning Tree using edge sorting + Disjoint Set Union."
    },
    {
      name: "Prim's Algorithm (MST)",
      time: "O((V + E) log V)",
      space: "O(V)",
      useCase: "Minimum Spanning Tree starting from a root node using a Min-Heap priority queue."
    },
    {
      name: "Topological Sort (Kahn's)",
      time: "O(V + E)",
      space: "O(V)",
      useCase: "Dependency ordering in Directed Acyclic Graphs (DAGs) using indegree tracking."
    }
  ]
};

