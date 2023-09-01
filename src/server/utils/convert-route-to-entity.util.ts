const mapping: Record<string, string> = {
  destinations: 'destination',
  organizations: 'organization',
  'travel-options': 'travel_option',
  'travel-plans': 'travel_plan',
  users: 'user',
  widgets: 'widget',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
