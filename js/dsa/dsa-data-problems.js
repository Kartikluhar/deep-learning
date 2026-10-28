/**
 * MLForge Comprehensive DSA Problem Bank
 * Structured collection of coding interview problems across Easy, Medium, and Hard tiers.
 * Each problem includes complete solutions in Python, C++, Java, and JavaScript with dry runs.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};
window.MLForge.dsa.data = window.MLForge.dsa.data || {};

MLForge.dsa.data.problems = [
  // =========================================================================
  // Arrays & Hashing
  // =========================================================================
  {
    id: "two-sum",
    title: "Two Sum",
    slug: "two-sum",
    topic: "arrays",
    subtopic: "Hashing & Arrays",
    difficulty: "Easy",
    pattern: "Hash Map / Complement Lookup",
    tags: ["Array", "Hash Table", "Two Pointers"],
    statement: "Given an array of integers `nums` and an integer `target`, return the indexes of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one valid solution, and you may not use the same element twice. You can return the answer in any order.",
    inputDescription: "nums: an array of integers (e.g., [2, 7, 11, 15]), and target: an integer (e.g., 9).",
    outputDescription: "An array of two integers representing the 0-based indexes of the two numbers whose sum equals target.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1]."
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "Because nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2]."
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 3 + 3 == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    approach: "Instead of testing every pair with two nested loops (which takes slow O(n²) time), we can use a Hash Map. As we iterate through `nums`, we check if the complement `(target - nums[i])` has already been recorded in our hash map. If it is present, we immediately return its index and the current index `i`. If not, we save `nums[i]` and its index `i` into the map and continue. This solves the problem in a single linear pass.",
    dryRun: {
      headers: ["Step (i)", "Current Element (x)", "Complement (target - x)", "Map State Before Check", "Found in Map?", "Action"],
      rows: [
        ["0", "2", "9 - 2 = 7", "{}", "No", "Store {2: 0}"],
        ["1", "7", "9 - 7 = 2", "{2: 0}", "Yes! At index 0", "Return [0, 1]"]
      ]
    },
    solutions: {
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {} # Maps value to its index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
        
    return []`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `import java.util.HashMap;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`
    },
    codeExplanation: "1. We create a hash map named `seen` to store numbers as keys and their 0-based indexes as values.\n2. In a single loop over `nums`, we calculate `complement = target - num`.\n3. We look up `complement` in the map. If it exists, we found our pair and return `[seen[complement], i]`.\n4. If not found, we insert `seen[num] = i` so future elements can pair with it.",
    timeComplexity: "O(n) — We traverse the list of n elements exactly once. Each hash table lookup and insertion takes O(1) average time.",
    spaceComplexity: "O(n) — The hash map stores at most n elements in the worst case before finding the pair.",
    alternativeApproach: "Brute Force: Check every pair (i, j) with nested loops. Time complexity is O(n²), with O(1) space. The hash map trade-off uses extra memory to achieve blazing-fast O(n) running time.",
    commonMistakes: [
      "Using the same element twice (e.g. returning [0, 0] when target is 6 and nums[0] is 3). The check must look up elements stored in prior iterations.",
      "Assuming the input array is sorted. `nums` is unsorted, so two pointers from outside inwards cannot be used without sorting first (which loses original indexes)."
    ],
    relatedProblemIds: ["two-sum-ii-input-array-is-sorted", "3sum", "subarray-sum-equals-k"]
  },

  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    topic: "arrays",
    subtopic: "Hashing & Sets",
    difficulty: "Easy",
    pattern: "Hash Set / Seen Tracker",
    tags: ["Array", "Hash Table", "Sorting"],
    statement: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    inputDescription: "nums: an array of integers (e.g., [1, 2, 3, 1]).",
    outputDescription: "A boolean: true if any duplicate exists, false otherwise.",
    examples: [
      { input: "nums = [1, 2, 3, 1]", output: "true", explanation: "The number 1 appears at index 0 and index 3." },
      { input: "nums = [1, 2, 3, 4]", output: "false", explanation: "All elements are unique." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    approach: "Store seen numbers in a Hash Set. As we iterate through `nums`, if the current number is already in the set, we immediately return `true`. If the loop finishes without finding any duplicate, return `false`.",
    dryRun: {
      headers: ["Step (i)", "Element (x)", "Set Before Check", "Is x in Set?", "Action"],
      rows: [
        ["0", "1", "{}", "No", "Add 1 to set: {1}"],
        ["1", "2", "{1}", "No", "Add 2 to set: {1, 2}"],
        ["2", "3", "{1, 2}", "No", "Add 3 to set: {1, 2, 3}"],
        ["3", "1", "{1, 2, 3}", "Yes!", "Return true"]
      ]
    },
    solutions: {
      python: `def contains_duplicate(nums: list[int]) -> bool:
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,
      cpp: `#include <vector>
#include <unordered_set>

bool containsDuplicate(std::vector<int>& nums) {
    std::unordered_set<int> seen;
    for (int x : nums) {
        if (seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}`,
      java: `import java.util.HashSet;

public class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for (int x : nums) {
            if (!seen.add(x)) return true;
        }
        return false;
    }
}`,
      javascript: `function containsDuplicate(nums) {
    const seen = new Set();
    for (const x of nums) {
        if (seen.has(x)) return true;
        seen.add(x);
    }
    return false;
}`
    },
    codeExplanation: "1. We create an empty set `seen`.\n2. For each number `x`, we check membership in O(1) time.\n3. If present, return `true`. Otherwise, insert `x`.\n4. If loop completes, return `false`.",
    timeComplexity: "O(n) — Single pass over array with O(1) average set lookups.",
    spaceComplexity: "O(n) — Up to n unique elements stored in the set.",
    alternativeApproach: "Sorting: Sort the array first in O(n log n) time and check adjacent elements `nums[i] == nums[i+1]`. Uses O(1) extra space.",
    commonMistakes: ["Using a list instead of a set for `seen` (leads to O(n²) time due to linear search)."],
    relatedProblemIds: ["two-sum", "valid-anagram"]
  },

  {
    id: "maximum-subarray",
    title: "Maximum Subarray (Kadane's Algorithm)",
    slug: "maximum-subarray",
    topic: "arrays",
    subtopic: "Dynamic Programming / Arrays",
    difficulty: "Medium",
    pattern: "Kadane's Algorithm / Running Max",
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    statement: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
    inputDescription: "nums: an array of integers, which can include negative numbers.",
    outputDescription: "An integer representing the maximum possible sum of any contiguous subarray.",
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum = 1."
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
        explanation: "The entire array [5, 4, -1, 7, 8] has sum = 23."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    approach: "Kadane's Algorithm: As we scan the array from left to right, at each element `x`, we decide whether to add `x` to our existing running subarray sum (`current_sum + x`), or abandon the previous subarray and start a brand-new subarray with `x` alone (`current_sum = x`). We start fresh whenever the previous sum dropped below 0! We track the highest sum seen so far.",
    dryRun: {
      headers: ["i", "x", "current_sum = max(x, current_sum + x)", "max_so_far", "Decision"],
      rows: [
        ["0", "-2", "-2", "-2", "Initial element"],
        ["1", "1", "max(1, -2 + 1) = 1", "1", "Start fresh from 1"],
        ["2", "-3", "max(-3, 1 + -3) = -2", "1", "Extend existing: -2"],
        ["3", "4", "max(4, -2 + 4) = 4", "4", "Start fresh from 4"],
        ["4", "-1", "max(-1, 4 + -1) = 3", "4", "Extend: 3"],
        ["5", "2", "max(2, 3 + 2) = 5", "5", "Extend: 5"],
        ["6", "1", "max(1, 5 + 1) = 6", "6", "Extend: 6 (New peak!)"],
        ["7", "-5", "max(-5, 6 + -5) = 1", "6", "Extend: 1"],
        ["8", "4", "max(4, 1 + 4) = 5", "6", "Extend: 5"]
      ]
    },
    solutions: {
      python: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = nums[0]
    current_sum = nums[0]
    
    for x in nums[1:]:
        current_sum = max(x, current_sum + x)
        max_so_far = max(max_so_far, current_sum)
        
    return max_so_far`,
      cpp: `#include <vector>
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
      java: `public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentSum);
        }
        return maxSoFar;
    }
}`,
      javascript: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentSum);
    }
    return maxSoFar;
}`
    },
    codeExplanation: "1. Initialize `max_so_far` and `current_sum` to the first element `nums[0]`.\n2. Loop through elements starting from index 1.\n3. Update `current_sum = max(x, current_sum + x)`. If `current_sum` becomes negative, the next element starts fresh.\n4. Update `max_so_far = max(max_so_far, current_sum)`.\n5. Return `max_so_far`.",
    timeComplexity: "O(n) — Single linear pass over the array of n numbers.",
    spaceComplexity: "O(1) — Uses only two integer variables without any auxiliary storage.",
    alternativeApproach: "Divide and Conquer: Split array into left and right halves and find max in left, max in right, and max crossing midpoint. Takes O(n log n) time.",
    commonMistakes: [
      "Initializing `max_so_far = 0`: If all numbers in the array are negative (e.g. [-3, -2, -5]), initializing to 0 incorrectly returns 0 instead of -2. Always initialize to `nums[0]`."
    ],
    relatedProblemIds: ["best-time-to-buy-and-sell-stock", "maximum-product-subarray"]
  },

  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    topic: "arrays",
    subtopic: "Two Pointers / Monotonic Stack",
    difficulty: "Hard",
    pattern: "Two Pointers / Boundary Dominance",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    statement: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    inputDescription: "height: an array of non-negative integers representing bar elevations.",
    outputDescription: "An integer representing the total cubic units of trapped water.",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map traps 6 units of water between the peaks."
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "The elevation map traps 9 units of water."
      }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    approach: "The water trapped above any bar at index i is determined by: `water[i] = min(max_left, max_right) - height[i]`. We can use Two Pointers (`left` at 0, `right` at n-1). Maintain `left_max` and `right_max`. If `left_max < right_max`, water trapped at `left` is strictly bounded by `left_max`, so we can calculate water at `left` and advance `left += 1`. Otherwise, water at `right` is bounded by `right_max`, so we calculate and decrement `right -= 1`.",
    dryRun: {
      headers: ["Step", "left", "right", "left_max", "right_max", "Comparison", "Water Added", "Total Water"],
      rows: [
        ["1", "0 (0)", "11 (1)", "0", "1", "left_max < right_max", "max(0, 0-0) = 0", "0"],
        ["2", "1 (1)", "11 (1)", "1", "1", "left_max <= right_max", "max(0, 1-1) = 0", "0"],
        ["3", "2 (0)", "11 (1)", "1", "1", "left_max <= right_max", "1 - 0 = 1 unit", "1"]
      ]
    },
    solutions: {
      python: `def trap(height: list[int]) -> int:
    if not height:
        return 0
        
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            
    return water`,
      cpp: `#include <vector>
#include <algorithm>

int trap(std::vector<int>& height) {
    if (height.empty()) return 0;
    int left = 0, right = height.size() - 1;
    int leftMax = height[left], rightMax = height[right];
    int water = 0;
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = std::max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = std::max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    return water;
}`,
      java: `public class Solution {
    public int trap(int[] height) {
        if (height.length == 0) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = height[left], rightMax = height[right];
        int water = 0;
        while (left < right) {
            if (leftMax < rightMax) {
                left++;
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
            } else {
                right--;
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
            }
        }
        return water;
    }
}`,
      javascript: `function trap(height) {
    if (!height.length) return 0;
    let left = 0, right = height.length - 1;
    let leftMax = height[left], rightMax = height[right];
    let water = 0;
    while (left < right) {
        if (leftMax < rightMax) {
            left++;
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            right--;
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    return water;
}`
    },
    codeExplanation: "1. Two pointers `left` and `right` converge inwards from both sides.\n2. We track the running peak from the left (`left_max`) and right (`right_max`).\n3. The smaller boundary is the bottleneck. If `left_max < right_max`, water volume is determined by `left_max - height[left]`.\n4. This avoids pre-computing prefix and suffix max arrays.",
    timeComplexity: "O(n) — Each bar is visited exactly once.",
    spaceComplexity: "O(1) — Constant memory using four scalar variables.",
    alternativeApproach: "Dynamic Programming / Prefix-Suffix Arrays: Precompute `left_max[i]` and `right_max[i]` in two passes. Takes O(n) time and O(n) auxiliary space.",
    commonMistakes: [
      "Adding negative water values: Ensure water added is `max(0, left_max - height[left])`."
    ],
    relatedProblemIds: ["container-with-most-water", "largest-rectangle-in-histogram"]
  },

  // =========================================================================
  // Strings & Two Pointers
  // =========================================================================
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    slug: "valid-anagram",
    topic: "strings",
    subtopic: "Frequency Arrays",
    difficulty: "Easy",
    pattern: "Frequency Counter / Array Map",
    tags: ["String", "Hash Table", "Sorting"],
    statement: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word formed by rearranging the letters of a different word, using all the original letters exactly once.",
    inputDescription: "Two strings s and t consisting of lowercase English letters.",
    outputDescription: "Boolean: true if t is an anagram of s, false otherwise.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true", explanation: "Both strings contain 3 'a's, 1 'g', 1 'm', 1 'n', 1 'r'." },
      { input: 's = "rat", t = "car"', output: "false", explanation: "'rat' has 't' while 'car' has 'c'." }
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    approach: "If lengths differ, return false immediately. Create a fixed-size integer array of length 26. In a single pass, increment the count for characters in `s` and decrement for characters in `t`. Finally, check if all counts are 0.",
    dryRun: {
      headers: ["Char in s", "Char in t", "Count Effect", "Net State"],
      rows: [
        ["'r'", "'c'", "counts['r']++, counts['c']--", "counts['r']=1, counts['c']=-1"],
        ["'a'", "'a'", "counts['a']++, counts['a']--", "counts['a']=0"],
        ["'t'", "'r'", "counts['t']++, counts['r']--", "counts['t']=1, counts['r']=0, counts['c']=-1"]
      ]
    },
    solutions: {
      python: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = [0] * 26
    for c1, c2 in zip(s, t):
        counts[ord(c1) - ord('a')] += 1
        counts[ord(c2) - ord('a')] -= 1
    return all(c == 0 for c in counts)`,
      cpp: `#include <string>
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
      java: `public class Solution {
    public boolean isAnagram(String s, String t) {
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
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }
    return counts.every(c => c === 0);
}`
    },
    codeExplanation: "1. Length check: if lengths differ, anagram is impossible.\n2. Frequency array of size 26 tracks net occurrences.\n3. Increment for s, decrement for t.\n4. If all 26 values are 0, return true.",
    timeComplexity: "O(n) — Linear scan over strings of length n.",
    spaceComplexity: "O(1) — Fixed array of 26 integers regardless of input length.",
    alternativeApproach: "Sorting: Sort both strings and compare equality `sorted(s) == sorted(t)`. Takes O(n log n) time.",
    commonMistakes: ["Forgetting to check string lengths upfront."],
    relatedProblemIds: ["group-anagrams", "valid-palindrome"]
  },

  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    topic: "strings",
    subtopic: "Sliding Window",
    difficulty: "Medium",
    pattern: "Sliding Window / Dynamic Window",
    tags: ["String", "Sliding Window", "Hash Table"],
    statement: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputDescription: "s: a string consisting of English letters, digits, symbols, and spaces.",
    outputDescription: "An integer representing the length of the longest substring containing unique characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: "The answer is \"abc\", with length 3." },
      { input: 's = "bbbbb"', output: "1", explanation: "The answer is \"b\", with length 1." },
      { input: 's = "pwwkew"', output: "3", explanation: "The answer is \"wke\", with length 3. Note that \"pwke\" is a subsequence, not a substring." }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    approach: "Use a dynamic Sliding Window `[left, right]` and a hash map tracking the most recent index of each character. As `right` expands, if `s[right]` is already in the map and its previous index is >= `left`, jump `left` directly to `char_index_map[char] + 1`. The maximum window length `(right - left + 1)` is updated at every step.",
    dryRun: {
      headers: ["right", "char", "Map Before", "left before", "Duplicate in Window?", "left after", "Window Length"],
      rows: [
        ["0", "'a'", "{}", "0", "No", "0", "1 ('a')"],
        ["1", "'b'", "{'a': 0}", "0", "No", "0", "2 ('ab')"],
        ["2", "'c'", "{'a': 0, 'b': 1}", "0", "No", "0", "3 ('abc')"],
        ["3", "'a'", "{'a': 0, 'b': 1, 'c': 2}", "0", "Yes! Old 'a' at 0", "left = 0 + 1 = 1", "3 ('bca')"]
      ]
    },
    solutions: {
      python: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    max_len = 0
    left = 0
    
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    std::unordered_map<char, int> charMap;
    int maxLen = 0, left = 0;
    for (int right = 0; right < (int)s.length(); ++right) {
        if (charMap.count(s[right]) && charMap[s[right]] >= left) {
            left = charMap[s[right]] + 1;
        }
        charMap[s[right]] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      java: `import java.util.HashMap;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> charMap = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (charMap.containsKey(c) && charMap.get(c) >= left) {
                left = charMap.get(c) + 1;
            }
            charMap.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      javascript: `function lengthOfLongestSubstring(s) {
    const charMap = new Map();
    let maxLen = 0, left = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        if (charMap.has(c) && charMap.get(c) >= left) {
            left = charMap.get(c) + 1;
        }
        charMap.set(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
    },
    codeExplanation: "1. `left` and `right` define the current window of distinct characters.\n2. When `s[right]` repeats inside the window (`char_map[c] >= left`), jump `left` past the duplicate.\n3. Update `char_map[c] = right`.\n4. Update `max_len = max(max_len, right - left + 1)`.",
    timeComplexity: "O(n) — Both `left` and `right` traverse the string at most once.",
    spaceComplexity: "O(min(m, n)) — Size of the charset (at most 128 for ASCII).",
    alternativeApproach: "Hash Set with while loop: Remove characters at `left` one-by-one until duplicate is gone. Also O(n) but makes more pointer movements.",
    commonMistakes: [
      "Not checking `char_map[char] >= left`: An old duplicate might exist before the current window; without this check, `left` could jump backwards!"
    ],
    relatedProblemIds: ["minimum-size-subarray-sum", "sliding-window-maximum"]
  },

  // =========================================================================
  // Searching & Sorting
  // =========================================================================
  {
    id: "binary-search",
    title: "Binary Search",
    slug: "binary-search",
    topic: "searching",
    subtopic: "Binary Search",
    difficulty: "Easy",
    pattern: "Binary Search / Range Halving",
    tags: ["Array", "Binary Search"],
    statement: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    inputDescription: "nums: sorted array of integers. target: integer to find.",
    outputDescription: "0-based index of target if found, otherwise -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All integers in nums are unique.", "nums is sorted in ascending order."],
    approach: "Maintain two pointers `low` and `high`. Calculate `mid = low + (high - low) // 2`. If `nums[mid] == target`, return `mid`. If `nums[mid] < target`, search the right half (`low = mid + 1`). If `nums[mid] > target`, search the left half (`high = mid - 1`). If `low > high`, target does not exist.",
    dryRun: {
      headers: ["Iteration", "low", "high", "mid", "nums[mid]", "Comparison", "Next Action"],
      rows: [
        ["1", "0", "5", "2", "3", "3 < 9", "Search right: low = 2 + 1 = 3"],
        ["2", "3", "5", "4", "9", "9 == 9", "Target found! Return 4"]
      ]
    },
    solutions: {
      python: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      cpp: `#include <vector>

int search(std::vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
      javascript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    codeExplanation: "1. `low` starts at 0, `high` starts at `n - 1`.\n2. `low <= high` ensures all candidate elements are inspected.\n3. `low + (high - low) // 2` prevents integer overflow.\n4. Halves search space on every iteration.",
    timeComplexity: "O(log n) — Cuts the search space in half at each step.",
    spaceComplexity: "O(1) — Constant memory.",
    alternativeApproach: "Linear Search: Check each element sequentially. Takes O(n) time.",
    commonMistakes: [
      "Using `(low + high) // 2` in C++/Java where the sum can overflow 32-bit signed integers.",
      "Using `while (low < high)` which misses checking the single remaining element when `low == high`."
    ],
    relatedProblemIds: ["search-insert-position", "search-in-rotated-sorted-array"]
  },

  {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    topic: "searching",
    subtopic: "Modified Binary Search",
    difficulty: "Medium",
    pattern: "Binary Search / Half Sorted Invariant",
    tags: ["Array", "Binary Search"],
    statement: "Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    inputDescription: "nums: a sorted array of unique integers rotated at some pivot. target: integer.",
    outputDescription: "Index of target if found, else -1.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4." },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1", explanation: "3 does not exist." }
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i], target <= 10^4", "All values of nums are unique."],
    approach: "Key Insight: In a rotated sorted array, splitting at `mid` always leaves at least one half strictly sorted! If `nums[low] <= nums[mid]`, the left half is sorted: check if target lies within `[nums[low], nums[mid]]`. If so, search left; else search right. If the left half is not sorted, the right half MUST be sorted: check if target lies within `[nums[mid], nums[high]]`.",
    dryRun: {
      headers: ["low", "high", "mid", "nums[mid]", "Sorted Half", "Target Range Check", "Next Window"],
      rows: [
        ["0 (4)", "6 (2)", "3", "7", "Left [4..7] is sorted", "Target 0 in [4..7]? No", "Search right: low = 4"],
        ["4 (0)", "6 (2)", "5", "1", "Left [0..1] is sorted", "Target 0 in [0..1]? Yes", "Search left: high = 4"],
        ["4 (0)", "4 (0)", "4", "0", "Found target!", "nums[4] == 0", "Return 4"]
      ]
    },
    solutions: {
      python: `def search_rotated(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
            
        # Check if left half is sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1 # Target in sorted left
            else:
                low = mid + 1  # Target in right
        else:
            # Right half must be sorted
            if nums[mid] < target <= nums[high]:
                low = mid + 1  # Target in sorted right
            else:
                high = mid - 1 # Target in left
                
    return -1`,
      cpp: `#include <vector>

int search(std::vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
      java: `public class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
}`,
      javascript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`
    },
    codeExplanation: "1. At every step, check which half is strictly sorted (`nums[low] <= nums[mid]`).\n2. Use standard boundary checks on the sorted half.\n3. Halves problem size in O(log n) time.",
    timeComplexity: "O(log n) — Binary search splits array in half at each step.",
    spaceComplexity: "O(1) — No extra memory.",
    alternativeApproach: "Two passes: 1. Find pivot (minimum element) using binary search. 2. Binary search the target in the appropriate half.",
    commonMistakes: ["Failing to use `<=` for `nums[low] <= nums[mid]` when `low == mid`."],
    relatedProblemIds: ["binary-search", "find-peak-element"]
  },

  // =========================================================================
  // Linked Lists
  // =========================================================================
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    topic: "linked-lists",
    subtopic: "Pointers & Reversal",
    difficulty: "Easy",
    pattern: "Three Pointers / Pointer Inversion",
    tags: ["Linked List", "Recursion"],
    statement: "Given the `head` of a singly linked list, reverse the list, and return the reversed list's head.",
    inputDescription: "head: the head node of a singly linked list.",
    outputDescription: "The new head node of the reversed linked list.",
    examples: [
      { input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", explanation: "All pointers are inverted." },
      { input: "head = [1, 2]", output: "[2, 1]", explanation: "1 -> 2 becomes 2 -> 1." },
      { input: "head = []", output: "[]", explanation: "Empty list reverses to empty list." }
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    approach: "Use three pointers: `prev` (starts at null), `curr` (starts at head), and `next_node`. While `curr` is not null: save `next_node = curr.next`, flip `curr.next = prev`, advance `prev = curr`, and advance `curr = next_node`. At the end, `prev` points to the new head.",
    dryRun: {
      headers: ["Step", "curr.val", "next_node", "curr.next set to", "prev after step", "curr after step"],
      rows: [
        ["1", "1", "2", "null", "1", "2"],
        ["2", "2", "3", "1", "2", "3"],
        ["3", "3", "null", "2", "3", "null (Done: return prev=3)"]
      ]
    },
    solutions: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode) -> ListNode:
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
      cpp: `struct ListNode {
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
      java: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
      javascript: `function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
    },
    codeExplanation: "1. `prev` initializes to `null` because the original head becomes the new tail pointing to null.\n2. In the loop, save `next_temp` before breaking the connection.\n3. Reverse pointer: `curr.next = prev`.\n4. Shift `prev` and `curr` forward.\n5. When `curr` is null, `prev` is the new head.",
    timeComplexity: "O(n) — Each node visited once.",
    spaceComplexity: "O(1) — In-place pointer manipulation.",
    alternativeApproach: "Recursive: `new_head = reverse(head.next); head.next.next = head; head.next = null; return new_head;`. Takes O(n) call stack space.",
    commonMistakes: ["Reversing pointer without saving `curr.next` first, permanently losing access to the rest of the list."],
    relatedProblemIds: ["linked-list-cycle", "merge-two-sorted-lists", "palindrome-linked-list"]
  },

  {
    id: "linked-list-cycle",
    title: "Linked List Cycle (Detect Loop)",
    slug: "linked-list-cycle",
    topic: "linked-lists",
    subtopic: "Fast & Slow Pointers",
    difficulty: "Easy",
    pattern: "Floyd's Tortoise and Hare",
    tags: ["Linked List", "Two Pointers"],
    statement: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Return `true` if there is a cycle in the linked list. Otherwise, return `false`.",
    inputDescription: "head: the head of a linked list.",
    outputDescription: "Boolean: true if cycle exists, false otherwise.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1 (tail connects to node 1)", output: "true", explanation: "Cycle detected." },
      { input: "head = [1], pos = -1", output: "false", explanation: "No cycle." }
    ],
    constraints: ["The number of the nodes in the list is in the range [0, 10^4].", "-10^5 <= Node.val <= 10^5"],
    approach: "Floyd's Tortoise and Hare: Initialize `slow = head` and `fast = head`. Move `slow` by 1 step (`slow = slow.next`) and `fast` by 2 steps (`fast = fast.next.next`). If there is a cycle, the fast pointer will eventually lap the slow pointer and `slow == fast`. If `fast` reaches null, there is no cycle.",
    dryRun: {
      headers: ["Step", "Slow Node (1 step)", "Fast Node (2 steps)", "slow == fast?", "Status"],
      rows: [
        ["0", "Node 3", "Node 3", "Yes (start)", "Begin"],
        ["1", "Node 2", "Node 0", "No", "Continue"],
        ["2", "Node 0", "Node 2", "No", "Fast looped around"],
        ["3", "Node -4", "Node -4", "Yes!", "Match detected -> return true"]
      ]
    },
    solutions: {
      python: `def has_cycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      cpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      javascript: `function hasCycle(head) {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`
    },
    codeExplanation: "1. `slow` moves at speed 1; `fast` moves at speed 2.\n2. In a loop of length C, the relative distance between them decreases by 1 on every step.\n3. They are guaranteed to meet in at most C steps.",
    timeComplexity: "O(n) — Linear time.",
    spaceComplexity: "O(1) — Strict constant memory with two pointers.",
    alternativeApproach: "Hash Set: Store visited node memory addresses. If a node is already in the set, a cycle exists. Takes O(n) memory.",
    commonMistakes: ["Checking `fast.next` without verifying `fast` is non-null first (leads to NullPointerException)."],
    relatedProblemIds: ["reverse-linked-list", "middle-of-the-linked-list"]
  },

  // =========================================================================
  // Stacks & Queues
  // =========================================================================
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    topic: "stacks",
    subtopic: "LIFO Stack",
    difficulty: "Easy",
    pattern: "Stack Matching",
    tags: ["String", "Stack"],
    statement: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    inputDescription: "s: string of bracket characters.",
    outputDescription: "Boolean: true if valid, false otherwise.",
    examples: [
      { input: 's = "()"', output: "true", explanation: "Matching pair." },
      { input: 's = "()[]{}"', output: "true", explanation: "All three pairs are valid." },
      { input: 's = "(]"', output: "false", explanation: "Mismatched bracket types." }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    approach: "Use a Stack. For opening brackets, push onto the stack. For closing brackets, check if stack is empty (invalid) or top bracket doesn't match the closing bracket (invalid). If matching, pop the top. At the end, string is valid if and only if the stack is completely empty.",
    dryRun: {
      headers: ["Char", "Type", "Stack Before", "Action", "Stack After"],
      rows: [
        ["'('", "Open", "[]", "Push '('", "['(']"],
        ["'['", "Open", "['(']", "Push '['", "['(', '[']"],
        ["']'", "Close", "['(', '[']", "Top is '[' (Match!) -> Pop", "['(']"],
        ["')'", "Close", "['(']", "Top is '(' (Match!) -> Pop", "[] (Valid!)"]
      ]
    },
    solutions: {
      python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
            
    return len(stack) == 0`,
      cpp: `#include <string>
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
      java: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
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
      javascript: `function isValid(s) {
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
    codeExplanation: "1. Push open brackets onto stack.\n2. When encountering a close bracket, pop top item and check for match.\n3. Return `stack.length === 0` at end.",
    timeComplexity: "O(n) — Single pass over characters.",
    spaceComplexity: "O(n) — Stack holds up to n opening brackets.",
    alternativeApproach: "String Replacement: Repeatedly replace '()', '[]', '{}' with empty string. Very slow: O(n²) time.",
    commonMistakes: ["Returning true without checking `len(stack) == 0` (e.g. input is '(')."],
    relatedProblemIds: ["min-stack", "daily-temperatures"]
  },

  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    topic: "stacks",
    subtopic: "Monotonic Stack",
    difficulty: "Medium",
    pattern: "Monotonic Decreasing Stack",
    tags: ["Array", "Stack", "Monotonic Stack"],
    statement: "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
    inputDescription: "temperatures: array of daily temperatures.",
    outputDescription: "answer: array where answer[i] is days until warmer temperature.",
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", explanation: "Day 0 (73) waits 1 day to 74. Day 2 (75) waits 4 days to 76." },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]", explanation: "Each day is warmer than previous." }
    ],
    constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
    approach: "Use a Monotonic Decreasing Stack storing indexes. Iterate through `temperatures`. While the current temperature is greater than the temperature at the index on top of the stack, pop that index and record the difference `curr_i - prev_i`. Then push `curr_i` onto stack.",
    dryRun: {
      headers: ["Day (i)", "Temp", "Stack (indexes)", "Action", "Result Updates"],
      rows: [
        ["0", "73", "[0]", "Push 0", "-"],
        ["1", "74", "74 > 73: Pop 0", "ans[0] = 1 - 0 = 1", "ans[0] = 1"],
        ["1", "74", "[1]", "Push 1", "-"]
      ]
    },
    solutions: {
      python: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    ans = [0] * len(temperatures)
    stack = [] # Stores indexes of temperatures
    
    for i, temp in enumerate(temperatures):
        while stack and temp > temperatures[stack[-1]]:
            prev_i = stack.pop()
            ans[prev_i] = i - prev_i
        stack.append(i)
        
    return ans`,
      cpp: `#include <vector>
#include <stack>

std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
    int n = temperatures.size();
    std::vector<int> ans(n, 0);
    std::stack<int> st;
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
            int prevI = st.top();
            st.pop();
            ans[prevI] = i - prevI;
        }
        st.push(i);
    }
    return ans;
}`,
      java: `import java.util.Stack;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && temperatures[i] > temperatures[st.peek()]) {
                int prevI = st.pop();
                ans[prevI] = i - prevI;
            }
            st.push(i);
        }
        return ans;
    }
}`,
      javascript: `function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const ans = new Array(n).fill(0);
    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevI = stack.pop();
            ans[prevI] = i - prevI;
        }
        stack.push(i);
    }
    return ans;
}`
    },
    codeExplanation: "1. Stack holds indexes of pending days waiting for a warmer temperature.\n2. When today's temperature is warmer, resolve pending days.\n3. Each index pushed and popped at most once.",
    timeComplexity: "O(n) — Each index enters and leaves stack at most once.",
    spaceComplexity: "O(n) — Stack holds up to n indexes.",
    alternativeApproach: "Brute Force: Check every future day with nested loop. Takes O(n²) time.",
    commonMistakes: ["Storing temperature values on the stack instead of indexes (indexes are needed to calculate day differences)."],
    relatedProblemIds: ["next-greater-element-i", "valid-parentheses"]
  },

  // =========================================================================
  // Trees & BSTs
  // =========================================================================
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    topic: "trees",
    subtopic: "Binary Tree DFS",
    difficulty: "Easy",
    pattern: "Recursive Tree DFS",
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    statement: "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    inputDescription: "root: root of binary tree.",
    outputDescription: "Integer: maximum depth.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "Path 3 -> 20 -> 15 has length 3." },
      { input: "root = [1,null,2]", output: "2", explanation: "Path 1 -> 2 has length 2." }
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
    approach: "Recursion: Base case: if root is null, depth is 0. Otherwise, the depth of the current tree is `1 + max(maxDepth(root.left), maxDepth(root.right))`.",
    dryRun: {
      headers: ["Call on Node", "Left Subtree Depth", "Right Subtree Depth", "Computed Depth"],
      rows: [
        ["Node 15 (leaf)", "0", "0", "1 + max(0, 0) = 1"],
        ["Node 7 (leaf)", "0", "0", "1 + max(0, 0) = 1"],
        ["Node 20", "1 (Node 15)", "1 (Node 7)", "1 + max(1, 1) = 2"],
        ["Node 3 (root)", "1 (Node 9)", "2 (Node 20)", "1 + max(1, 2) = 3"]
      ]
    },
    solutions: {
      python: `def max_depth(root) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      cpp: `#include <algorithm>

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
}`,
      java: `public class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      javascript: `function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    },
    codeExplanation: "1. If node is null, return 0.\n2. Recurse on left and right children.\n3. Return 1 + max of both child depths.",
    timeComplexity: "O(n) — Visits all n nodes exactly once.",
    spaceComplexity: "O(h) — Auxiliary space on recursive call stack equal to tree height h.",
    alternativeApproach: "BFS Level-Order: Use a queue to count levels. Uses O(w) memory where w is max width of tree.",
    commonMistakes: ["Forgetting base case `if not root: return 0`."],
    relatedProblemIds: ["invert-binary-tree", "diameter-of-binary-tree"]
  },

  {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    topic: "binary-search-trees",
    subtopic: "BST Property Validation",
    difficulty: "Medium",
    pattern: "Range Bound DFS",
    tags: ["Tree", "Depth-First Search", "Binary Search Tree"],
    statement: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys strictly less than the node's key.\n- The right subtree of a node contains only nodes with keys strictly greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    inputDescription: "root: root node of binary tree.",
    outputDescription: "Boolean: true if valid BST, false otherwise.",
    examples: [
      { input: "root = [2,1,3]", output: "true", explanation: "1 < 2 < 3, valid BST." },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Root value is 5, but its right child is 4 (not greater than 5)." }
    ],
    constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "-2^31 <= Node.val <= 2^31 - 1"],
    approach: "Pass valid value ranges `(low, high)` down the recursion. For the root, range is `(-inf, +inf)`. When going left, update high bound: `(low, node.val)`. When going right, update low bound: `(node.val, high)`. If any node value violates its bounds, return false.",
    dryRun: {
      headers: ["Node", "Valid Range (low, high)", "Node Value", "In Range?", "Result"],
      rows: [
        ["Root (5)", "(-inf, +inf)", "5", "Yes", "Valid"],
        ["Left Child (1)", "(-inf, 5)", "1", "Yes", "Valid"],
        ["Right Child (4)", "(5, +inf)", "4", "NO! 4 is not > 5", "Return False"]
      ]
    },
    solutions: {
      python: `def is_valid_bst(root) -> bool:
    def validate(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        
    return validate(root, float('-inf'), float('inf'))`,
      cpp: `#include <climits>

bool validate(TreeNode* node, long long low, long long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    return validate(node->left, low, node->val) && validate(node->right, node->val, high);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LLONG_MIN, LLONG_MAX);
}`,
      java: `public class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean validate(TreeNode node, long low, long high) {
        if (node == null) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}`,
      javascript: `function isValidBST(root) {
    function validate(node, low, high) {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    return validate(root, -Infinity, Infinity);
}`
    },
    codeExplanation: "1. Every node must satisfy `low < node.val < high`.\n2. Left subtree bounded above by current node value.\n3. Right subtree bounded below by current node value.",
    timeComplexity: "O(n) — Visits each node once.",
    spaceComplexity: "O(h) — Stack space equal to tree height.",
    alternativeApproach: "Inorder Traversal: Inorder traversal of a BST must be strictly increasing. Track previous visited value.",
    commonMistakes: [
      "Only comparing a node with its immediate children (e.g. `node.left.val < node.val`). A node in the right subtree might have a left child smaller than root!"
    ],
    relatedProblemIds: ["kth-smallest-element-in-a-bst", "lowest-common-ancestor-of-a-binary-search-tree"]
  },

  // =========================================================================
  // Graphs & Backtracking
  // =========================================================================
  {
    id: "number-of-islands",
    title: "Number of Islands",
    slug: "number-of-islands",
    topic: "graphs",
    subtopic: "Grid DFS / Connected Components",
    difficulty: "Medium",
    pattern: "2D Grid Graph DFS",
    tags: ["Array", "DFS", "BFS", "Matrix", "Union Find"],
    statement: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    inputDescription: "grid: 2D array of '1' (land) and '0' (water).",
    outputDescription: "Integer: count of islands.",
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: "1",
        explanation: "All connected 1s form one large island."
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: "3",
        explanation: "Three separate disconnected islands."
      }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    approach: "Iterate through each cell. When we find an unvisited land cell `'1'`, increment our island count, then launch a DFS/BFS to explore and 'sink' all connected land cells by changing them from `'1'` to `'0'` (marking as visited).",
    dryRun: {
      headers: ["Cell (r, c)", "Value", "Action", "Islands Count"],
      rows: [
        ["(0, 0)", "'1'", "Island found! Increment count. Sink all connected land via DFS", "1"],
        ["(0, 1)", "'0'", "Already sunk by DFS -> skip", "1"],
        ["(2, 2)", "'1'", "Isolated land found! Increment count. Sink it.", "2"]
      ]
    },
    solutions: {
      python: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def dfs(r, c):
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
      cpp: `#include <vector>

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
      java: `public class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
}`,
      javascript: `function numIslands(grid) {
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
    codeExplanation: "1. Traverse entire 2D matrix.\n2. When cell is '1', increment `islands` and trigger DFS.\n3. DFS marks cell '0' and recurses to 4 cardinal neighbors.\n4. Avoids separate visited set by mutating grid in-place.",
    timeComplexity: "O(m × n) — Every cell is visited at most twice.",
    spaceComplexity: "O(m × n) — In worst-case (entire grid is land), recursion depth is m × n.",
    alternativeApproach: "BFS with Queue or Disjoint Set Union (DSU) connecting neighboring land cells.",
    commonMistakes: ["Checking diagonal neighbors when problem specifies horizontal and vertical only."],
    relatedProblemIds: ["course-schedule", "clone-graph"]
  },

  {
    id: "subsets",
    title: "Subsets (Power Set)",
    slug: "subsets",
    topic: "backtracking",
    subtopic: "Power Set Generation",
    difficulty: "Medium",
    pattern: "Backtracking / Choice Exploration",
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    statement: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
    inputDescription: "nums: array of distinct integers.",
    outputDescription: "List of lists containing all 2^n subsets.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "Total 2^3 = 8 subsets." },
      { input: "nums = [0]", output: "[[],[0]]", explanation: "Total 2^1 = 2 subsets." }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All elements of nums are unique."],
    approach: "Backtracking: At each recursive step `backtrack(start, path)`, append a copy of `path` to the result. Then loop `i` from `start` to `len(nums) - 1`: add `nums[i]` to `path`, recurse with `i + 1`, and pop `nums[i]` (backtrack).",
    dryRun: {
      headers: ["Call State", "Path", "Result Added", "Loop Choices"],
      rows: [
        ["start=0", "[]", "[]", "Try 1, 2, 3"],
        ["start=1", "[1]", "[1]", "Try 2, 3"],
        ["start=2", "[1, 2]", "[1, 2]", "Try 3"],
        ["start=3", "[1, 2, 3]", "[1, 2, 3]", "No more choices -> backtrack"]
      ]
    },
    solutions: {
      python: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(start, current_path):
        result.append(list(current_path))
        for i in range(start, len(nums)):
            current_path.append(nums[i])
            backtrack(i + 1, current_path)
            current_path.pop() # Backtrack
            
    backtrack(0, [])
    return result`,
      cpp: `#include <vector>

void backtrack(int start, std::vector<int>& nums, std::vector<int>& path, std::vector<std::vector<int>>& res) {
    res.push_back(path);
    for (size_t i = start; i < nums.size(); ++i) {
        path.push_back(nums[i]);
        backtrack(i + 1, nums, path, res);
        path.pop_back();
    }
}

std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> res;
    std::vector<int> path;
    backtrack(0, nums, path, res);
    return res;
}`,
      java: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      javascript: `function subsets(nums) {
    const res = [];
    function backtrack(start, path) {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    backtrack(0, []);
    return res;
}`
    },
    codeExplanation: "1. `result.append(list(current_path))` records every intermediate state as a valid subset.\n2. Loop starts from `start` to avoid duplicate permutations.\n3. `pop()` cleans up path for next branch.",
    timeComplexity: "O(n × 2ⁿ) — There are 2ⁿ subsets, each taking up to O(n) to copy.",
    spaceComplexity: "O(n) — Call stack depth is at most n.",
    alternativeApproach: "Bit Manipulation: Loop integer mask from 0 to 2ⁿ - 1. If bit k is 1, include nums[k].",
    commonMistakes: ["Appending `path` directly instead of a copy (`path[:]`), causing all stored answers to be mutated."],
    relatedProblemIds: ["permutations", "combination-sum"]
  },

  // =========================================================================
  // Dynamic Programming
  // =========================================================================
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    topic: "dynamic-programming",
    subtopic: "1D DP / Fibonacci",
    difficulty: "Easy",
    pattern: "1D Dynamic Programming / Recurrence",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    statement: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    inputDescription: "n: positive integer representing number of steps.",
    outputDescription: "Integer: total number of distinct ways to reach top.",
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1+1+1\n2. 1+2\n3. 2+1" }
    ],
    constraints: ["1 <= n <= 45"],
    approach: "To reach step n, you must arrive from either step `n-1` (by taking 1 step) or step `n-2` (by taking 2 steps). Therefore: `ways(n) = ways(n-1) + ways(n-2)`. This matches the Fibonacci sequence! We can calculate it in O(n) time and O(1) space with two variables.",
    dryRun: {
      headers: ["Step (i)", "prev2 (ways to i-2)", "prev1 (ways to i-1)", "curr = prev1 + prev2"],
      rows: [
        ["1", "-", "-", "1 way (base)"],
        ["2", "1", "1", "2 ways (base)"],
        ["3", "1", "2", "1 + 2 = 3 ways"],
        ["4", "2", "3", "2 + 3 = 5 ways"],
        ["5", "3", "5", "3 + 5 = 8 ways"]
      ]
    },
    solutions: {
      python: `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`,
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; ++i) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      java: `public class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`
    },
    codeExplanation: "1. Base cases: n=1 has 1 way, n=2 has 2 ways.\n2. Iteratively advance variables `prev1` and `prev2`.\n3. Return `prev1` in O(1) memory.",
    timeComplexity: "O(n) — Single loop from 3 to n.",
    spaceComplexity: "O(1) — Only two scalar integer variables maintained.",
    alternativeApproach: "Matrix Exponentiation: Fibonacci in O(log n) time.",
    commonMistakes: ["Using naive recursion without memoization (takes exponential O(2ⁿ) time, which times out)."],
    relatedProblemIds: ["house-robber", "coin-change"]
  },

  {
    id: "coin-change",
    title: "Coin Change (Fewest Coins)",
    slug: "coin-change",
    topic: "dynamic-programming",
    subtopic: "Knapsack / Bottom-Up DP",
    difficulty: "Medium",
    pattern: "Unbounded Knapsack DP",
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    statement: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    inputDescription: "coins: integer array of denominations. amount: target integer.",
    outputDescription: "Integer: minimum coins needed, or -1 if impossible.",
    examples: [
      { input: "coins = [1, 2, 5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1 (3 coins)." },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "Cannot make amount 3 with only 2-cent coins." },
      { input: "coins = [1], amount = 0", output: "0", explanation: "0 amount requires 0 coins." }
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    approach: "Bottom-Up DP: Let `dp[i]` be the minimum coins needed to make amount `i`. Initialize `dp` array of size `amount + 1` filled with infinity (`amount + 1`), with `dp[0] = 0`. For each amount `i` from 1 to `amount`, test every coin `c`: if `c <= i`, `dp[i] = min(dp[i], dp[i - c] + 1)`. If `dp[amount] > amount`, return -1.",
    dryRun: {
      headers: ["Amount (i)", "Coins tested", "dp calculations", "dp[i]"],
      rows: [
        ["0", "-", "Base case", "0"],
        ["1", "[1, 2, 5]", "dp[1-1] + 1 = 1", "1"],
        ["2", "[1, 2, 5]", "min(dp[1]+1, dp[0]+1) = 1", "1"],
        ["5", "[1, 2, 5]", "min(dp[4]+1, dp[3]+1, dp[0]+1) = 1", "1"],
        ["11", "[1, 2, 5]", "min(dp[10]+1, dp[9]+1, dp[6]+1) = 3", "3"]
      ]
    },
    solutions: {
      python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i:
                dp[i] = min(dp[i], dp[i - c] + 1)
                
    return dp[amount] if dp[amount] <= amount else -1`,
      cpp: `#include <vector>
#include <algorithm>

int coinChange(std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; ++i) {
        for (int c : coins) {
            if (c <= i) {
                dp[i] = std::min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `import java.util.Arrays;

public class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (c <= i) {
                    dp[i] = Math.min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const c of coins) {
            if (c <= i) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    },
    codeExplanation: "1. `dp[i]` stores minimum coins for amount `i`.\n2. Initialized to `amount + 1` (acting as infinity).\n3. Transition: `dp[i] = min(dp[i], dp[i - c] + 1)`.\n4. Check if final target was reachable.",
    timeComplexity: "O(amount × len(coins)) — Nested loop over amount and coins.",
    spaceComplexity: "O(amount) — 1D table of size amount + 1.",
    alternativeApproach: "BFS: Shortest path in an unweighted graph where nodes are amounts and edges are coin subtractions.",
    commonMistakes: ["Trying to use Greedy (e.g. taking largest coin first). Greedy fails for denominations like [1, 3, 4] with amount 6."],
    relatedProblemIds: ["climbing-stairs", "house-robber"]
  },

  // =========================================================================
  // Advanced & Systems
  // =========================================================================
  {
    id: "lru-cache",
    title: "LRU Cache (Least Recently Used)",
    slug: "lru-cache",
    topic: "advanced-data-structures",
    subtopic: "Design / Doubly Linked List + Hash Map",
    difficulty: "Medium",
    pattern: "Hash Map + Doubly Linked List",
    tags: ["Design", "Hash Table", "Linked List", "Doubly-Linked List"],
    statement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n- `int get(int key)` Return the value of the key if the key exists, otherwise return -1.\n- `void put(int key, int value)` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.\n\nThe functions `get` and `put` must each run in `O(1)` average time complexity.",
    inputDescription: "Method calls: LRUCache(2), put(1, 1), put(2, 2), get(1), put(3, 3), get(2), etc.",
    outputDescription: "Returned values for get() calls.",
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation: "Key 2 is evicted when key 3 is added because key 1 was accessed by get(1)."
      }
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5", "At most 2 * 10^5 calls to get and put."],
    approach: "Combine a Hash Map with a Doubly Linked List (DLL). The Hash Map maps `key -> Node` for instant O(1) lookup. The DLL orders nodes by recency (head = most recent, tail = least recent). When a key is accessed (`get`) or updated (`put`), detach its node and move it to the head. When capacity is exceeded, evict the node right before `tail` in O(1) time.",
    dryRun: {
      headers: ["Operation", "DLL State (Most to Least Recent)", "Map State", "Evicted?"],
      rows: [
        ["put(1, 1)", "Head <-> [1:1] <-> Tail", "{1: Node(1)}", "No"],
        ["put(2, 2)", "Head <-> [2:2] <-> [1:1] <-> Tail", "{1, 2}", "No"],
        ["get(1) -> 1", "Head <-> [1:1] <-> [2:2] <-> Tail", "{1, 2}", "No (Node 1 moved to front)"],
        ["put(3, 3)", "Head <-> [3:3] <-> [1:1] <-> Tail", "{1, 3}", "Yes! [2:2] evicted from tail"]
      ]
    },
    solutions: {
      python: `class DNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # key -> DNode
        self.head = DNode() # Sentinel dummy head
        self.tail = DNode() # Sentinel dummy tail
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
            del self.cache[lru.key]`,
      cpp: `#include <unordered_map>
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
      java: `import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int val) {
        super.put(key, val);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.cap = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val); // Refresh recency
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
    codeExplanation: "1. Sentinel dummy `head` and `tail` nodes eliminate null checks during pointer rewiring.\n2. `_remove(node)` detaches node in O(1).\n3. `_add_to_front(node)` inserts right after dummy head in O(1).\n4. Eviction pops `tail.prev` and deletes from hash map.",
    timeComplexity: "O(1) for both `get` and `put`.",
    spaceComplexity: "O(capacity) — Stores at most capacity nodes in DLL and hash map.",
    alternativeApproach: "Single Linked List: Cannot remove tail in O(1) because finding tail's predecessor requires O(n) traversal. Hence Doubly Linked List is mandatory.",
    commonMistakes: [
      "Forgetting to delete the evicted node's key from the Hash Map.",
      "Forgetting to update the recency order during a successful `get()` call."
    ],
    relatedProblemIds: ["sliding-window-maximum"]
  },
  {
    "id": "3sum",
    "title": "3Sum",
    "slug": "3sum",
    "topic": "two-pointers",
    "subtopic": "Two Pointers with Sorting",
    "difficulty": "Medium",
    "pattern": "Two Pointers",
    "tags": [
      "Arrays",
      "Two Pointers",
      "Sorting"
    ],
    "statement": "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    "inputDescription": "nums: An integer array of length n.",
    "outputDescription": "A list of unique triplets that sum up to 0.",
    "examples": [
      {
        "input": "nums = [-1, 0, 1, 2, -1, -4]",
        "output": "[[-1, -1, 2], [-1, 0, 1]]",
        "explanation": "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1, -1, 2] and [-1, 0, 1]."
      },
      {
        "input": "nums = [0, 1, 1]",
        "output": "[]",
        "explanation": "The only possible triplet does not sum to 0."
      },
      {
        "input": "nums = [0, 0, 0]",
        "output": "[[0, 0, 0]]",
        "explanation": "The only possible triplet sums up to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "approach": "1. Sort the array in non-decreasing order. Sorting takes O(n log n) and allows us to use two pointers and easily bypass duplicate values.\n2. Iterate through `nums` with index `i` from 0 to n - 3. If `i > 0` and `nums[i] == nums[i - 1]`, skip to avoid duplicate triplets.\n3. If `nums[i] > 0`, break early because all remaining numbers are >= nums[i] > 0, making a sum of 0 impossible.\n4. Initialize two pointers: `left = i + 1` and `right = n - 1`.\n5. Calculate `total = nums[i] + nums[left] + nums[right]`:\n   - If `total == 0`: record `[nums[i], nums[left], nums[right]]`, increment `left`, decrement `right`, and skip duplicates on both sides.\n   - If `total < 0`: increment `left` to increase the sum.\n   - If `total > 0`: decrement `right` to decrease the sum.",
    "dryRun": {
      "headers": [
        "i",
        "nums[i]",
        "left",
        "right",
        "Sum (i + left + right)",
        "Action"
      ],
      "rows": [
        [
          "0",
          "-4",
          "1 (-1)",
          "5 (2)",
          "-4 + (-1) + 2 = -3 < 0",
          "left++ -> 2"
        ],
        [
          "0",
          "-4",
          "2 (-1)",
          "5 (2)",
          "-4 + (-1) + 2 = -3 < 0",
          "left++ -> 3"
        ],
        [
          "1",
          "-1",
          "2 (-1)",
          "5 (2)",
          "-1 + (-1) + 2 = 0",
          "Found! Add [-1,-1,2]. left++, right--"
        ],
        [
          "1",
          "-1",
          "3 (0)",
          "4 (1)",
          "-1 + 0 + 1 = 0",
          "Found! Add [-1,0,1]. left++, right--"
        ],
        [
          "2",
          "-1",
          "-",
          "-",
          "-",
          "Duplicate nums[2] == nums[1], skip"
        ]
      ]
    },
    "solutions": {
      "python": "def three_sum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    n = len(nums)\n    \n    for i in range(n - 2):\n        if nums[i] > 0:\n            break\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n            \n        left, right = i + 1, n - 1\n        while left < right:\n            total = nums[i] + nums[left] + nums[right]\n            if total < 0:\n                left += 1\n            elif total > 0:\n                right -= 1\n            else:\n                res.append([nums[i], nums[left], nums[right]])\n                while left < right and nums[left] == nums[left + 1]:\n                    left += 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right -= 1\n                left += 1\n                right -= 1\n                \n    return res",
      "cpp": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        int n = nums.size();\n        \n        for (int i = 0; i < n - 2; ++i) {\n            if (nums[i] > 0) break;\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            \n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int total = nums[i] + nums[left] + nums[right];\n                if (total < 0) {\n                    left++;\n                } else if (total > 0) {\n                    right--;\n                } else {\n                    res.push_back({nums[i], nums[left], nums[right]});\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        int n = nums.length;\n        \n        for (int i = 0; i < n - 2; i++) {\n            if (nums[i] > 0) break;\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            \n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int total = nums[i] + nums[left] + nums[right];\n                if (total < 0) {\n                    left++;\n                } else if (total > 0) {\n                    right--;\n                } else {\n                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n}",
      "javascript": "function threeSum(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    const n = nums.length;\n    \n    for (let i = 0; i < n - 2; i++) {\n        if (nums[i] > 0) break;\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        \n        let left = i + 1;\n        let right = n - 1;\n        while (left < right) {\n            const total = nums[i] + nums[left] + nums[right];\n            if (total < 0) {\n                left++;\n            } else if (total > 0) {\n                right--;\n            } else {\n                res.push([nums[i], nums[left], nums[right]]);\n                while (left < right && nums[left] === nums[left + 1]) left++;\n                while (left < right && nums[right] === nums[right - 1]) right--;\n                left++;\n                right--;\n            }\n        }\n    }\n    return res;\n}"
    },
    "codeExplanation": "1. Sort the input array in O(n log n). This guarantees numbers are monotonically increasing.\n2. Fix the first number `nums[i]` and run two pointers from `i + 1` to `n - 1`.\n3. When `total == 0`, append the triplet to the results list.\n4. Advance pointers past duplicates to maintain distinct triplets in the result set.\n5. Stop outer loop early when `nums[i] > 0` since the sum of three positive numbers can never be 0.",
    "timeComplexity": "O(n²) — Sorting takes O(n log n). The outer loop runs O(n) times, and for each iteration, the two-pointer inner scan takes O(n) time.",
    "spaceComplexity": "O(1) auxiliary space (excluding the output list and O(n) sorting recursion stack).",
    "alternativeApproach": "Hash Set Approach: For each `nums[i]`, find pairs using a hash set. Requires extra memory to store visited elements and extra checks to deduplicate triplets, resulting in higher constant factors and O(n) memory.",
    "commonMistakes": [
      "Not handling duplicates after finding a match, leading to identical triplets in the output.",
      "Forgetting to sort the array before initializing two pointers.",
      "Not breaking early when nums[i] > 0."
    ],
    "relatedProblemIds": [
      "two-sum",
      "trapping-rain-water"
    ]
  },
  {
    "id": "merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "slug": "merge-k-sorted-lists",
    "topic": "heaps-and-priority-queues",
    "subtopic": "Min-Heap / Priority Queue",
    "difficulty": "Hard",
    "pattern": "Top K Elements / Heap",
    "tags": [
      "Linked Lists",
      "Divide and Conquer",
      "Heap (Priority Queue)",
      "Merge Sort"
    ],
    "statement": "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    "inputDescription": "lists: Array of k sorted linked lists.",
    "outputDescription": "A single sorted linked list containing all nodes from the k lists.",
    "examples": [
      {
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]",
        "explanation": "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list: 1->1->2->3->4->4->5->6"
      },
      {
        "input": "lists = []",
        "output": "[]",
        "explanation": "Empty array of lists returns null."
      },
      {
        "input": "lists = [[]]",
        "output": "[]",
        "explanation": "List containing only empty heads returns null."
      }
    ],
    "constraints": [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order."
    ],
    "approach": "1. Use a Min-Heap (Priority Queue) to always pick the smallest node among the current heads of all k lists.\n2. Insert the head of each non-empty linked list into the min-heap.\n3. While the heap is not empty, extract the minimum node, attach it to our merged list's tail, and advance that list's pointer.\n4. If the extracted node has a next node (`node.next != null`), insert `node.next` into the heap.\n5. Return `dummy.next`.",
    "dryRun": {
      "headers": [
        "Step",
        "Heap State (Values)",
        "Extracted Node",
        "Merged List Tail",
        "Next Node Pushed"
      ],
      "rows": [
        [
          "1",
          "[1 (list0), 1 (list1), 2 (list2)]",
          "1 (list0)",
          "1",
          "4 (list0)"
        ],
        [
          "2",
          "[1 (list1), 2 (list2), 4 (list0)]",
          "1 (list1)",
          "1 -> 1",
          "3 (list1)"
        ],
        [
          "3",
          "[2 (list2), 3 (list1), 4 (list0)]",
          "2 (list2)",
          "1 -> 1 -> 2",
          "6 (list2)"
        ],
        [
          "4",
          "[3 (list1), 4 (list0), 6 (list2)]",
          "3 (list1)",
          "1 -> 1 -> 2 -> 3",
          "4 (list1)"
        ],
        [
          "5",
          "[4 (list0), 4 (list1), 6 (list2)]",
          "4 (list0)",
          "... -> 4",
          "5 (list0)"
        ]
      ]
    },
    "solutions": {
      "python": "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_k_lists(lists: list[ListNode]) -> ListNode:\n    dummy = ListNode(0)\n    tail = dummy\n    heap = []\n    \n    # Push (val, idx, node) to avoid comparing ListNode instances directly\n    for i, head in enumerate(lists):\n        if head:\n            heapq.heappush(heap, (head.val, i, head))\n            \n    while heap:\n        val, i, node = heapq.heappop(heap)\n        tail.next = node\n        tail = tail.next\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n            \n    return dummy.next",
      "cpp": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(nullptr) {}\n * };\n */\nclass Solution {\n    struct Compare {\n        bool operator()(ListNode* a, ListNode* b) {\n            return a->val > b->val;\n        }\n    };\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        priority_queue<ListNode*, vector<ListNode*>, Compare> pq;\n        for (auto head : lists) {\n            if (head) pq.push(head);\n        }\n        \n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        \n        while (!pq.empty()) {\n            ListNode* minNode = pq.top();\n            pq.pop();\n            tail->next = minNode;\n            tail = tail->next;\n            if (minNode->next) {\n                pq.push(minNode->next);\n            }\n        }\n        return dummy.next;\n    }\n};",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode(int x) { val = x; }\n * }\n */\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        \n        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n        for (ListNode head : lists) {\n            if (head != null) pq.offer(head);\n        }\n        \n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        \n        while (!pq.isEmpty()) {\n            ListNode minNode = pq.poll();\n            tail.next = minNode;\n            tail = tail.next;\n            if (minNode.next != null) {\n                pq.offer(minNode.next);\n            }\n        }\n        return dummy.next;\n    }\n}",
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val);\n *     this.next = (next===undefined ? null : next);\n * }\n */\nfunction mergeKLists(lists) {\n    if (!lists || lists.length === 0) return null;\n    \n    // Divide and Conquer pairwise merge:\n    function mergeTwo(l1, l2) {\n        const dummy = new ListNode(0);\n        let cur = dummy;\n        while (l1 && l2) {\n            if (l1.val <= l2.val) {\n                cur.next = l1;\n                l1 = l1.next;\n            } else {\n                cur.next = l2;\n                l2 = l2.next;\n            }\n            cur = cur.next;\n        }\n        cur.next = l1 || l2;\n        return dummy.next;\n    }\n    \n    let interval = 1;\n    while (interval < lists.length) {\n        for (let i = 0; i + interval < lists.length; i += interval * 2) {\n            lists[i] = mergeTwo(lists[i], lists[i + interval]);\n        }\n        interval *= 2;\n    }\n    return lists[0] || null;\n}"
    },
    "codeExplanation": "1. Initialize a Min-Heap. Push the head node of every non-empty list.\n2. Pop the minimum node: because every list is already sorted, the global minimum among all remaining elements must be among the heads.\n3. Link the popped node to the result list.\n4. If that node has a successor, push `node.next` to the heap.\n5. Repeat until heap is empty.",
    "timeComplexity": "O(N log k) — Where N is the total number of nodes across all k lists. Each node insertion and extraction in the min-heap takes O(log k) time.",
    "spaceComplexity": "O(k) — The heap holds at most k elements at any moment (one from each active list).",
    "alternativeApproach": "Divide and Conquer (Pairwise Merge): Merge lists in pairs repeatedly like merge sort. Takes O(N log k) time and O(1) auxiliary space.",
    "commonMistakes": [
      "Inserting null nodes into the priority queue.",
      "In Python, pushing `(head.val, head)` without a tie-breaker index, causing comparison TypeError when values match."
    ],
    "relatedProblemIds": [
      "reverse-linked-list",
      "linked-list-cycle"
    ]
  },
  {
    "id": "course-schedule",
    "title": "Course Schedule",
    "slug": "course-schedule",
    "topic": "graphs",
    "subtopic": "Topological Sort & Cycle Detection",
    "difficulty": "Medium",
    "pattern": "Topological Sort",
    "tags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph",
      "Topological Sort"
    ],
    "statement": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nFor example, the pair `[0, 1]` indicates that to take course 0 you have to first take course 1.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    "inputDescription": "numCourses: Total number of courses (vertices). prerequisites: List of directed edges [a, b] meaning b -> a.",
    "outputDescription": "Boolean indicating if all courses can be completed without a cyclic dependency.",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1, 0]]",
        "output": "true",
        "explanation": "There are 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
      },
      {
        "input": "numCourses = 2, prerequisites = [[1, 0], [0, 1]]",
        "output": "false",
        "explanation": "To take course 1 you must take course 0, and to take course 0 you must take course 1. Circular dependency makes this impossible."
      }
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "All prerequisite pairs are unique."
    ],
    "approach": "1. Model the dependencies as a directed graph where an edge `b -> a` means course `b` is required before `a`.\n2. Use Kahn's Algorithm (BFS Topological Sort):\n   - Compute the in-degree (number of prerequisite dependencies) for every course.\n   - Enqueue all courses with in-degree 0 (no prerequisites needed).\n3. While the queue is not empty, dequeue a course `u` and increment our count of finished courses.\n4. For each neighbor `v` of `u`, decrement its in-degree by 1. If its in-degree reaches 0, enqueue `v`.\n5. If the count of finished courses equals `numCourses`, no cycles exist and all courses can be taken (return `true`). Otherwise, a cycle blocked the remaining courses (return `false`).",
    "dryRun": {
      "headers": [
        "Step",
        "Queue (in-degree == 0)",
        "Processed Course",
        "Neighbor Updated",
        "Finished Count"
      ],
      "rows": [
        [
          "Init",
          "[0]",
          "-",
          "-",
          "0"
        ],
        [
          "1",
          "[]",
          "0",
          "Course 1: in-degree 1 -> 0, push 1",
          "1"
        ],
        [
          "2",
          "[1]",
          "1",
          "No outgoing edges",
          "2"
        ],
        [
          "Done",
          "[]",
          "-",
          "Count 2 == numCourses 2 -> Valid",
          "Return true"
        ]
      ]
    },
    "solutions": {
      "python": "from collections import deque\n\ndef can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:\n    adj = [[] for _ in range(num_courses)]\n    in_degree = [0] * num_courses\n    \n    for course, pre in prerequisites:\n        adj[pre].append(course)\n        in_degree[course] += 1\n        \n    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])\n    completed = 0\n    \n    while queue:\n        curr = queue.popleft()\n        completed += 1\n        for neighbor in adj[curr]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n                \n    return completed == num_courses",
      "cpp": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        \n        for (const auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        \n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (inDegree[i] == 0) q.push(i);\n        }\n        \n        int completed = 0;\n        while (!q.empty()) {\n            int curr = q.front();\n            q.pop();\n            completed++;\n            for (int next : adj[curr]) {\n                if (--inDegree[next] == 0) {\n                    q.push(next);\n                }\n            }\n        }\n        return completed == numCourses;\n    }\n};",
      "java": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        int[] inDegree = new int[numCourses];\n        \n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n        \n        Queue<Integer> queue = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.offer(i);\n        }\n        \n        int completed = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            completed++;\n            for (int neighbor : adj.get(curr)) {\n                if (--inDegree[neighbor] == 0) {\n                    queue.offer(neighbor);\n                }\n            }\n        }\n        return completed == numCourses;\n    }\n}",
      "javascript": "function canFinish(numCourses, prerequisites) {\n    const adj = Array.from({ length: numCourses }, () => []);\n    const inDegree = new Array(numCourses).fill(0);\n    \n    for (const [course, pre] of prerequisites) {\n        adj[pre].push(course);\n        inDegree[course]++;\n    }\n    \n    const queue = [];\n    for (let i = 0; i < numCourses; i++) {\n        if (inDegree[i] === 0) queue.push(i);\n    }\n    \n    let completed = 0;\n    let head = 0;\n    while (head < queue.length) {\n        const curr = queue[head++];\n        completed++;\n        for (const neighbor of adj[curr]) {\n            inDegree[neighbor]--;\n            if (inDegree[neighbor] === 0) {\n                queue.push(neighbor);\n            }\n        }\n    }\n    return completed === numCourses;\n}"
    },
    "codeExplanation": "1. Build an adjacency list mapping prerequisite `pre` to dependent `course`.\n2. Track in-degree count for every course.\n3. Push all zero-prerequisite courses to the queue.\n4. Process courses level-by-level, reducing in-degrees for dependent courses.\n5. Check if total processed courses equals `numCourses`.",
    "timeComplexity": "O(V + E) — Where V = numCourses and E = prerequisites.length. We visit each vertex and edge once.",
    "spaceComplexity": "O(V + E) — For the adjacency list, in-degree array, and BFS queue.",
    "alternativeApproach": "DFS 3-State Cycle Detection: Mark nodes as UNVISITED (0), VISITING (1), and VISITED (2). If DFS encounters a node currently in state 1 (VISITING), a back-edge (cycle) is detected.",
    "commonMistakes": [
      "Inverting edge direction (adding edge from dependent to prerequisite instead of prerequisite to dependent).",
      "Using a simple boolean `visited` array in DFS instead of 3 states, failing to detect directed cycles correctly."
    ],
    "relatedProblemIds": [
      "number-of-islands"
    ]
  },
  {
    "id": "word-ladder",
    "title": "Word Ladder",
    "slug": "word-ladder",
    "topic": "graphs",
    "subtopic": "Breadth-First Search Shortest Path",
    "difficulty": "Hard",
    "pattern": "Breadth-First Search",
    "tags": [
      "Hash Table",
      "String",
      "Breadth-First Search"
    ],
    "statement": "A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:\n- Every adjacent pair of words differs by a single letter.\n- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.\n- `sk == endWord`\n\nGiven two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no such sequence exists.",
    "inputDescription": "beginWord, endWord: Strings of equal length. wordList: Array of unique strings.",
    "outputDescription": "Integer representing length of shortest transformation sequence (1-indexed).",
    "examples": [
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "output": "5",
        "explanation": "One shortest transformation sequence is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\", which is 5 words long."
      },
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "output": "0",
        "explanation": "The endWord \"cog\" is not in wordList, therefore there is no valid transformation sequence."
      }
    ],
    "constraints": [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "wordList[i].length == beginWord.length",
      "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
      "beginWord != endWord",
      "All strings in wordList are unique."
    ],
    "approach": "1. This is an unweighted shortest path problem on an implicit graph. BFS guarantees finding the minimum number of steps.\n2. Store `wordList` in a hash set for O(1) existence checks. If `endWord` is not in the set, return 0 immediately.\n3. Initialize a queue with `(beginWord, 1)` where 1 is the sequence length.\n4. For each word popped from the queue:\n   - Try changing each of its characters from 'a' to 'z'.\n   - If the transformed word equals `endWord`, return `current_length + 1`.\n   - If the transformed word is in our set, add it to the queue and remove it from the set so it is not visited again.\n5. If the queue empties without finding `endWord`, return 0.",
    "dryRun": {
      "headers": [
        "Queue Pop (Word, Level)",
        "Generated Neighbors",
        "In Set?",
        "Action"
      ],
      "rows": [
        [
          "(\"hit\", 1)",
          "\"ait\"...\"hot\"...\"zit\"",
          "\"hot\" is in set",
          "Queue push (\"hot\", 2), remove \"hot\""
        ],
        [
          "(\"hot\", 2)",
          "\"dot\", \"lot\"",
          "Both in set",
          "Queue push (\"dot\", 3), (\"lot\", 3)"
        ],
        [
          "(\"dot\", 3)",
          "\"dog\"",
          "\"dog\" in set",
          "Queue push (\"dog\", 4)"
        ],
        [
          "(\"lot\", 3)",
          "\"log\"",
          "\"log\" in set",
          "Queue push (\"log\", 4)"
        ],
        [
          "(\"dog\", 4)",
          "\"cog\"",
          "\"cog\" == endWord",
          "Match! Return level + 1 = 5"
        ]
      ]
    },
    "solutions": {
      "python": "from collections import deque\n\ndef ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:\n    words = set(word_list)\n    if end_word not in words:\n        return 0\n        \n    queue = deque([(begin_word, 1)])\n    chars = [chr(i) for i in range(ord('a'), ord('z') + 1)]\n    \n    while queue:\n        word, length = queue.popleft()\n        if word == end_word:\n            return length\n            \n        for i in range(len(word)):\n            prefix, suffix = word[:i], word[i+1:]\n            for c in chars:\n                if c != word[i]:\n                    next_word = prefix + c + suffix\n                    if next_word in words:\n                        words.remove(next_word)\n                        queue.append((next_word, length + 1))\n                        \n    return 0",
      "cpp": "class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        unordered_set<string> words(wordList.begin(), wordList.end());\n        if (words.find(endWord) == words.end()) return 0;\n        \n        queue<pair<string, int>> q;\n        q.push({beginWord, 1});\n        \n        while (!q.empty()) {\n            auto [word, len] = q.front();\n            q.pop();\n            \n            if (word == endWord) return len;\n            \n            for (int i = 0; i < word.length(); ++i) {\n                char original = word[i];\n                for (char c = 'a'; c <= 'z'; ++c) {\n                    if (c == original) continue;\n                    word[i] = c;\n                    if (words.count(word)) {\n                        words.erase(word);\n                        q.push({word, len + 1});\n                    }\n                }\n                word[i] = original;\n            }\n        }\n        return 0;\n    }\n};",
      "java": "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        Set<String> words = new HashSet<>(wordList);\n        if (!words.contains(endWord)) return 0;\n        \n        Queue<String> queue = new ArrayDeque<>();\n        queue.offer(beginWord);\n        int level = 1;\n        \n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int k = 0; k < size; k++) {\n                String word = queue.poll();\n                if (word.equals(endWord)) return level;\n                \n                char[] chars = word.toCharArray();\n                for (int i = 0; i < chars.length; i++) {\n                    char orig = chars[i];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        if (c == orig) continue;\n                        chars[i] = c;\n                        String next = new String(chars);\n                        if (words.contains(next)) {\n                            words.remove(next);\n                            queue.offer(next);\n                        }\n                    }\n                    chars[i] = orig;\n                }\n            }\n            level++;\n        }\n        return 0;\n    }\n}",
      "javascript": "function ladderLength(beginWord, endWord, wordList) {\n    const words = new Set(wordList);\n    if (!words.has(endWord)) return 0;\n    \n    const queue = [[beginWord, 1]];\n    let head = 0;\n    \n    while (head < queue.length) {\n        const [word, len] = queue[head++];\n        if (word === endWord) return len;\n        \n        for (let i = 0; i < word.length; i++) {\n            for (let code = 97; code <= 122; code++) {\n                const char = String.fromCharCode(code);\n                if (char === word[i]) continue;\n                \n                const next = word.slice(0, i) + char + word.slice(i + 1);\n                if (words.has(next)) {\n                    words.delete(next);\n                    queue.push([next, len + 1]);\n                }\n            }\n        }\n    }\n    return 0;\n}"
    },
    "codeExplanation": "1. Put dictionary into a Hash Set for O(1) lookups.\n2. Enqueue the starting word with distance 1.\n3. For each letter position, substitute characters 'a' through 'z'.\n4. If the substitute matches `endWord`, return the path distance.\n5. When a valid neighbor is found in the dictionary set, remove it immediately to prevent cycles.",
    "timeComplexity": "O(M² * N) — Where M is the word length and N is the number of words. For each word, we mutate M characters across 26 letters (taking O(M) string creation each).",
    "spaceComplexity": "O(M * N) — To store all dictionary words in the set and queue.",
    "alternativeApproach": "Bidirectional BFS: Search simultaneously from `beginWord` and `endWord`. When search frontiers intersect, the sum of levels is the shortest distance. This cuts the branching factor exponentially.",
    "commonMistakes": [
      "Checking every word in the dictionary for 1-letter difference (O(N) per step instead of O(26 * M)).",
      "Forgetting to delete visited words from the set, causing infinite cycles."
    ],
    "relatedProblemIds": [
      "course-schedule",
      "number-of-islands"
    ]
  },
  {
    "id": "edit-distance",
    "title": "Edit Distance",
    "slug": "edit-distance",
    "topic": "dynamic-programming",
    "subtopic": "2D Dynamic Programming",
    "difficulty": "Hard",
    "pattern": "2D Dynamic Programming",
    "tags": [
      "String",
      "Dynamic Programming"
    ],
    "statement": "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character",
    "inputDescription": "word1, word2: Strings of lowercase English letters.",
    "outputDescription": "Minimum number of edit operations (integer).",
    "examples": [
      {
        "input": "word1 = \"horse\", word2 = \"ros\"",
        "output": "3",
        "explanation": "horse -> rorse (replace 'h' with 'r')\nrorse -> rose (remove 'r')\nrose -> ros (remove 'e')"
      },
      {
        "input": "word1 = \"intention\", word2 = \"execution\"",
        "output": "5",
        "explanation": "intention -> inention (remove 't')\ninention -> enention (replace 'i' with 'e')\nenention -> exention (replace 'n' with 'x')\nexention -> exection (replace 'n' with 'c')\nexection -> execution (insert 'u')"
      }
    ],
    "constraints": [
      "0 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters."
    ],
    "approach": "1. Define `dp[i][j]` as the minimum operations needed to convert `word1[0...i-1]` into `word2[0...j-1]`.\n2. Base cases:\n   - `dp[0][j] = j` (converting empty string to length j requires j insertions).\n   - `dp[i][0] = i` (converting length i string to empty requires i deletions).\n3. State transition:\n   - If `word1[i-1] == word2[j-1]`: No new operation needed! `dp[i][j] = dp[i-1][j-1]`.\n   - Otherwise, take `1 + min` of:\n     * Insert: `dp[i][j-1]`\n     * Delete: `dp[i-1][j]`\n     * Replace: `dp[i-1][j-1]`\n4. Return `dp[m][n]`.",
    "dryRun": {
      "headers": [
        "i \\ j",
        "'' (0)",
        "'r' (1)",
        "'o' (2)",
        "'s' (3)"
      ],
      "rows": [
        [
          "'' (0)",
          "0",
          "1",
          "2",
          "3"
        ],
        [
          "'h' (1)",
          "1",
          "1 (replace)",
          "2",
          "3"
        ],
        [
          "'o' (2)",
          "2",
          "2",
          "1 (match!)",
          "2"
        ],
        [
          "'r' (3)",
          "3",
          "2",
          "2",
          "2"
        ],
        [
          "'s' (4)",
          "4",
          "3",
          "3",
          "2 (match!)"
        ],
        [
          "'e' (5)",
          "5",
          "4",
          "4",
          "3 (delete 'e')"
        ]
      ]
    },
    "solutions": {
      "python": "def min_distance(word1: str, word2: str) -> int:\n    m, n = len(word1), len(word2)\n    # dp[i][j] = min operations for word1[:i] to word2[:j]\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    \n    for i in range(m + 1):\n        dp[i][0] = i\n    for j in range(n + 1):\n        dp[0][j] = j\n        \n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i - 1] == word2[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n            else:\n                dp[i][j] = 1 + min(\n                    dp[i][j - 1],    # insert\n                    dp[i - 1][j],    # delete\n                    dp[i - 1][j - 1] # replace\n                )\n                \n    return dp[m][n]",
      "cpp": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m = word1.size(), n = word2.size();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n        \n        for (int i = 0; i <= m; ++i) dp[i][0] = i;\n        for (int j = 0; j <= n; ++j) dp[0][j] = j;\n        \n        for (int i = 1; i <= m; ++i) {\n            for (int j = 1; j <= n; ++j) {\n                if (word1[i - 1] == word2[j - 1]) {\n                    dp[i][j] = dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]});\n                }\n            }\n        }\n        return dp[m][n];\n    }\n};",
      "java": "class Solution {\n    public int minDistance(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        \n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        \n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i][j - 1], dp[i - 1][j]));\n                }\n            }\n        }\n        return dp[m][n];\n    }\n}",
      "javascript": "function minDistance(word1, word2) {\n    const m = word1.length;\n    const n = word2.length;\n    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n    \n    for (let i = 0; i <= m; i++) dp[i][0] = i;\n    for (let j = 0; j <= n; j++) dp[0][j] = j;\n    \n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (word1[i - 1] === word2[j - 1]) {\n                dp[i][j] = dp[i - 1][j - 1];\n            } else {\n                dp[i][j] = 1 + Math.min(\n                    dp[i][j - 1],     // insert\n                    dp[i - 1][j],     // delete\n                    dp[i - 1][j - 1]  // replace\n                );\n            }\n        }\n    }\n    return dp[m][n];\n}"
    },
    "codeExplanation": "1. Construct a 2D table `dp` of size `(m+1) x (n+1)`.\n2. Base cases handle converting to/from the empty string.\n3. At each step, if characters match, propagate diagonal value without cost.\n4. If characters differ, evaluate the three possible mutations (insert, delete, replace) and choose the minimum + 1.\n5. Result resides at `dp[m][n]`.",
    "timeComplexity": "O(m * n) — Where m and n are string lengths. We fill each cell in the (m+1) x (n+1) grid in O(1) time.",
    "spaceComplexity": "O(m * n) — Can be optimized to O(min(m, n)) using two rolling 1D rows.",
    "alternativeApproach": "1D Row Space Optimization: Since computing row `i` only depends on the previous row `i - 1`, we can store only two rows at a time, cutting memory to O(n).",
    "commonMistakes": [
      "Off-by-one errors with 1-based DP table indices versus 0-based string characters.",
      "Adding +1 when characters are identical (no edit operation needed on a match)."
    ],
    "relatedProblemIds": [
      "coin-change",
      "climbing-stairs"
    ]
  },
  {
    "id": "implement-trie-prefix-tree",
    "title": "Implement Trie (Prefix Tree)",
    "slug": "implement-trie-prefix-tree",
    "topic": "tries",
    "subtopic": "Prefix Tree Node Design",
    "difficulty": "Medium",
    "pattern": "Trie / Tree Traversal",
    "tags": [
      "Design",
      "Trie",
      "Hash Table",
      "String"
    ],
    "statement": "A trie (pronounced \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n- `Trie()` Initializes the trie object.\n- `void insert(String word)` Inserts the string `word` into the trie.\n- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.\n- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.",
    "inputDescription": "Method calls: insert(word), search(word), startsWith(prefix).",
    "outputDescription": "search and startsWith return boolean results.",
    "examples": [
      {
        "input": "trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\"); // true\ntrie.search(\"app\"); // false\ntrie.startsWith(\"app\"); // true\ntrie.insert(\"app\");\ntrie.search(\"app\"); // true",
        "output": "[null, true, false, true, null, true]",
        "explanation": "The sequence of operations verifies word insertion, prefix check, and exact word matches."
      }
    ],
    "constraints": [
      "1 <= word.length, prefix.length <= 2000",
      "word and prefix consist only of lowercase English letters.",
      "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith."
    ],
    "approach": "1. Define a `TrieNode` having:\n   - `children`: A hash map or fixed array of 26 pointers to child nodes.\n   - `is_end`: A boolean flag indicating if a complete word terminates at this node.\n2. `insert(word)`: Walk down the tree character by character. If a child doesn't exist for character `c`, create it. Set `is_end = true` at the final node.\n3. `search(word)`: Traverse the tree matching each character. If a character child doesn't exist, return `false`. At the end, return `node.is_end`.\n4. `startsWith(prefix)`: Same traversal as `search`, but simply return `true` if all prefix characters exist in the path (regardless of `is_end`).",
    "dryRun": {
      "headers": [
        "Operation",
        "Word / Prefix",
        "Path Traversed",
        "isEnd Flag",
        "Result"
      ],
      "rows": [
        [
          "insert",
          "\"apple\"",
          "root -> a -> p -> p -> l -> e",
          "Set e.isEnd = true",
          "void"
        ],
        [
          "search",
          "\"apple\"",
          "root -> a -> p -> p -> l -> e",
          "e.isEnd == true",
          "true"
        ],
        [
          "search",
          "\"app\"",
          "root -> a -> p -> p",
          "p.isEnd == false",
          "false"
        ],
        [
          "startsWith",
          "\"app\"",
          "root -> a -> p -> p",
          "Path exists",
          "true"
        ],
        [
          "insert",
          "\"app\"",
          "root -> a -> p -> p",
          "Set p.isEnd = true",
          "void"
        ],
        [
          "search",
          "\"app\"",
          "root -> a -> p -> p",
          "p.isEnd == true",
          "true"
        ]
      ]
    },
    "solutions": {
      "python": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word: str) -> None:\n        curr = self.root\n        for c in word:\n            if c not in curr.children:\n                curr.children[c] = TrieNode()\n            curr = curr.children[c]\n        curr.is_end = True\n\n    def search(self, word: str) -> bool:\n        curr = self.root\n        for c in word:\n            if c not in curr.children:\n                return False\n            curr = curr.children[c]\n        return curr.is_end\n\n    def startsWith(self, prefix: str) -> bool:\n        curr = self.root\n        for c in prefix:\n            if c not in curr.children:\n                return False\n            curr = curr.children[c]\n        return True",
      "cpp": "class Trie {\n    struct TrieNode {\n        TrieNode* children[26] = {nullptr};\n        bool isEnd = false;\n    };\n    TrieNode* root;\npublic:\n    Trie() {\n        root = new TrieNode();\n    }\n    \n    void insert(string word) {\n        TrieNode* curr = root;\n        for (char c : word) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) {\n                curr->children[idx] = new TrieNode();\n            }\n            curr = curr->children[idx];\n        }\n        curr->isEnd = true;\n    }\n    \n    bool search(string word) {\n        TrieNode* curr = root;\n        for (char c : word) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) return false;\n            curr = curr->children[idx];\n        }\n        return curr->isEnd;\n    }\n    \n    bool startsWith(string prefix) {\n        TrieNode* curr = root;\n        for (char c : prefix) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) return false;\n            curr = curr->children[idx];\n        }\n        return true;\n    }\n};",
      "java": "class Trie {\n    static class TrieNode {\n        TrieNode[] children = new TrieNode[26];\n        boolean isEnd = false;\n    }\n    private final TrieNode root;\n\n    public Trie() {\n        root = new TrieNode();\n    }\n    \n    public void insert(String word) {\n        TrieNode curr = root;\n        for (char c : word.toCharArray()) {\n            int idx = c - 'a';\n            if (curr.children[idx] == null) {\n                curr.children[idx] = new TrieNode();\n            }\n            curr = curr.children[idx];\n        }\n        curr.isEnd = true;\n    }\n    \n    public boolean search(String word) {\n        TrieNode curr = root;\n        for (char c : word.toCharArray()) {\n            int idx = c - 'a';\n            if (curr.children[idx] == null) return false;\n            curr = curr.children[idx];\n        }\n        return curr.isEnd;\n    }\n    \n    public boolean startsWith(String prefix) {\n        TrieNode curr = root;\n        for (char c : prefix.toCharArray()) {\n            int idx = c - 'a';\n            if (curr.children[idx] == null) return false;\n            curr = curr.children[idx];\n        }\n        return true;\n    }\n}",
      "javascript": "class TrieNode {\n    constructor() {\n        this.children = {};\n        this.isEnd = false;\n    }\n}\n\nclass Trie {\n    constructor() {\n        this.root = new TrieNode();\n    }\n    \n    insert(word) {\n        let curr = this.root;\n        for (const c of word) {\n            if (!curr.children[c]) {\n                curr.children[c] = new TrieNode();\n            }\n            curr = curr.children[c];\n        }\n        curr.isEnd = true;\n    }\n    \n    search(word) {\n        let curr = this.root;\n        for (const c of word) {\n            if (!curr.children[c]) return false;\n            curr = curr.children[c];\n        }\n        return curr.isEnd;\n    }\n    \n    startsWith(prefix) {\n        let curr = this.root;\n        for (const c of prefix) {\n            if (!curr.children[c]) return false;\n            curr = curr.children[c];\n        }\n        return true;\n    }\n}"
    },
    "codeExplanation": "1. The `TrieNode` holds an array/map of branch characters and an `isEnd` indicator.\n2. `insert` creates new nodes for each unseen character along the word path and marks `isEnd = true` at the final node.\n3. `search` traverses the characters and verifies that the word terminates with `isEnd == true`.\n4. `startsWith` checks only if the prefix pathway exists.",
    "timeComplexity": "O(L) for insert, search, and startsWith, where L is the length of the string.",
    "spaceComplexity": "O(ALPHABET_SIZE * L * N) in worst case for N words of average length L.",
    "alternativeApproach": "Hash Set: Can do exact word lookup in O(L), but cannot perform prefix matching (`startsWith`) without scanning all stored words (O(N * L)).",
    "commonMistakes": [
      "Returning true in `search()` just because the prefix path exists, even if `is_end == false`.",
      "Not handling memory cleanup in C++ (or using unique_ptr)."
    ],
    "relatedProblemIds": [
      "valid-anagram"
    ]
  },
  {
    "id": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "slug": "kth-largest-element-in-an-array",
    "topic": "heaps-and-priority-queues",
    "subtopic": "Min-Heap / Top K Elements",
    "difficulty": "Medium",
    "pattern": "Top K Elements",
    "tags": [
      "Array",
      "Divide and Conquer",
      "Sorting",
      "Heap (Priority Queue)",
      "Quickselect"
    ],
    "statement": "Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.\n\nNote that it is the `k`th largest element in the sorted order, not the `k`th distinct element.\n\nCan you solve it without sorting in O(n log k) or O(n) average time?",
    "inputDescription": "nums: Array of integers. k: 1-indexed target rank.",
    "outputDescription": "The kth largest integer.",
    "examples": [
      {
        "input": "nums = [3, 2, 1, 5, 6, 4], k = 2",
        "output": "5",
        "explanation": "Sorted order is [1, 2, 3, 4, 5, 6]. The 2nd largest element is 5."
      },
      {
        "input": "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4",
        "output": "4",
        "explanation": "Sorted order is [1, 2, 2, 3, 3, 4, 5, 5, 6]. The 4th largest element is 4."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "approach": "1. Maintain a Min-Heap of size `k`.\n2. Iterate through `nums`:\n   - Push each number into the min-heap.\n   - If the heap size exceeds `k`, pop the smallest element.\n3. After processing all elements, the heap contains the `k` largest numbers seen so far.\n4. The root of the min-heap is the smallest among the top k, which is exactly the `k`th largest element!",
    "dryRun": {
      "headers": [
        "Element Processed",
        "Heap Before Pop",
        "Heap Size > k?",
        "Action",
        "Heap State"
      ],
      "rows": [
        [
          "3",
          "[3]",
          "No",
          "Keep",
          "[3]"
        ],
        [
          "2",
          "[2, 3]",
          "No",
          "Keep",
          "[2, 3]"
        ],
        [
          "1",
          "[1, 3, 2]",
          "Yes (k=2)",
          "Pop min (1)",
          "[2, 3]"
        ],
        [
          "5",
          "[2, 3, 5]",
          "Yes (k=2)",
          "Pop min (2)",
          "[3, 5]"
        ],
        [
          "6",
          "[3, 5, 6]",
          "Yes (k=2)",
          "Pop min (3)",
          "[5, 6]"
        ],
        [
          "4",
          "[4, 6, 5]",
          "Yes (k=2)",
          "Pop min (4)",
          "[5, 6] -> Root is 5"
        ]
      ]
    },
    "solutions": {
      "python": "import heapq\n\ndef find_kth_largest(nums: list[int], k: int) -> int:\n    min_heap = []\n    for num in nums:\n        heapq.heappush(min_heap, num)\n        if len(min_heap) > k:\n            heapq.heappop(min_heap)\n    return min_heap[0]",
      "cpp": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> minHeap;\n        for (int num : nums) {\n            minHeap.push(num);\n            if (minHeap.size() > k) {\n                minHeap.pop();\n            }\n        }\n        return minHeap.top();\n    }\n};",
      "java": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int num : nums) {\n            minHeap.offer(num);\n            if (minHeap.size() > k) {\n                minHeap.poll();\n            }\n        }\n        return minHeap.peek();\n    }\n}",
      "javascript": "function findKthLargest(nums, k) {\n    // Quickselect algorithm with average O(n) time:\n    const target = nums.length - k;\n    \n    function quickSelect(left, right) {\n        const pivot = nums[right];\n        let p = left;\n        for (let i = left; i < right; i++) {\n            if (nums[i] <= pivot) {\n                [nums[i], nums[p]] = [nums[p], nums[i]];\n                p++;\n            }\n        }\n        [nums[p], nums[right]] = [nums[right], nums[p]];\n        \n        if (p === target) return nums[p];\n        if (p < target) return quickSelect(p + 1, right);\n        return quickSelect(left, p - 1);\n    }\n    \n    return quickSelect(0, nums.length - 1);\n}"
    },
    "codeExplanation": "1. By maintaining a min-heap of capacity k, any number smaller than the k-th largest is pushed out.\n2. When finished, the k elements remaining in the heap are the k largest in the array.\n3. The top of this min-heap is the smallest among those k elements, giving the kth largest element.",
    "timeComplexity": "O(n log k) with Min-Heap, or O(n) average with Quickselect.",
    "spaceComplexity": "O(k) to store the heap elements.",
    "alternativeApproach": "Quickselect (Hoare's Selection Algorithm): Partitions the array like Quicksort around a pivot. Discards half the array on each step, yielding O(n) average time and O(1) extra space.",
    "commonMistakes": [
      "Using a Max-Heap instead of a Min-Heap (a max-heap must store all n elements taking O(n log n) and O(n) memory).",
      "Treating k as 0-indexed instead of 1-indexed."
    ],
    "relatedProblemIds": [
      "merge-k-sorted-lists",
      "trapping-rain-water"
    ]
  },
  {
    "id": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "slug": "invert-binary-tree",
    "topic": "trees",
    "subtopic": "Tree Traversal / DFS",
    "difficulty": "Easy",
    "pattern": "Tree DFS",
    "tags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "statement": "Given the `root` of a binary tree, invert the tree (swap the left and right subtrees of every node), and return its root.",
    "inputDescription": "root: The root node of a binary tree.",
    "outputDescription": "The root of the inverted binary tree.",
    "examples": [
      {
        "input": "root = [4,2,7,1,3,6,9]",
        "output": "[4,7,2,9,6,3,1]",
        "explanation": "The left child 2 and right child 7 are swapped. Their respective subtrees are also inverted recursively."
      },
      {
        "input": "root = [2,1,3]",
        "output": "[2,3,1]",
        "explanation": "1 and 3 are swapped."
      },
      {
        "input": "root = []",
        "output": "[]",
        "explanation": "Empty tree remains empty."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "approach": "1. Base case: If `root == null`, return `null`.\n2. Swap `root.left` and `root.right`.\n3. Recursively invert the left subtree: `invertTree(root.left)`.\n4. Recursively invert the right subtree: `invertTree(root.right)`.\n5. Return `root`.",
    "dryRun": {
      "headers": [
        "Current Node",
        "Left Child Before",
        "Right Child Before",
        "Action",
        "Resulting Subtree"
      ],
      "rows": [
        [
          "4",
          "2",
          "7",
          "Swap left & right",
          "left becomes 7, right becomes 2"
        ],
        [
          "7",
          "6",
          "9",
          "Swap children",
          "left becomes 9, right becomes 6"
        ],
        [
          "2",
          "1",
          "3",
          "Swap children",
          "left becomes 3, right becomes 1"
        ],
        [
          "Leaves",
          "null",
          "null",
          "Base case reached",
          "Return"
        ]
      ]
    },
    "solutions": {
      "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invert_tree(root: TreeNode) -> TreeNode:\n    if not root:\n        return None\n    root.left, root.right = root.right, root.left\n    invert_tree(root.left)\n    invert_tree(root.right)\n    return root",
      "cpp": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        swap(root->left, root->right);\n        invertTree(root->left);\n        invertTree(root->right);\n        return root;\n    }\n};",
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode(int x) { val = x; }\n * }\n */\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = root.right;\n        root.right = temp;\n        invertTree(root.left);\n        invertTree(root.right);\n        return root;\n    }\n}",
      "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val);\n *     this.left = (left===undefined ? null : left);\n *     this.right = (right===undefined ? null : right);\n * }\n */\nfunction invertTree(root) {\n    if (!root) return null;\n    const temp = root.left;\n    root.left = root.right;\n    root.right = temp;\n    invertTree(root.left);\n    invertTree(root.right);\n    return root;\n}"
    },
    "codeExplanation": "1. If the node is null, terminate recursion.\n2. Swap the left and right child pointers of the current node.\n3. Make recursive calls on the newly swapped left and right children.\n4. Return the original root node.",
    "timeComplexity": "O(n) — We visit every node in the binary tree exactly once.",
    "spaceComplexity": "O(h) — Where h is the tree height (O(log n) for balanced tree, O(n) for degenerate tree) used by the call stack.",
    "alternativeApproach": "Iterative BFS: Use a queue to traverse the tree level by level, popping each node and swapping its left and right pointers in-place.",
    "commonMistakes": [
      "Overwriting one child pointer without saving it in a temporary variable (unless using tuple swap in Python).",
      "Missing the base case `root == null` causing null pointer dereference."
    ],
    "relatedProblemIds": [
      "maximum-depth-of-binary-tree",
      "validate-binary-search-tree"
    ]
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "slug": "lowest-common-ancestor-of-a-binary-tree",
    "topic": "trees",
    "subtopic": "Tree DFS / Subtree Search",
    "difficulty": "Medium",
    "pattern": "Tree Postorder DFS",
    "tags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "statement": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.\n\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).\"",
    "inputDescription": "root: Root of binary tree. p, q: Target descendant nodes.",
    "outputDescription": "TreeNode representing lowest common ancestor.",
    "examples": [
      {
        "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
        "output": "3",
        "explanation": "The LCA of nodes 5 and 1 is 3."
      },
      {
        "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
        "output": "5",
        "explanation": "The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the tree."
    ],
    "approach": "1. Use postorder depth-first traversal (bottom-up search):\n   - If current `root == null`, return `null`.\n   - If `root == p` or `root == q`, return `root` (found one of our targets!).\n2. Search left subtree: `left = lowestCommonAncestor(root.left, p, q)`.\n3. Search right subtree: `right = lowestCommonAncestor(root.right, p, q)`.\n4. If both `left != null` and `right != null`, it means one target is in the left branch and the other is in the right branch. Therefore, `root` is their Lowest Common Ancestor!\n5. If only one of `left` or `right` is non-null, pass that non-null ancestor up.",
    "dryRun": {
      "headers": [
        "Node Evaluated",
        "Left Result",
        "Right Result",
        "Condition Met",
        "Returned Upwards"
      ],
      "rows": [
        [
          "6",
          "null",
          "null",
          "Neither p nor q",
          "null"
        ],
        [
          "7",
          "null",
          "null",
          "Neither",
          "null"
        ],
        [
          "4 (q)",
          "-",
          "-",
          "Node == q",
          "Return node 4"
        ],
        [
          "2",
          "null",
          "4",
          "Right has q",
          "Return node 4"
        ],
        [
          "5 (p)",
          "-",
          "-",
          "Node == p",
          "Return node 5"
        ],
        [
          "3 (Root)",
          "5 (from left)",
          "1 (from right)",
          "Both left && right != null!",
          "Return node 3 (LCA)"
        ]
      ]
    },
    "solutions": {
      "python": "class TreeNode:\n    def __init__(self, x):\n        self.val = x\n        self.left = None\n        self.right = None\n\ndef lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n    if not root or root == p or root == q:\n        return root\n        \n    left = lowest_common_ancestor(root.left, p, q)\n    right = lowest_common_ancestor(root.right, p, q)\n    \n    if left and right:\n        return root\n    return left if left else right",
      "cpp": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (!root || root == p || root == q) return root;\n        \n        TreeNode* left = lowestCommonAncestor(root->left, p, q);\n        TreeNode* right = lowestCommonAncestor(root->right, p, q);\n        \n        if (left && right) return root;\n        return left ? left : right;\n    }\n};",
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode(int x) { val = x; }\n * }\n */\nclass Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        if (root == null || root == p || root == q) return root;\n        \n        TreeNode left = lowestCommonAncestor(root.left, p, q);\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\n        \n        if (left != null && right != null) return root;\n        return left != null ? left : right;\n    }\n}",
      "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\nfunction lowestCommonAncestor(root, p, q) {\n    if (!root || root === p || root === q) return root;\n    \n    const left = lowestCommonAncestor(root.left, p, q);\n    const right = lowestCommonAncestor(root.right, p, q);\n    \n    if (left && right) return root;\n    return left || right;\n}"
    },
    "codeExplanation": "1. Base cases: If the node is null or matches either target node `p` or `q`, return it immediately.\n2. Search both subtrees recursively.\n3. If both recursive calls return non-null, the current node is the convergence point (LCA).\n4. Otherwise, bubble up whichever non-null subtree result was found.",
    "timeComplexity": "O(n) — In the worst case, every node in the binary tree is visited once.",
    "spaceComplexity": "O(h) — Where h is the tree height, due to recursive call stack frames.",
    "alternativeApproach": "Parent Pointer Map: Traverse tree with BFS/DFS and record each node's parent in a hash map. Build the ancestor path of `p`, then trace `q` upwards until an ancestor intersects.",
    "commonMistakes": [
      "Assuming the tree is a Binary Search Tree (this is a general binary tree, so values cannot guide left vs right traversal).",
      "Forgetting that a node can be an ancestor of itself (when p is ancestor of q or vice versa)."
    ],
    "relatedProblemIds": [
      "maximum-depth-of-binary-tree",
      "validate-binary-search-tree"
    ]
  },
  {
    "id": "sliding-window-maximum",
    "title": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "topic": "sliding-window",
    "subtopic": "Monotonic Deque",
    "difficulty": "Hard",
    "pattern": "Monotonic Queue / Deque",
    "tags": [
      "Array",
      "Queue",
      "Sliding Window",
      "Heap (Priority Queue)",
      "Monotonic Queue"
    ],
    "statement": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window array containing the maximum value for each window position.",
    "inputDescription": "nums: Array of integers. k: Size of window.",
    "outputDescription": "Array of maximums for each window.",
    "examples": [
      {
        "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        "output": "[3,3,5,5,6,7]",
        "explanation": "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7"
      },
      {
        "input": "nums = [1], k = 1",
        "output": "[1]",
        "explanation": "Single element window returns [1]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    "approach": "1. Use a Monotonic Decreasing Deque storing array indexes.\n2. For each element `nums[i]`:\n   - Remove indexes from the front of the deque if they are out of the current window (`deque[0] <= i - k`).\n   - Maintain decreasing order: while the deque is not empty and `nums[deque.back] <= nums[i]`, pop from the back (these smaller elements can never be the maximum again).\n   - Push `i` to the back.\n   - Once `i >= k - 1`, the front of the deque `nums[deque.front]` is the maximum of the current window; append it to our result list.",
    "dryRun": {
      "headers": [
        "i",
        "nums[i]",
        "Deque Before Insert",
        "Deque After Cleanup & Push",
        "Window Max (if i >= k-1)"
      ],
      "rows": [
        [
          "0",
          "1",
          "[]",
          "[0 (val 1)]",
          "-"
        ],
        [
          "1",
          "3",
          "[0]",
          "[1 (val 3)] (popped 1 <= 3)",
          "-"
        ],
        [
          "2",
          "-1",
          "[1]",
          "[1 (val 3), 2 (val -1)]",
          "3 (nums[1])"
        ],
        [
          "3",
          "-3",
          "[1, 2]",
          "[1, 2, 3 (val -3)]",
          "3 (nums[1])"
        ],
        [
          "4",
          "5",
          "[1, 2, 3]",
          "[4 (val 5)] (popped all smaller)",
          "5 (nums[4])"
        ],
        [
          "5",
          "3",
          "[4]",
          "[4 (val 5), 5 (val 3)]",
          "5 (nums[4])"
        ],
        [
          "6",
          "6",
          "[4, 5]",
          "[6 (val 6)]",
          "6 (nums[6])"
        ],
        [
          "7",
          "7",
          "[6]",
          "[7 (val 7)]",
          "7 (nums[7])"
        ]
      ]
    },
    "solutions": {
      "python": "from collections import deque\n\ndef max_sliding_window(nums: list[int], k: int) -> list[int]:\n    q = deque() # Stores indices\n    res = []\n    \n    for i, num in enumerate(nums):\n        # Remove elements outside current window\n        if q and q[0] <= i - k:\n            q.popleft()\n            \n        # Maintain monotonic decreasing property\n        while q and nums[q[-1]] <= num:\n            q.pop()\n            \n        q.append(i)\n        \n        # Window of size k reached\n        if i >= k - 1:\n            res.append(nums[q[0]])\n            \n    return res",
      "cpp": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> dq;\n        vector<int> res;\n        \n        for (int i = 0; i < nums.size(); ++i) {\n            if (!dq.empty() && dq.front() <= i - k) {\n                dq.pop_front();\n            }\n            while (!dq.empty() && nums[dq.back()] <= nums[i]) {\n                dq.pop_back();\n            }\n            dq.push_back(i);\n            if (i >= k - 1) {\n                res.push_back(nums[dq.front()]);\n            }\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        int n = nums.length;\n        int[] res = new int[n - k + 1];\n        Deque<Integer> dq = new ArrayDeque<>();\n        \n        for (int i = 0; i < n; i++) {\n            if (!dq.isEmpty() && dq.peekFirst() <= i - k) {\n                dq.pollFirst();\n            }\n            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {\n                dq.pollLast();\n            }\n            dq.offerLast(i);\n            if (i >= k - 1) {\n                res[i - k + 1] = nums[dq.peekFirst()];\n            }\n        }\n        return res;\n    }\n}",
      "javascript": "function maxSlidingWindow(nums, k) {\n    const q = []; // Stores indices\n    const res = [];\n    let head = 0;\n    \n    for (let i = 0; i < nums.length; i++) {\n        if (head < q.length && q[head] <= i - k) {\n            head++;\n        }\n        while (q.length > head && nums[q[q.length - 1]] <= nums[i]) {\n            q.pop();\n        }\n        q.push(i);\n        if (i >= k - 1) {\n            res.push(nums[q[head]]);\n        }\n    }\n    return res;\n}"
    },
    "codeExplanation": "1. Store indices in a double-ended queue.\n2. Discard front elements when they exit the moving window boundary `i - k`.\n3. Before inserting `i`, pop all indices whose values are `<=` the current value because they can never be the maximum over the current or future windows.\n4. Front of deque always holds index of current window's maximum element.",
    "timeComplexity": "O(n) — Each array element is pushed and popped from the deque at most once.",
    "spaceComplexity": "O(k) — Deque stores at most k indices corresponding to the current window.",
    "alternativeApproach": "Max-Heap: Store `(val, index)`. Pop stale elements outside the window. Takes O(n log n) time and O(n) space.",
    "commonMistakes": [
      "Storing values instead of indices in the deque, making it impossible to check if the maximum has slipped out of window range.",
      "Using a regular O(n * k) nested loop which times out for n, k = 10^5."
    ],
    "relatedProblemIds": [
      "daily-temperatures",
      "lru-cache"
    ]
  },
  {
    "id": "single-number",
    "title": "Single Number",
    "slug": "single-number",
    "topic": "bit-manipulation",
    "subtopic": "XOR Bitwise Properties",
    "difficulty": "Easy",
    "pattern": "Bit Manipulation",
    "tags": [
      "Array",
      "Bit Manipulation"
    ],
    "statement": "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
    "inputDescription": "nums: Non-empty array of integers where every element appears twice except one.",
    "outputDescription": "The single unique integer.",
    "examples": [
      {
        "input": "nums = [2, 2, 1]",
        "output": "1",
        "explanation": "2 appears twice, 1 appears once."
      },
      {
        "input": "nums = [4, 1, 2, 1, 2]",
        "output": "4",
        "explanation": "1 and 2 appear twice, 4 appears once."
      },
      {
        "input": "nums = [1]",
        "output": "1",
        "explanation": "Single element is returned."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once."
    ],
    "approach": "1. Use the bitwise XOR operator (`^`).\n2. Key properties of XOR:\n   - `a ^ 0 = a` (identity element)\n   - `a ^ a = 0` (self-inverse)\n   - Commutative and associative: `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b`.\n3. If we XOR all elements in `nums` together, all duplicated pairs cancel each other out to 0.\n4. The remaining value will be the single unique number!",
    "dryRun": {
      "headers": [
        "Step (i)",
        "Current Element (num)",
        "XOR Operation",
        "Accumulated Result"
      ],
      "rows": [
        [
          "Init",
          "-",
          "-",
          "0"
        ],
        [
          "1",
          "4",
          "0 ^ 4",
          "4"
        ],
        [
          "2",
          "1",
          "4 ^ 1",
          "5 (binary 101)"
        ],
        [
          "3",
          "2",
          "5 ^ 2",
          "7 (binary 111)"
        ],
        [
          "4",
          "1",
          "7 ^ 1",
          "6 (binary 110, cancels 1)"
        ],
        [
          "5",
          "2",
          "6 ^ 2",
          "4 (binary 100, cancels 2 -> only 4 remains!)"
        ]
      ]
    },
    "solutions": {
      "python": "def single_number(nums: list[int]) -> int:\n    result = 0\n    for num in nums:\n        result ^= num\n    return result",
      "cpp": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int result = 0;\n        for (int num : nums) {\n            result ^= num;\n        }\n        return result;\n    }\n};",
      "java": "class Solution {\n    public int singleNumber(int[] nums) {\n        int result = 0;\n        for (int num : nums) {\n            result ^= num;\n        }\n        return result;\n    }\n}",
      "javascript": "function singleNumber(nums) {\n    let result = 0;\n    for (const num of nums) {\n        result ^= num;\n    }\n    return result;\n}"
    },
    "codeExplanation": "1. Initialize accumulator `result = 0`.\n2. Loop through every element and apply bitwise XOR.\n3. Duplicate numbers cancel each other out to zero.\n4. Return the non-zero leftover value.",
    "timeComplexity": "O(n) — Single pass over the array of length n.",
    "spaceComplexity": "O(1) — Uses only a single integer variable for tracking state.",
    "alternativeApproach": "Hash Set: Add numbers if not seen, remove if seen. Remaining element is the single number. Takes O(n) time but violates the O(1) space constraint by using O(n) auxiliary memory.",
    "commonMistakes": [
      "Using extra space (hash set or frequency map) when constant O(1) space is required.",
      "Initializing result with 1 instead of 0 (which corrupts the XOR identity)."
    ],
    "relatedProblemIds": [
      "two-sum",
      "contains-duplicate"
    ]
  }
];
