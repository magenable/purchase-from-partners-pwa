const QuantityWrapper = props => {
    const { purchase_partner_urls } = props.productDetails;
    if (purchase_partner_urls.length === 0) {
        return props.children;
    } else {
        return null;
    }
};

export default QuantityWrapper;
