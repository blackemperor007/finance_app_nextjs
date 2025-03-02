import { Budget } from "@/type";

const budgets: Budget[] = [
  {
    id: "1",
    createdAt: new Date("2023-01-10"),
    name: "Alimentation",
    amount: 5000,
    emoji: "🍎",
    transactions: [
      {
        id: "t1",
        amount: 500,
        emoji: "🍕",
        description: "Pizzeria",
        createdAt: new Date("2023-01-12"),
        budgetName: "Alimentation",
        budgetId: "1",
      },
      {
        id: "t2",
        amount: 300,
        emoji: "🍞",
        description: "Boulangerie",
        createdAt: new Date("2023-01-15"),
        budgetName: "Alimentation",
        budgetId: "1",
      },
    ],
  },
  {
    id: "2",
    createdAt: new Date("2023-01-05"),
    name: "Transport",
    amount: 3000,
    emoji: "🚗",
    transactions: [
      {
        id: "t3",
        amount: 600,
        emoji: "⛽",
        description: "Essence",
        createdAt: new Date("2023-01-08"),
        budgetName: "Transport",
        budgetId: "2",
      },
      {
        id: "t4",
        amount: 150,
        emoji: "🚕",
        description: "Taxi",
        createdAt: new Date("2023-01-20"),
        budgetName: "Transport",
        budgetId: "2",
      },
    ],
  },
  {
    id: "3",
    createdAt: new Date("2023-02-01"),
    name: "Loisirs",
    amount: 2000,
    emoji: "🎉",
    transactions: [
      {
        id: "t5",
        amount: 400,
        emoji: "🎬",
        description: "Cinéma",
        createdAt: new Date("2023-02-03"),
        budgetName: "Loisirs",
        budgetId: "3",
      },
    ],
  },
  {
    id: "4",
    createdAt: new Date("2023-02-15"),
    name: "Santé",
    amount: 1500,
    emoji: "💊",
    transactions: [
      {
        id: "t6",
        amount: 450,
        emoji: "🏥",
        description: "Consultation médicale",
        createdAt: new Date("2023-02-17"),
        budgetName: "Santé",
        budgetId: "4",
      },
    ],
  },
  {
    id: "5",
    createdAt: new Date("2023-03-01"),
    name: "Éducation",
    amount: 4000,
    emoji: "📚",
    transactions: [
      {
        id: "t7",
        amount: 1000,
        emoji: "📖",
        description: "Livres scolaires",
        createdAt: new Date("2023-03-05"),
        budgetName: "Éducation",
        budgetId: "5",
      },
    ],
  },
  {
    id: "6",
    createdAt: new Date("2023-04-01"),
    name: "Maison",
    amount: 6000,
    emoji: "🏠",
    transactions: [
      {
        id: "t8",
        amount: 2500,
        emoji: "🛋️",
        description: "Meubles",
        createdAt: new Date("2023-04-10"),
        budgetName: "Maison",
        budgetId: "6",
      },
    ],
  },
];

export default budgets;
