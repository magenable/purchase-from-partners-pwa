import { useQuery } from "@apollo/client";
import DEFAULT_OPERATIONS from '../queries/getConfiguration.gql';

export const getConfiguration = () => {
    const { getConfigurationQuery } = DEFAULT_OPERATIONS;

    const { loading, error, data } = useQuery(getConfigurationQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const configuration = data && data.getPurchasePartnerUrlConfig || null;

    return {
        configuration,
        error,
        loading
    }
}
