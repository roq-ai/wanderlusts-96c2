import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { destinationValidationSchema } from 'validationSchema/destinations';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDestinations();
    case 'POST':
      return createDestination();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDestinations() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.destination
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'destination'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createDestination() {
    await destinationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.travel_option?.length > 0) {
      const create_travel_option = body.travel_option;
      body.travel_option = {
        create: create_travel_option,
      };
    } else {
      delete body.travel_option;
    }
    if (body?.travel_plan?.length > 0) {
      const create_travel_plan = body.travel_plan;
      body.travel_plan = {
        create: create_travel_plan,
      };
    } else {
      delete body.travel_plan;
    }
    const data = await prisma.destination.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
