import { ChapterNotes } from '../types';
import { INITIAL_CHAPTERS } from './syllabusData';

export const CURATED_CHAPTER_NOTES: Record<string, ChapterNotes> = {
  'math-quadratic-equations': {
    chapterId: 'math-quadratic-equations',
    chapterName: 'Quadratic Equations',
    subjectId: 'mathematics',
    introduction: 'A quadratic equation in the variable x is an equation of the form ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0. The word quadratic comes from "quadratus", meaning square. Quadratic equations arise in many real-life situations, such as finding trajectories, calculating speeds and work rates, and determining dimensions of architectural structures.',
    concepts: [
      {
        id: 'c1',
        title: 'Standard Form of Quadratic Equation',
        content: 'Any equation of degree 2 in one variable x is known as a quadratic equation. The canonical standard form is written in decreasing powers of x: ax² + bx + c = 0 (with a ≠ 0).',
        subpoints: [
          'a is the coefficient of x² (cannot be zero)',
          'b is the coefficient of x',
          'c is the constant term'
        ],
        keyTakeaway: 'Always rearrange terms into standard ax² + bx + c = 0 before identifying coefficients a, b, and c.'
      },
      {
        id: 'c2',
        title: 'Solving by Factorisation (Splitting the Middle Term)',
        content: 'To solve ax² + bx + c = 0 by factorisation, find two numbers p and q such that p + q = b and p × q = ac. Then rewrite bx as px + qx and factor by grouping.',
        example: 'Solve x² - 5x + 6 = 0: Here a=1, b=-5, c=6. We need p+q=-5 and pq=6. The numbers are -2 and -3. So (x - 2)(x - 3) = 0 => x = 2, 3.'
      },
      {
        id: 'c3',
        title: 'The Quadratic Formula (Sridharacharya’s Rule)',
        content: 'For ax² + bx + c = 0, the roots are given by x = (-b ± √(b² - 4ac)) / (2a), provided that the discriminant b² - 4ac ≥ 0.',
        keyTakeaway: 'This formula works on ALL quadratic equations, even when factorisation is difficult or roots are irrational.'
      },
      {
        id: 'c4',
        title: 'Nature of Roots & The Discriminant (D = b² - 4ac)',
        content: 'The expression D = b² - 4ac determines whether the roots are real, distinct, equal, or imaginary:',
        subpoints: [
          'Case 1: If D > 0, there are two distinct real roots: (-b + √D)/(2a) and (-b - √D)/(2a).',
          'Case 2: If D = 0, there are two equal real roots: -b / (2a).',
          'Case 3: If D < 0, there are no real roots (roots are imaginary/complex).'
        ]
      }
    ],
    definitions: [
      {
        term: 'Root of Quadratic Equation',
        definition: 'A real number α is called a root of the quadratic equation ax² + bx + c = 0 if aα² + bα + c = 0. The roots of the quadratic equation are identical to the zeroes of the quadratic polynomial ax² + bx + c.'
      },
      {
        term: 'Discriminant (D)',
        definition: 'The quantity D = b² - 4ac is called the discriminant because it discriminates between the possible nature of the roots.'
      }
    ],
    formulas: [
      {
        id: 'f1',
        name: 'Standard Form',
        formula: 'ax² + bx + c = 0, \\quad a \\neq 0',
        variables: 'a = coeff of x², b = coeff of x, c = constant',
        application: 'Foundation for all polynomial and trajectory analysis.'
      },
      {
        id: 'f2',
        name: 'Discriminant Formula',
        formula: 'D = b² - 4ac',
        variables: 'D = Discriminant',
        application: 'Used to check nature of roots before solving.'
      },
      {
        id: 'f3',
        name: 'Quadratic Roots Formula',
        formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        variables: 'x = roots, a, b, c = coefficients',
        application: 'Direct solution for roots when factors are non-obvious.'
      },
      {
        id: 'f4',
        name: 'Sum and Product of Roots',
        formula: '\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}',
        variables: 'α, β = roots',
        application: 'Forming equations: x² - (α + β)x + αβ = 0.'
      }
    ],
    shortTricks: [
      'If a + b + c = 0 in ax² + bx + c = 0, then one root is always 1 and the other root is c/a.',
      'If a - b + c = 0, then one root is always -1 and the other root is -c/a.',
      'To verify roots quickly in the exam, check if the sum equals -b/a and the product equals c/a.'
    ],
    examTips: [
      'Always check the discriminant first when asked: "Find the value of k for which the equation has equal roots". Set D = 0 and solve for k.',
      'In speed/stream/train word problems, reject negative roots if the variable represents physical dimensions (speed, time, distance, length). Explicitly write: "Since speed cannot be negative, x = ..." to avoid losing 1 mark in CBSE step-marking.',
      'Remember the denominator in quadratic formula is 2a, NOT 2.'
    ],
    importantQuestions: [
      {
        question: 'Find the values of k for which the quadratic equation (k + 4)x² + (k + 1)x + 1 = 0 has equal roots.',
        answer: 'For equal roots, D = 0 => (k + 1)² - 4(k + 4)(1) = 0 => k² + 2k + 1 - 4k - 16 = 0 => k² - 2k - 15 = 0 => (k - 5)(k + 3) = 0 => k = 5 or k = -3.',
        marks: 3
      },
      {
        question: 'Solve for x: 1/(x + 4) - 1/(x - 7) = 11/30, (x ≠ -4, 7).',
        answer: '[(x - 7) - (x + 4)] / [(x + 4)(x - 7)] = 11/30 => -11 / (x² - 3x - 28) = 11/30 => -1 / (x² - 3x - 28) = 1/30 => x² - 3x - 28 = -30 => x² - 3x + 2 = 0 => (x - 1)(x - 2) = 0 => x = 1 or x = 2.',
        marks: 4
      }
    ]
  },
  'sci-light': {
    chapterId: 'sci-light',
    chapterName: 'Light – Reflection and Refraction',
    subjectId: 'science',
    introduction: 'Light is a form of electromagnetic radiation that enables us to see objects. Light travels in straight lines in a homogeneous transparent medium (rectilinear propagation). In this chapter, we study the phenomena of reflection by spherical mirrors, refraction through glass slabs and spherical lenses, ray tracing, and the quantitative lens and mirror formulas.',
    concepts: [
      {
        id: 'cl1',
        title: 'Laws of Reflection',
        content: '1. The angle of incidence (i) is equal to the angle of reflection (r): ∠i = ∠r.\n2. The incident ray, the reflected ray, and the normal to the reflecting surface at the point of incidence, all lie in the same plane.',
        keyTakeaway: 'These laws apply to all reflecting surfaces including spherical surfaces.'
      },
      {
        id: 'cl2',
        title: 'Sign Convention (New Cartesian)',
        content: 'The pole (P) of the mirror or optical centre (O) of the lens is taken as the origin.',
        subpoints: [
          'Object is always placed to the left of the mirror/lens (u is always negative).',
          'Distances measured in direction of incident light (to the right) are positive.',
          'Distances measured against incident light (to the left) are negative.',
          'Heights above principal axis are positive (+), below are negative (-).'
        ]
      },
      {
        id: 'cl3',
        title: 'Snell’s Law of Refraction',
        content: 'The ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media: sin(i) / sin(r) = n₂₁ = constant.',
        example: 'Refractive index of water is 4/3 ≈ 1.33, glass is 3/2 = 1.5, and diamond is 2.42 (highest).'
      }
    ],
    definitions: [
      {
        term: 'Focal Length (f)',
        definition: 'The distance between the pole (P) and principal focus (F) of a spherical mirror or lens. For a spherical mirror of small aperture, R = 2f.'
      },
      {
        term: 'Power of a Lens (P)',
        definition: 'The degree of convergence or divergence of light rays achieved by a lens, defined as the reciprocal of its focal length in metres: P = 1 / f(in m). The SI unit is Dioptre (D).'
      }
    ],
    formulas: [
      {
        id: 'fl1',
        name: 'Mirror Formula',
        formula: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}',
        variables: 'f = focal length, v = image distance, u = object distance',
        application: 'Used for concave and convex mirrors.'
      },
      {
        id: 'fl2',
        name: 'Mirror Magnification',
        formula: 'm = \\frac{h\'}{h} = -\\frac{v}{u}',
        variables: 'h\' = image height, h = object height',
        application: 'Negative m means real and inverted; positive m means virtual and erect.'
      },
      {
        id: 'fl3',
        name: 'Lens Formula',
        formula: '\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}',
        variables: 'f = focal length, v = image distance, u = object distance',
        application: 'Notice the minus sign between 1/v and 1/u.'
      },
      {
        id: 'fl4',
        name: 'Power of Lens',
        formula: 'P = \\frac{1}{f(\\text{in meters})} = \\frac{100}{f(\\text{in cm})}',
        variables: 'P = Power in Dioptres (D)',
        application: 'Convex lens has positive P; concave lens has negative P.'
      }
    ],
    shortTricks: [
      'Mirror: + in formula (1/v + 1/u = 1/f), - in magnification (m = -v/u).',
      'Lens: - in formula (1/v - 1/u = 1/f), + in magnification (m = +v/u).',
      'u is ALWAYS NEGATIVE in both mirrors and lenses!'
    ],
    examTips: [
      'In ray diagrams, always draw directional arrows on the incident and reflected/refracted rays. CBSE deducts marks if arrow heads are missing.',
      'Remember: Real image is always inverted (m < 0), Virtual image is always erect (m > 0).'
    ],
    importantQuestions: [
      {
        question: 'A concave lens has focal length of 15 cm. At what distance should the object from the lens be placed so that it forms an image at 10 cm from the lens? Also, find the magnification produced.',
        answer: 'For concave lens, f = -15 cm, v = -10 cm (virtual image on same side). 1/f = 1/v - 1/u => -1/15 = -1/10 - 1/u => 1/u = -1/10 + 1/15 = (-3 + 2)/30 = -1/30 => u = -30 cm. Magnification m = v/u = (-10)/(-30) = +1/3 = +0.33.',
        marks: 3
      }
    ]
  },
  'sci-electricity': {
    chapterId: 'sci-electricity',
    chapterName: 'Electricity',
    subjectId: 'science',
    introduction: 'Electricity is an indispensable form of modern energy. It deals with electric charges, electric current, potential difference, electrical resistance, and circuit configurations. We explore Ohm’s law, Joule’s heating effect, and electric power consumption calculations.',
    concepts: [
      {
        id: 'ce1',
        title: 'Ohm’s Law',
        content: 'The potential difference V across the ends of a given metallic wire in an electric circuit is directly proportional to the current I flowing through it, provided its temperature remains constant: V ∝ I => V = IR.',
        keyTakeaway: 'The graph between V and I is a straight line passing through the origin. Its slope represents Resistance R.'
      },
      {
        id: 'ce2',
        title: 'Factors on which Resistance Depends',
        content: 'The resistance R of a uniform metallic conductor depends on: 1) its length (L), 2) its area of cross-section (A), 3) the nature of its material: R = ρ(L/A), where ρ is resistivity (SI unit: Ω·m).',
        subpoints: [
          'Doubling the length doubles resistance.',
          'Doubling the cross-sectional area halves resistance.'
        ]
      },
      {
        id: 'ce3',
        title: 'Series vs Parallel Combinations',
        content: 'Series: Same current I flows through all resistors. R_s = R₁ + R₂ + R₃. Parallel: Same potential difference V across each resistor. 1/R_p = 1/R₁ + 1/R₂ + 1/R₃.',
        example: 'Household circuits are always connected in parallel so each appliance gets the full 220V and operates independently.'
      }
    ],
    definitions: [
      {
        term: 'Electric Current (I)',
        definition: 'The rate of flow of electric charges through any cross-section of a conductor: I = Q / t. SI unit is Ampere (A).'
      },
      {
        term: '1 Volt Potential Difference',
        definition: 'One volt is the potential difference between two points in a current-carrying conductor when 1 joule of work is done to move a charge of 1 coulomb from one point to the other: 1 V = 1 J / 1 C.'
      }
    ],
    formulas: [
      {
        id: 'fe1',
        name: 'Ohm’s Law',
        formula: 'V = IR',
        variables: 'V = Voltage (Volts), I = Current (Amps), R = Resistance (Ohms)',
        application: 'Fundamental circuit equation.'
      },
      {
        id: 'fe2',
        name: 'Resistivity Formula',
        formula: 'R = \\rho \\frac{L}{A}',
        variables: 'ρ = Resistivity (Ω·m), L = Length (m), A = Area (m²)',
        application: 'Calculating changes in wire geometry.'
      },
      {
        id: 'fe3',
        name: 'Joule’s Heating Law',
        formula: 'H = I^2 R t',
        variables: 'H = Heat energy (Joules), t = time in seconds',
        application: 'Thermal output in heaters, toasters, and electric fuses.'
      },
      {
        id: 'fe4',
        name: 'Electric Power',
        formula: 'P = VI = I^2 R = \\frac{V^2}{R}',
        variables: 'P = Power in Watts (W)',
        application: 'Energy consumption: E = P × t (1 kWh = 3.6 × 10⁶ J).'
      }
    ],
    shortTricks: [
      'If a wire is stretched to double its length (without changing volume), its area becomes A/2, so its resistance becomes 4 times the original: R\' = n²R.',
      'For two resistors in parallel: R_p = (R₁ × R₂) / (R₁ + R₂). Product over sum!'
    ],
    examTips: [
      'Always convert time into seconds when calculating Joule’s heating H = I²Rt.',
      'In electricity billing problems, 1 Unit of electricity = 1 kWh = 1000 Watt × 3600 seconds = 3.6 × 10⁶ Joules.'
    ],
    importantQuestions: [
      {
        question: 'An electric lamp of 100 Ω, a toaster of resistance 50 Ω, and a water filter of resistance 500 Ω are connected in parallel to a 220 V source. What is the resistance of an electric iron connected to the same source that takes as much current as all three appliances, and what is the current through it?',
        answer: '1/R_p = 1/100 + 1/50 + 1/500 = (5 + 10 + 1)/500 = 16/500 => R_p = 500/16 = 31.25 Ω. The electric iron must have R = 31.25 Ω. Current I = V / R = 220 / 31.25 = 7.04 A.',
        marks: 4
      }
    ]
  }
};

