import { TravelPlanInterface } from 'interfaces/travel-plan';
import { DestinationInterface } from 'interfaces/destination';
import { GetQueryInterface } from 'interfaces';

export interface TravelOptionInterface {
  id?: string;
  type: string;
  description?: string;
  cost: number;
  destination_id: string;
  created_at?: any;
  updated_at?: any;
  travel_plan?: TravelPlanInterface[];
  destination?: DestinationInterface;
  _count?: {
    travel_plan?: number;
  };
}

export interface TravelOptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  description?: string;
  destination_id?: string;
}
