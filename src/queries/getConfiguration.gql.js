import { gql } from '@apollo/client';

export const GET_CONFIGURATION = gql`
    query PurchasePartnerUrlConfig {
        getPurchasePartnerUrlConfig {
            default_title
            show_all_links
            open_in_new_tab
            ga_enabled
            ga_account
        }
    }
`;

export default {
    getConfigurationQuery: GET_CONFIGURATION
};
