export const keys = {
  candidate: {
    profile: ["candidate-profile"],

    jobs: ["candidate-jobs"],

    job: (id: string) => ["candidate-job", id],

    applications: ["candidate-applications"],

    application: (id: string) => ["candidate-application", id],

    documents: ["candidate-documents"],

    interviews: ["candidate-interviews"],

    offers: ["candidate-offers"],

    visa: ["candidate-visa"],

    deployment: ["candidate-deployment"],

    medical: ["candidate-medical"],

    notifications: ["candidate-notifications"],
  },
};
