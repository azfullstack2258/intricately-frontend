export const companyActivities = state => state.activities.sort((a, b) => a > b ? 1 : -1);
export const similarCompanies = state => state.similar_companies;
