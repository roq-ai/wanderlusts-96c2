interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Travel Planner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Administrator', 'Content Creator', 'Travel Planner', 'Web Designer'],
  tenantName: 'Organization',
  applicationName: 'Wanderlusts',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Enter travel details for personalized plan',
    'View optimized travel information',
    'Interact with additional features',
    'Manage personalized travel plans',
  ],
  ownerAbilities: [
    'Manage organization registration',
    'Invite Administrators, Content Creators, and Web Designers to organization',
    'Manage travel plan information',
    'Delete outdated or irrelevant travel plan information',
  ],
};