// Fallback dynamic note generator for remaining chapters
export function getChapterNotes(chapterId: string): ChapterNotes {
  if (CURATED_CHAPTER_NOTES[chapterId]) {
    return CURATED_CHAPTER_NOTES[chapterId];
  }

  const chapter = INITIAL_CHAPTERS.find(c => c.id === chapterId);
  const chName = chapter ? chapter.name : 'Chapter';
  const subjId = chapter ? chapter.subjectId : 'mathematics';
  const topics = chapter && chapter.topics ? chapter.topics : ['Overview', 'Key Principles', 'Applications'];

  return {
    chapterId,
    chapterName: chName,
    subjectId: subjId,
    introduction: `Welcome to the comprehensive Class 10 study notes for ${chName}. This chapter is an essential part of the CBSE/NCERT curriculum and carries significant weightage in board examinations. Review every section below to master key concepts, formulas, and high-frequency exam questions.`,
    concepts: topics.map((t, idx) => ({
      id: `gen-c-${idx}`,
      title: t,
      content: `In Class 10 ${chName}, "${t}" represents a cornerstone concept tested both in conceptual objective MCQs and multi-mark theoretical/numerical questions. Master the definitions, diagrams, and board-level derivations associated with this topic.`,
      subpoints: [
        `Clear understanding of core principles governing ${t}`,
        `Step-by-step problem-solving method aligned with CBSE marking criteria`,
        `Common misconceptions and boundary conditions to avoid`
      ],
      keyTakeaway: `Revise NCERT textbook questions and exemplar exercises for ${t}.`
    })),
    definitions: [
      {
        term: `${chName} Primary Principle`,
        definition: `The central theoretical and empirical law governing ${chName} under standard Class 10 NCERT criteria.`
      },
      {
        term: 'CBSE Board Standard Condition',
        definition: 'The specified reference frame and benchmark assumptions utilized in evaluating Class 10 examination papers.'
      }
    ],
    formulas: [
      {
        id: 'gen-f1',
        name: `${chName} Fundamental Relation`,
        formula: 'Y = f(X_1, X_2) \\quad \\text{subject to NCERT boundary constraints}',
        variables: 'X = Input parameters, Y = Resultant value',
        application: 'Directly applicable in numerical calculations and verification.'
      },
      {
        id: 'gen-f2',
        name: 'Proportionality Factor',
        formula: 'k = \\frac{\\text{Measured Output}}{\\text{Standard Input}}',
        variables: 'k = characteristic constant of the system',
        application: 'Used in analytical reasoning and comparative MCQs.'
      }
    ],
    shortTricks: [
      `Review previous 5 years' board question papers for ${chName} to spot repeated question patterns.`,
      `Create a one-page formula sheet summarizing all mathematical equations and definitions for fast morning revisions.`
    ],
    examTips: [
      'Write clear formulas before substituting numerical values to secure partial credit in case of calculation errors.',
      'Underline key terms and highlight final answers with proper units (e.g. cm, m/s, Ω, Watts, etc.).'
    ],
    importantQuestions: [
      {
        question: `Explain the fundamental concept of "${topics[0] || chName}" and state its practical significance in everyday life.`,
        answer: `Under standard NCERT guidelines, ${topics[0] || chName} governs key transformations and provides predictive analytical capability. Its practical significance spans engineering, environmental sciences, and daily applications.`,
        marks: 3
      },
      {
        question: `Solve a high-order thinking problem based on the principles of ${chName}.`,
        answer: `Set up the primary equation, apply Cartesian/algebraic conventions, perform rigorous simplification, and state the final result with appropriate units.`,
        marks: 5
      }
    ]
  };
}
