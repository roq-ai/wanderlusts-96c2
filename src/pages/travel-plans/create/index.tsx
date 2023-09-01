import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createTravelPlan } from 'apiSdk/travel-plans';
import { travelPlanValidationSchema } from 'validationSchema/travel-plans';
import { DestinationInterface } from 'interfaces/destination';
import { TravelOptionInterface } from 'interfaces/travel-option';
import { UserInterface } from 'interfaces/user';
import { getDestinations } from 'apiSdk/destinations';
import { getTravelOptions } from 'apiSdk/travel-options';
import { getUsers } from 'apiSdk/users';
import { TravelPlanInterface } from 'interfaces/travel-plan';

function TravelPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TravelPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTravelPlan(values);
      resetForm();
      router.push('/travel-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TravelPlanInterface>({
    initialValues: {
      date_of_travel: new Date(new Date().toDateString()),
      budget: 0,
      departure_location: '',
      destination_id: (router.query.destination_id as string) ?? null,
      travel_option_id: (router.query.travel_option_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: travelPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Travel Plans',
              link: '/travel-plans',
            },
            {
              label: 'Create Travel Plan',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Travel Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="date_of_travel" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Of Travel
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_of_travel ? new Date(formik.values?.date_of_travel) : null}
              onChange={(value: Date) => formik.setFieldValue('date_of_travel', value)}
            />
          </FormControl>

          <NumberInput
            label="Budget"
            formControlProps={{
              id: 'budget',
              isInvalid: !!formik.errors?.budget,
            }}
            name="budget"
            error={formik.errors?.budget}
            value={formik.values?.budget}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('budget', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.departure_location}
            label={'Departure Location'}
            props={{
              name: 'departure_location',
              placeholder: 'Departure Location',
              value: formik.values?.departure_location,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<DestinationInterface>
            formik={formik}
            name={'destination_id'}
            label={'Select Destination'}
            placeholder={'Select Destination'}
            fetcher={getDestinations}
            labelField={'name'}
          />
          <AsyncSelect<TravelOptionInterface>
            formik={formik}
            name={'travel_option_id'}
            label={'Select Travel Option'}
            placeholder={'Select Travel Option'}
            fetcher={getTravelOptions}
            labelField={'type'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/travel-plans')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'travel_plan',
    operation: AccessOperationEnum.CREATE,
  }),
)(TravelPlanCreatePage);
