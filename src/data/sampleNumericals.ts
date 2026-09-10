import { NumericalProblem, SubjectId } from '../types';

export const NUMERICAL_PROBLEMS: NumericalProblem[] = [
  // --- MATHEMATICS: Quadratic Equations ---
  {
    id: 'num-quad-01',
    subjectId: 'mathematics',
    chapterId: 'math-quadratic-equations',
    topic: 'Word Problems on Speed & Distance',
    question: 'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the original speed of the train.',
    givenData: [
      'Total distance (D) = 360 km',
      'Increased speed = (x + 5) km/h, where x = original speed in km/h',
      'Difference in time = 1 hour'
    ],
    formula: '\\text{Time } t = \\frac{\\text{Distance}}{\\text{Speed}} \\implies \\frac{360}{x} - \\frac{360}{x + 5} = 1',
    stepByStepSolution: [
      'Step 1: Set up the time equation:\nTime taken at original speed = 360 / x\nTime taken at increased speed = 360 / (x + 5)',
      'Step 2: Formulate the algebraic difference equation:\n360/x - 360/(x + 5) = 1',
      'Step 3: Take LCM and clear fractions:\n360 [ (x + 5 - x) / (x(x + 5)) ] = 1\n360 [ 5 / (x² + 5x) ] = 1\n1800 = x² + 5x',
      'Step 4: Form the standard quadratic equation:\nx² + 5x - 1800 = 0',
      'Step 5: Factorise the quadratic equation:\nx² + 45x - 40x - 1800 = 0\nx(x + 45) - 40(x + 45) = 0\n(x + 45)(x - 40) = 0',
      'Step 6: Solve for roots:\nx = 40 or x = -45\nSince speed cannot be negative, we reject x = -45.'
    ],
    finalAnswer: 'Original speed of the train = 40 km/h',
    difficulty: 'Medium'
  },
  {
    id: 'num-quad-02',
    subjectId: 'mathematics',
    chapterId: 'math-quadratic-equations',
    topic: 'Discriminant & Nature of Roots',
    question: 'Find the values of k for which the quadratic equation (k - 12)x² + 2(k - 12)x + 2 = 0 has equal real roots.',
    givenData: [
      'Equation: (k - 12)x² + 2(k - 12)x + 2 = 0',
      'Condition: Has two equal real roots',
      'Coefficients: a = k - 12, b = 2(k - 12), c = 2'
    ],
    formula: 'D = b^2 - 4ac = 0 \\quad \\text{for equal roots, with } a \\neq 0',
    stepByStepSolution: [
      'Step 1: Note that for the given equation to be quadratic, the coefficient of x² must be non-zero:\na = k - 12 ≠ 0 => k ≠ 12.',
      'Step 2: Calculate the discriminant D:\nD = [2(k - 12)]² - 4(k - 12)(2)\nD = 4(k - 12)² - 8(k - 12)',
      'Step 3: Factor out the common term 4(k - 12):\nD = 4(k - 12) [ (k - 12) - 2 ]\nD = 4(k - 12)(k - 14)',
      'Step 4: Set D = 0 for equal roots:\n4(k - 12)(k - 14) = 0\n=> k = 12 or k = 14',
      'Step 5: Check boundary condition:\nSince k ≠ 12 (otherwise coefficient of x² becomes zero and it is no longer quadratic), the only valid solution is k = 14.'
    ],
    finalAnswer: 'k = 14 (k = 12 is rejected as it renders the equation non-quadratic)',
    difficulty: 'Hard'
  },

  // --- SCIENCE: Light - Reflection and Refraction ---
  {
    id: 'num-light-01',
    subjectId: 'science',
    chapterId: 'sci-light',
    topic: 'Mirror Formula & Magnification',
    question: 'An object 4.0 cm in size is placed at 25.0 cm in front of a concave mirror of focal length 15.0 cm. At what distance from the mirror should a screen be placed in order to obtain a sharp image? Find the nature and size of the image.',
    givenData: [
      'Object height (h) = +4.0 cm',
      'Object distance (u) = -25.0 cm (New Cartesian sign convention)',
      'Focal length of concave mirror (f) = -15.0 cm'
    ],
    formula: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}, \\quad m = \\frac{h\'}{h} = -\\frac{v}{u}',
    stepByStepSolution: [
      'Step 1: Write the mirror formula:\n1/v = 1/f - 1/u',
      'Step 2: Substitute given values with proper signs:\n1/v = 1/(-15.0) - 1/(-25.0)\n1/v = -1/15 + 1/25\nLCM of 15 and 25 is 75:\n1/v = (-5 + 3) / 75 = -2 / 75',
      'Step 3: Solve for image distance v:\nv = -75 / 2 = -37.5 cm\nThe negative sign indicates the image is formed on the same side as the object (in front of the mirror), so it is a REAL image.',
      'Step 4: Calculate magnification m and image height h\':\nm = -v / u = -(-37.5) / (-25.0) = -1.5\nh\' = m × h = -1.5 × 4.0 cm = -6.0 cm'
    ],
    finalAnswer: 'Screen distance v = 37.5 cm in front of mirror; Image is Real, Inverted, and of height 6.0 cm (Magnified).',
    difficulty: 'Medium'
  },
  {
    id: 'num-light-02',
    subjectId: 'science',
    chapterId: 'sci-light',
    topic: 'Lens Formula & Power of Lens',
    question: 'A convex lens of focal length 20 cm forms a real image 40 cm away from the lens. Find the position of the object and the power of the lens.',
    givenData: [
      'Focal length of convex lens (f) = +20 cm = +0.2 m',
      'Image distance (v) = +40 cm (real image is formed on the other side of lens)'
    ],
    formula: '\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}, \\quad P = \\frac{1}{f(\\text{in m})}',
    stepByStepSolution: [
      'Step 1: Apply the lens formula:\n1/f = 1/v - 1/u => 1/u = 1/v - 1/f',
      'Step 2: Substitute numerical values:\n1/u = 1/40 - 1/20 = (1 - 2) / 40 = -1/40\nTherefore, u = -40 cm.',
      'Step 3: Calculate power of the lens:\nP = 1 / f(in metres) = 1 / 0.2 m = +5.0 Dioptres (D).'
    ],
    finalAnswer: 'Object distance u = -40 cm (at 2F₁); Power of lens P = +5.0 D',
    difficulty: 'Easy'
  },

  // --- SCIENCE: Electricity ---
  {
    id: 'num-elec-01',
    subjectId: 'science',
    chapterId: 'sci-electricity',
    topic: 'Equivalent Resistance in Combined Circuits',
    question: 'An electric lamp of resistance 20 Ω and a conductor of 4 Ω resistance are connected in series to a 6 V battery. Calculate: (a) the total resistance of the circuit, (b) the current through the circuit, and (c) the potential difference across the electric lamp and the conductor.',
    givenData: [
      'Resistance of lamp (R₁) = 20 Ω',
      'Resistance of conductor (R₂) = 4 Ω',
      'Voltage of battery (V) = 6 V'
    ],
    formula: 'R_s = R_1 + R_2, \\quad I = \\frac{V}{R_s}, \\quad V_1 = I R_1, \\quad V_2 = I R_2',
    stepByStepSolution: [
      'Step 1: Total resistance in series:\nRs = R₁ + R₂ = 20 Ω + 4 Ω = 24 Ω.',
      'Step 2: Current through the circuit using Ohm’s Law:\nI = V / Rs = 6 V / 24 Ω = 0.25 A.',
      'Step 3: Potential difference across electric lamp:\nV₁ = I × R₁ = 0.25 A × 20 Ω = 5.0 V.',
      'Step 4: Potential difference across conductor:\nV₂ = I × R₂ = 0.25 A × 4 Ω = 1.0 V.',
      'Step 5: Verification: V₁ + V₂ = 5.0 V + 1.0 V = 6.0 V (Matches battery voltage).'
    ],
    finalAnswer: '(a) Total Resistance = 24 Ω; (b) Current = 0.25 A; (c) V_lamp = 5 V, V_conductor = 1 V',
    difficulty: 'Easy'
  },
  {
    id: 'num-elec-02',
    subjectId: 'science',
    chapterId: 'sci-electricity',
    topic: 'Joule’s Heating & Commercial Unit of Electrical Energy',
    question: 'An electric refrigerator rated 400 W operates 8 hours/day and an electric television rated 100 W operates 6 hours/day. What is the total cost of the energy to operate them for 30 days at ₹ 3.00 per kWh?',
    givenData: [
      'Refrigerator power P₁ = 400 W = 0.4 kW; Time t₁ = 8 h/day',
      'TV power P₂ = 100 W = 0.1 kW; Time t₂ = 6 h/day',
      'Duration = 30 days',
      'Cost rate = ₹ 3.00 per kWh (unit)'
    ],
    formula: 'E = P \\times t, \\quad \\text{Total Cost} = \\text{Total Energy in kWh} \\times \\text{Rate}',
    stepByStepSolution: [
      'Step 1: Daily energy consumption of refrigerator:\nE₁ = 400 W × 8 h = 3200 Wh = 3.2 kWh.',
      'Step 2: Daily energy consumption of TV:\nE₂ = 100 W × 6 h = 600 Wh = 0.6 kWh.',
      'Step 3: Total daily electrical energy:\nE_daily = 3.2 kWh + 0.6 kWh = 3.8 kWh.',
      'Step 4: Total energy consumed in 30 days:\nE_total = 3.8 kWh/day × 30 days = 114 kWh.',
      'Step 5: Calculate total bill/cost:\nCost = 114 kWh × ₹ 3.00/kWh = ₹ 342.00.'
    ],
    finalAnswer: 'Total Energy Consumed = 114 kWh (Units); Total Cost = ₹ 342.00',
    difficulty: 'Medium'
  }
];

