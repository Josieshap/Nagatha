import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "math-1",
    title: "Order of Operations",
    minutes: 15,
    objective: "Evaluate numerical expressions correctly using the order of operations (PEMDAS).",
    sections: [
      {
        heading: "Why order matters",
        body: "When an expression has more than one operation, the order in which you do the operations changes the answer. Mathematicians agreed on a standard order so everyone gets the same result. The order is: Parentheses, Exponents, Multiplication and Division (left to right), then Addition and Subtraction (left to right). Multiplication and division have equal priority, and so do addition and subtraction — within those pairs you work left to right.",
        examples: [
          "3 + 4 x 2 = 3 + 8 (multiply first) = 11",
          "(3 + 4) x 2 = 7 x 2 (parentheses first) = 14"
        ]
      },
      {
        heading: "Working with exponents",
        body: "Exponents mean repeated multiplication, such as 2^3 = 2 x 2 x 2 = 8. Exponents are calculated after anything inside parentheses but before multiplication, division, addition, or subtraction. Always simplify the exponent to a single number before continuing with the rest of the expression.",
        examples: [
          "2 + 3^2 = 2 + 9 (exponent first) = 11",
          "(1 + 1)^3 = 2^3 (parentheses first) = 8"
        ]
      },
      {
        heading: "Multi-step expressions",
        body: "Longer expressions combine several steps, so it helps to rewrite the expression after each step instead of trying to do everything at once. Work left to right when operations are at the same priority level. Checking your work by redoing the steps helps catch mistakes.",
        examples: [
          "10 - 2 x 3 + 4 = 10 - 6 + 4 (multiply first) = 4 + 4 = 8",
          "20 / 4 + 3 x 2 = 5 + 6 (divide and multiply first) = 11"
        ]
      }
    ],
    exercises: [
      {
        question: "Evaluate the expression 6 + 2 x 5 and find the resulting number.",
        choices: ["40", "16", "13", "22"],
        answer: 1,
        explanation: "Multiply first: 2 x 5 = 10. Then add: 6 + 10 = 16."
      },
      {
        question: "Evaluate the expression (6 + 2) x 5 and find the resulting number.",
        choices: ["16", "13", "40", "17"],
        answer: 2,
        explanation: "Parentheses first: 6 + 2 = 8. Then multiply: 8 x 5 = 40."
      },
      {
        question: "Evaluate the expression 18 - 4^2 and find the resulting number.",
        choices: ["196", "2", "-14", "8"],
        answer: 1,
        explanation: "Exponent first: 4^2 = 16. Then subtract: 18 - 16 = 2."
      },
      {
        question: "Evaluate the expression 12 / 3 + 2 x 4 and find the resulting number.",
        choices: ["12", "20", "4", "8"],
        answer: 0,
        explanation: "Divide and multiply first: 12 / 3 = 4 and 2 x 4 = 8. Then add: 4 + 8 = 12."
      },
      {
        question: "Evaluate the expression 5 + 3 x (2 + 1) and find the resulting number.",
        choices: ["24", "14", "9", "18"],
        answer: 1,
        explanation: "Parentheses first: 2 + 1 = 3. Then multiply: 3 x 3 = 9. Then add: 5 + 9 = 14."
      },
      {
        question: "Evaluate the expression 30 - 10 / 2 - 3 and find the resulting number.",
        choices: ["12", "10", "22", "7"],
        answer: 1,
        explanation: "Divide first: 10 / 2 = 5. Then work left to right: 30 - 5 - 3 = 22."
      }
    ]
  },
  {
    id: "math-2",
    title: "Adding and Subtracting Fractions",
    minutes: 18,
    objective: "Add and subtract fractions by finding a common denominator and simplify the result.",
    sections: [
      {
        heading: "Common denominators",
        body: "Fractions can only be added or subtracted directly when they share the same denominator, because the denominator tells you the size of the pieces being counted. When denominators differ, find the least common denominator (LCD) and rewrite each fraction as an equivalent fraction with that denominator. To do this, multiply the numerator and denominator of each fraction by whatever number makes the denominators match.",
        examples: [
          "1/4 + 1/2: LCD is 4, so 1/2 = 2/4. Then 1/4 + 2/4 = 3/4",
          "2/3 - 1/6: LCD is 6, so 2/3 = 4/6. Then 4/6 - 1/6 = 3/6 = 1/2 after simplifying"
        ]
      },
      {
        heading: "Adding once denominators match",
        body: "Once the denominators are the same, add or subtract only the numerators and keep the denominator unchanged. After combining, always check whether the resulting fraction can be simplified by dividing the numerator and denominator by their greatest common factor. A fraction is fully simplified when the numerator and denominator have no common factor other than 1.",
        examples: [
          "3/8 + 2/8 = 5/8 (already simplified)",
          "5/6 + 1/6 = 6/6 = 1"
        ]
      },
      {
        heading: "Simplifying fractions",
        body: "To simplify a fraction, find the greatest common factor (GCF) of the numerator and denominator, then divide both by it. For example, 6/8 has a GCF of 2, so dividing both by 2 gives 3/4. Always simplify your final answer unless the problem says otherwise.",
        examples: [
          "6/9: GCF is 3, so 6/9 = 2/3",
          "4/10: GCF is 2, so 4/10 = 2/5"
        ]
      }
    ],
    exercises: [
      {
        question: "Add the fractions 1/3 and 1/6, and give the simplified sum.",
        choices: ["1/2", "2/9", "1/9", "2/6"],
        answer: 0,
        explanation: "LCD is 6: 1/3 = 2/6. Then 2/6 + 1/6 = 3/6, which simplifies to 1/2."
      },
      {
        question: "Subtract 1/4 from 3/4, and give the simplified result.",
        choices: ["2/4", "1/2", "4/8", "1/4"],
        answer: 1,
        explanation: "3/4 - 1/4 = 2/4, which simplifies to 1/2."
      },
      {
        question: "Add the fractions 2/5 and 1/10, and give the simplified sum.",
        choices: ["3/15", "1/2", "3/10", "1/5"],
        answer: 1,
        explanation: "LCD is 10: 2/5 = 4/10. Then 4/10 + 1/10 = 5/10, which simplifies to 1/2."
      },
      {
        question: "Subtract 1/6 from 5/6, and give the simplified result.",
        choices: ["4/6", "2/3", "5/6", "1/3"],
        answer: 1,
        explanation: "5/6 - 1/6 = 4/6, which simplifies to 2/3."
      },
      {
        question: "Add the fractions 1/2 and 1/3, and give the simplified sum.",
        choices: ["2/5", "5/6", "1/6", "2/6"],
        answer: 1,
        explanation: "LCD is 6: 1/2 = 3/6 and 1/3 = 2/6. Then 3/6 + 2/6 = 5/6, which is already simplified."
      },
      {
        question: "Simplify the fraction 8/12 to its lowest terms.",
        choices: ["4/6", "2/3", "1/2", "3/4"],
        answer: 1,
        explanation: "The greatest common factor of 8 and 12 is 4. Dividing both by 4 gives 2/3."
      }
    ]
  },
  {
    id: "math-3",
    title: "Multiplying and Dividing Fractions",
    minutes: 16,
    objective: "Multiply and divide fractions, including using reciprocals for division, and simplify results.",
    sections: [
      {
        heading: "Multiplying fractions",
        body: "To multiply two fractions, multiply the numerators together to get the new numerator, and multiply the denominators together to get the new denominator. There is no need to find a common denominator for multiplication. After multiplying, simplify the resulting fraction if possible.",
        examples: [
          "1/2 x 2/3 = (1x2)/(2x3) = 2/6 = 1/3 after simplifying",
          "3/4 x 1/5 = 3/20 (already simplified)"
        ]
      },
      {
        heading: "Dividing fractions",
        body: "To divide by a fraction, multiply by its reciprocal instead. The reciprocal of a fraction is formed by swapping the numerator and denominator, for example the reciprocal of 2/3 is 3/2. So dividing a/b by c/d is the same as multiplying a/b by d/c.",
        examples: [
          "1/2 / 1/4 = 1/2 x 4/1 = 4/2 = 2",
          "2/3 / 4/5 = 2/3 x 5/4 = 10/12 = 5/6 after simplifying"
        ]
      },
      {
        heading: "Simplifying before or after",
        body: "You can simplify fractions either before multiplying, by canceling common factors between a numerator and a denominator, or after multiplying the full result. Canceling first often keeps the numbers smaller and easier to work with. Either method gives the same final simplified answer.",
        examples: [
          "4/9 x 3/8: cancel 4 and 8 to get 1/9 x 3/2 = 3/18 = 1/6",
          "5/6 x 3/10: cancel 5 and 10, and 3 and 6, to get 1/2 x 1/2 = 1/4"
        ]
      }
    ],
    exercises: [
      {
        question: "Multiply 2/3 by 3/4, and give the simplified product.",
        choices: ["6/12", "1/2", "5/7", "2/4"],
        answer: 1,
        explanation: "Multiply straight across: (2x3)/(3x4) = 6/12, which simplifies to 1/2."
      },
      {
        question: "Multiply 1/5 by 2/3, and give the simplified product.",
        choices: ["2/15", "3/8", "2/8", "1/15"],
        answer: 0,
        explanation: "Multiply straight across: (1x2)/(5x3) = 2/15, which is already simplified."
      },
      {
        question: "Divide 3/4 by 1/2, and give the simplified quotient.",
        choices: ["3/8", "1/2", "3/2", "6/4"],
        answer: 2,
        explanation: "Multiply by the reciprocal: 3/4 x 2/1 = 6/4, which simplifies to 3/2."
      },
      {
        question: "Divide 2/5 by 4/5, and give the simplified quotient.",
        choices: ["8/25", "1/2", "2/4", "5/8"],
        answer: 1,
        explanation: "Multiply by the reciprocal: 2/5 x 5/4 = 10/20, which simplifies to 1/2."
      },
      {
        question: "Multiply 5/6 by 3/10, and give the simplified product.",
        choices: ["15/60", "1/4", "1/2", "8/16"],
        answer: 1,
        explanation: "Multiply straight across: (5x3)/(6x10) = 15/60, which simplifies to 1/4."
      },
      {
        question: "Divide 1/3 by 2/9, and give the simplified quotient.",
        choices: ["2/27", "3/2", "2/3", "9/6"],
        answer: 1,
        explanation: "Multiply by the reciprocal: 1/3 x 9/2 = 9/6, which simplifies to 3/2."
      }
    ]
  },
  {
    id: "math-4",
    title: "Decimals and Percentages",
    minutes: 17,
    objective: "Convert between fractions, decimals, and percentages, and calculate percentages of quantities.",
    sections: [
      {
        heading: "Converting between forms",
        body: "A decimal can be converted to a percentage by multiplying by 100 and adding a percent sign, and a percentage can be converted back to a decimal by dividing by 100. A fraction can be converted to a decimal by dividing the numerator by the denominator. These three forms — fractions, decimals, and percentages — all represent parts of a whole, just written differently.",
        examples: [
          "0.75 as a percentage: 0.75 x 100 = 75%",
          "3/4 as a decimal: 3 divided by 4 = 0.75"
        ]
      },
      {
        heading: "Finding a percentage of a number",
        body: "To find a percentage of a number, convert the percentage to a decimal and multiply it by the number. For example, to find 20% of 50, convert 20% to 0.20 and multiply by 50. This method works for any percentage and any quantity, including money, distances, and populations.",
        examples: [
          "Find 20% of 50: 0.20 x 50 = 10",
          "Find 15% of 200: 0.15 x 200 = 30"
        ]
      },
      {
        heading: "Percentage increase and decrease",
        body: "To increase a number by a percentage, find the percentage of the number and add it to the original. To decrease a number by a percentage, find the percentage of the number and subtract it from the original. This is useful for calculating discounts, taxes, and tips.",
        examples: [
          "Increase 80 by 10%: 10% of 80 is 8, so 80 + 8 = 88",
          "Decrease 60 by 25%: 25% of 60 is 15, so 60 - 15 = 45"
        ]
      }
    ],
    exercises: [
      {
        question: "Convert the decimal 0.4 to a percentage.",
        choices: ["0.4%", "4%", "40%", "400%"],
        answer: 2,
        explanation: "Multiply the decimal by 100: 0.4 x 100 = 40%."
      },
      {
        question: "Find 25% of the number 80.",
        choices: ["25", "20", "40", "16"],
        answer: 1,
        explanation: "Convert 25% to 0.25, then multiply: 0.25 x 80 = 20."
      },
      {
        question: "A shirt that costs $40 is discounted by 10%. Find the discounted price of the shirt.",
        choices: ["$4", "$44", "$30", "$36"],
        answer: 3,
        explanation: "10% of $40 is $4. Subtract the discount from the original price: $40 - $4 = $36."
      },
      {
        question: "Convert the fraction 1/5 to a decimal.",
        choices: ["0.5", "0.2", "0.15", "1.5"],
        answer: 1,
        explanation: "Divide the numerator by the denominator: 1 divided by 5 = 0.2."
      },
      {
        question: "A savings account with $200 earns 5% interest in one year. Find the total amount in the account after one year.",
        choices: ["$205", "$210", "$195", "$250"],
        answer: 1,
        explanation: "5% of $200 is $10. Add the interest to the original amount: $200 + $10 = $210."
      },
      {
        question: "Convert 0.08 to a percentage.",
        choices: ["0.08%", "0.8%", "8%", "80%"],
        answer: 2,
        explanation: "Multiply the decimal by 100: 0.08 x 100 = 8%."
      }
    ]
  },
  {
    id: "math-5",
    title: "Ratios and Proportions",
    minutes: 17,
    objective: "Simplify ratios and solve proportions to find unknown quantities.",
    sections: [
      {
        heading: "Understanding ratios",
        body: "A ratio compares two quantities and can be written as a fraction, such as 3:4 or 3/4. Ratios are simplified the same way fractions are, by dividing both parts by their greatest common factor. A ratio of 4:6 simplifies to 2:3 because both numbers can be divided by 2.",
        examples: [
          "Simplify the ratio 10:15: GCF is 5, so 10:15 becomes 2:3",
          "Simplify the ratio 8:12: GCF is 4, so 8:12 becomes 2:3"
        ]
      },
      {
        heading: "Setting up a proportion",
        body: "A proportion states that two ratios are equal, such as a/b = c/d. Proportions are useful for finding an unknown quantity when you know a consistent rate or scale, such as recipe scaling or map distances. To solve a proportion for an unknown, cross-multiply: multiply the numerator of one side by the denominator of the other.",
        examples: [
          "Solve 3/4 = x/12: cross-multiply to get 3 x 12 = 4 x x, so 36 = 4x, so x = 9",
          "Solve 2/5 = 10/x: cross-multiply to get 2 x x = 5 x 10, so 2x = 50, so x = 25"
        ]
      },
      {
        heading: "Applying proportions to word problems",
        body: "Many real-world problems, like unit pricing, scaling recipes, and map reading, can be solved by setting up a proportion between a known rate and an unknown amount. Always write the same type of quantity in the same position in both ratios, such as always putting cups on top and servings on the bottom. This keeps the proportion set up correctly and avoids mixing up units.",
        examples: [
          "A recipe uses 2 cups of flour for 8 servings. For 20 servings: 2/8 = x/20, so 8x = 40, so x = 5 cups"
        ]
      }
    ],
    exercises: [
      {
        question: "Simplify the ratio 12:18 to its lowest terms.",
        choices: ["6:9", "2:3", "4:6", "3:2"],
        answer: 1,
        explanation: "The greatest common factor of 12 and 18 is 6. Dividing both parts by 6 gives 2:3."
      },
      {
        question: "Solve the proportion 2/3 = x/9 to find the value of x.",
        choices: ["6", "3", "12", "18"],
        answer: 0,
        explanation: "Cross-multiply: 2 x 9 = 3 x x, so 18 = 3x, so x = 6."
      },
      {
        question: "A car travels 150 miles using 5 gallons of gas. Find how many miles the car can travel using 8 gallons of gas at the same rate.",
        choices: ["200 miles", "240 miles", "180 miles", "160 miles"],
        answer: 1,
        explanation: "Set up the proportion 150/5 = x/8. Cross-multiply: 150 x 8 = 5 x x, so 1200 = 5x, so x = 240 miles."
      },
      {
        question: "Solve the proportion 5/8 = 15/x to find the value of x.",
        choices: ["24", "20", "18", "30"],
        answer: 0,
        explanation: "Cross-multiply: 5 x x = 8 x 15, so 5x = 120, so x = 24."
      },
      {
        question: "A recipe uses 3 cups of flour for 12 cookies. Find how many cups of flour are needed to make 20 cookies at the same rate.",
        choices: ["4 cups", "5 cups", "6 cups", "8 cups"],
        answer: 1,
        explanation: "Set up the proportion 3/12 = x/20. Cross-multiply: 3 x 20 = 12 x x, so 60 = 12x, so x = 5 cups."
      },
      {
        question: "Simplify the ratio 9:6 to its lowest terms.",
        choices: ["3:2", "9:6", "2:3", "6:9"],
        answer: 0,
        explanation: "The greatest common factor of 9 and 6 is 3. Dividing both parts by 3 gives 3:2."
      }
    ]
  },
  {
    id: "math-6",
    title: "One- and Two-Step Equations",
    minutes: 18,
    objective: "Solve one-step and two-step linear equations for an unknown variable.",
    sections: [
      {
        heading: "Solving one-step equations",
        body: "A one-step equation requires a single operation to isolate the variable. To keep the equation balanced, whatever operation you perform on one side must also be performed on the other side. Use the inverse operation to undo whatever is being done to the variable — subtraction undoes addition, and division undoes multiplication.",
        examples: [
          "Solve x + 5 = 12: subtract 5 from both sides, so x = 7",
          "Solve 3x = 21: divide both sides by 3, so x = 7"
        ]
      },
      {
        heading: "Solving two-step equations",
        body: "A two-step equation requires undoing addition or subtraction first, then undoing multiplication or division. This order reverses the standard order of operations because you are working backward to isolate the variable. Always perform the same operation on both sides of the equation to keep it balanced.",
        examples: [
          "Solve 2x + 3 = 11: subtract 3 from both sides to get 2x = 8, then divide by 2 to get x = 4",
          "Solve 5x - 4 = 16: add 4 to both sides to get 5x = 20, then divide by 5 to get x = 4"
        ]
      },
      {
        heading: "Checking your solution",
        body: "After solving an equation, substitute your answer back into the original equation to verify both sides are equal. This step catches arithmetic mistakes and confirms the solution is correct. If the two sides do not match, redo the steps carefully to find the error.",
        examples: [
          "Check x = 4 in 2x + 3 = 11: 2(4) + 3 = 8 + 3 = 11, which matches, so x = 4 is correct"
        ]
      }
    ],
    exercises: [
      {
        question: "Solve the equation x + 9 = 15 to find the value of x.",
        choices: ["24", "6", "5", "9"],
        answer: 1,
        explanation: "Subtract 9 from both sides: x = 15 - 9 = 6."
      },
      {
        question: "Solve the equation 4x = 28 to find the value of x.",
        choices: ["24", "32", "7", "4"],
        answer: 2,
        explanation: "Divide both sides by 4: x = 28 / 4 = 7."
      },
      {
        question: "Solve the equation 3x + 2 = 17 to find the value of x.",
        choices: ["5", "6", "15", "19"],
        answer: 0,
        explanation: "Subtract 2 from both sides to get 3x = 15, then divide by 3 to get x = 5."
      },
      {
        question: "Solve the equation 2x - 5 = 9 to find the value of x.",
        choices: ["2", "7", "14", "9"],
        answer: 1,
        explanation: "Add 5 to both sides to get 2x = 14, then divide by 2 to get x = 7."
      },
      {
        question: "Solve the equation x / 3 = 6 to find the value of x.",
        choices: ["2", "9", "18", "3"],
        answer: 2,
        explanation: "Multiply both sides by 3: x = 6 x 3 = 18."
      },
      {
        question: "Solve the equation 5x + 4 = 24 to find the value of x.",
        choices: ["4", "5", "28", "20"],
        answer: 0,
        explanation: "Subtract 4 from both sides to get 5x = 20, then divide by 5 to get x = 4."
      }
    ]
  },
  {
    id: "math-7",
    title: "Negative Numbers",
    minutes: 15,
    objective: "Add, subtract, multiply, and divide negative numbers correctly.",
    sections: [
      {
        heading: "Adding and subtracting negatives",
        body: "Adding a negative number is the same as subtracting its positive value, and subtracting a negative number is the same as adding its positive value. A number line can help visualize this: moving right is adding, moving left is subtracting. When combining a positive and a negative number, find the difference between their absolute values and keep the sign of the number with the larger absolute value.",
        examples: [
          "-3 + 5 = 2 (5 has a larger absolute value, and it is positive)",
          "4 - 7 = -3 (7 has a larger absolute value, and it is being subtracted)",
          "-2 - 3 = -5 (subtracting a positive from a negative makes it more negative)"
        ]
      },
      {
        heading: "Multiplying and dividing negatives",
        body: "When multiplying or dividing two numbers, if the signs are the same (both positive or both negative), the result is positive. If the signs are different, the result is negative. This rule applies consistently whether you are multiplying or dividing.",
        examples: [
          "-4 x -3 = 12 (same signs give a positive result)",
          "-4 x 3 = -12 (different signs give a negative result)",
          "-12 / -4 = 3 (same signs give a positive result)"
        ]
      },
      {
        heading: "Combining operations with negatives",
        body: "When an expression has several operations involving negative numbers, apply the order of operations while carefully tracking each sign. It often helps to rewrite subtraction of a negative as addition before calculating. Working one operation at a time reduces sign errors.",
        examples: [
          "-5 + (-2) x 3 = -5 + (-6) (multiply first) = -11",
          "10 - (-4) = 10 + 4 = 14"
        ]
      }
    ],
    exercises: [
      {
        question: "Calculate the value of -8 + 3.",
        choices: ["-5", "5", "-11", "11"],
        answer: 0,
        explanation: "8 has the larger absolute value and is negative, so -8 + 3 = -5."
      },
      {
        question: "Calculate the value of 6 - (-2).",
        choices: ["4", "-4", "8", "-8"],
        answer: 2,
        explanation: "Subtracting a negative is the same as adding: 6 - (-2) = 6 + 2 = 8."
      },
      {
        question: "Calculate the value of -5 x -6.",
        choices: ["-30", "30", "-11", "11"],
        answer: 1,
        explanation: "Both numbers are negative, so the result is positive: -5 x -6 = 30."
      },
      {
        question: "Calculate the value of -20 / 4.",
        choices: ["-5", "5", "-16", "16"],
        answer: 0,
        explanation: "The signs are different (negative divided by positive), so the result is negative: -20 / 4 = -5."
      },
      {
        question: "Calculate the value of -7 + (-4).",
        choices: ["3", "-3", "11", "-11"],
        answer: 3,
        explanation: "Adding two negative numbers gives a more negative result: -7 + (-4) = -11."
      },
      {
        question: "Calculate the value of -3 + 4 x -2.",
        choices: ["-11", "11", "2", "-2"],
        answer: 0,
        explanation: "Multiply first: 4 x -2 = -8. Then add: -3 + (-8) = -11."
      }
    ]
  },
  {
    id: "math-8",
    title: "Area, Perimeter, and Word Problems",
    minutes: 20,
    objective: "Calculate area and perimeter of rectangles and triangles and apply these formulas to word problems.",
    sections: [
      {
        heading: "Perimeter",
        body: "Perimeter is the total distance around the outside of a shape, found by adding the lengths of all its sides. For a rectangle, the formula is perimeter = 2 x (length + width) because opposite sides are equal. Perimeter is measured in units of length, such as feet or meters, not square units.",
        examples: [
          "A rectangle with length 8 ft and width 5 ft: perimeter = 2 x (8 + 5) = 2 x 13 = 26 ft"
        ]
      },
      {
        heading: "Area",
        body: "Area is the amount of space inside a two-dimensional shape, measured in square units. For a rectangle, area = length x width. For a triangle, area = 1/2 x base x height. Always include the correct square units, such as square feet or square meters, when reporting an area.",
        examples: [
          "A rectangle with length 6 m and width 4 m: area = 6 x 4 = 24 square meters",
          "A triangle with base 10 cm and height 6 cm: area = 1/2 x 10 x 6 = 30 square centimeters"
        ]
      },
      {
        heading: "Solving word problems",
        body: "Word problems require identifying which formula applies and what units the answer needs. Read carefully to determine whether the question asks for the distance around a shape (perimeter) or the space inside it (area). Write down the known values, choose the correct formula, substitute the values, and calculate the answer step by step, including units in the final answer.",
        examples: [
          "A garden is 12 ft long and 7 ft wide. Fencing needed is the perimeter: 2 x (12 + 7) = 2 x 19 = 38 ft"
        ]
      }
    ],
    exercises: [
      {
        question: "A rectangular room is 10 feet long and 8 feet wide. Find the perimeter of the room.",
        choices: ["18 feet", "80 feet", "36 feet", "40 feet"],
        answer: 2,
        explanation: "Perimeter = 2 x (length + width) = 2 x (10 + 8) = 2 x 18 = 36 feet."
      },
      {
        question: "A rectangular garden is 9 meters long and 5 meters wide. Find the area of the garden.",
        choices: ["28 square meters", "45 square meters", "14 square meters", "40 square meters"],
        answer: 1,
        explanation: "Area = length x width = 9 x 5 = 45 square meters."
      },
      {
        question: "A triangular sign has a base of 12 inches and a height of 8 inches. Find the area of the sign.",
        choices: ["96 square inches", "48 square inches", "20 square inches", "40 square inches"],
        answer: 1,
        explanation: "Area of a triangle = 1/2 x base x height = 1/2 x 12 x 8 = 48 square inches."
      },
      {
        question: "A rectangular fence encloses a yard that is 15 feet long and 10 feet wide. Find the total length of fencing needed to go around the yard.",
        choices: ["50 feet", "150 feet", "25 feet", "60 feet"],
        answer: 0,
        explanation: "Perimeter = 2 x (length + width) = 2 x (15 + 10) = 2 x 25 = 50 feet."
      },
      {
        question: "A rectangular poster is 3 feet wide and has an area of 15 square feet. Find the length of the poster.",
        choices: ["3 feet", "5 feet", "12 feet", "45 feet"],
        answer: 1,
        explanation: "Since area = length x width, length = area / width = 15 / 3 = 5 feet."
      },
      {
        question: "A triangular flag has a base of 20 centimeters and an area of 60 square centimeters. Find the height of the flag.",
        choices: ["3 centimeters", "6 centimeters", "12 centimeters", "40 centimeters"],
        answer: 1,
        explanation: "Since area = 1/2 x base x height, 60 = 1/2 x 20 x height, so 60 = 10 x height, so height = 6 centimeters."
      }
    ]
  }
];
