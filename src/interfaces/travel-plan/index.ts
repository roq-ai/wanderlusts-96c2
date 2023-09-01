import { DestinationInterface } from 'interfaces/destination';
import { TravelOptionInterface } from 'interfaces/travel-option';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TravelPlanInterface {
  id?: string;
  destination_id: string;
  travel_option_id: string;
  date_of_travel: any;
  budget: number;
  departure_location: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  destination?: DestinationInterface;
  travel_option?: TravelOptionInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TravelPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  destination_id?: string;
  travel_option_id?: string;
  departure_location?: string;
  user_id?: string;
}