export function getNumericalsForChapter(chapterId: string): NumericalProblem[] {
  const filtered = NUMERICAL_PROBLEMS.filter(n => n.chapterId === chapterId);
  if (filtered.length > 0) return filtered;

  // Generic dynamic numerical for remaining chapters
  return [
    {
      id: `num-${chapterId}-gen1`,
      subjectId: 'mathematics',
      chapterId,
      topic: 'Practice Problem 1',
      question: `Calculate the primary parameter under standard Class 10 conditions for this chapter given test inputs of 12 units and 16 units.`,
      givenData: [
        'Input Parameter A = 12 units',
        'Input Parameter B = 16 units',
        'Standard conversion factor k = 1.0'
      ],
      formula: 'Result = \\sqrt{A^2 + B^2}',
      stepByStepSolution: [
        'Step 1: Identify given variables A = 12 and B = 16.',
        'Step 2: Apply the governing formula:\nResult = √(12² + 16²)',
        'Step 3: Compute squares:\n12² = 144, 16² = 256\nSum = 144 + 256 = 400',
        'Step 4: Calculate square root:\n√400 = 20 units.'
      ],
      finalAnswer: 'Computed Result = 20 units',
      difficulty: 'Easy'
    },
    {
      id: `num-${chapterId}-gen2`,
      subjectId: 'mathematics',
      chapterId,
      topic: 'Practice Problem 2 (Advanced)',
      question: `Determine the critical boundary value when the initial quantity changes from 25 to 75 over an interval of 10 standard steps.`,
      givenData: [
        'Initial state X₀ = 25',
        'Final state X₁ = 75',
        'Steps N = 10'
      ],
      formula: '\\Delta X = \\frac{X_1 - X_0}{N}',
      stepByStepSolution: [
        'Step 1: Find net change:\nΔTotal = 75 - 25 = 50.',
        'Step 2: Divide by total steps:\nStep size = 50 / 10 = 5 units per step.',
        'Step 3: Verification:\n25 + (10 × 5) = 75.'
      ],
      finalAnswer: 'Rate of change = 5 units per step',
      difficulty: 'Medium'
    }
  ];
}
