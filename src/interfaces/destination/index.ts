import { TravelOptionInterface } from 'interfaces/travel-option';
import { TravelPlanInterface } from 'interfaces/travel-plan';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DestinationInterface {
  id?: string;
  name: string;
  description?: string;
  location: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  travel_option?: TravelOptionInterface[];
  travel_plan?: TravelPlanInterface[];
  organization?: OrganizationInterface;
  _count?: {
    travel_option?: number;
    travel_plan?: number;
  };
}

export interface DestinationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  location?: string;
  organization_id?: string;
}
