module.exports = (targetables) => {
    const productFullDetail = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    productFullDetail.addImport(
        "import QuantityWrapper from '@magenable/purchase-partner-url/src/components/QuantityWrapper'"
    );
    productFullDetail.addImport(
        "import PurchasePartnerUrl from '@magenable/purchase-partner-url/src/components/PurchasePartnerUrl'"
    );
    productFullDetail.insertBeforeSource(
        '<section className={classes.quantity}>',
        '<QuantityWrapper productDetails={productDetails}>'
    );
    productFullDetail.insertBeforeSource(
        '<section className={classes.actions}>',
        '</QuantityWrapper>'
    );
    productFullDetail.insertBeforeSource(
        '{cartActionContent}',
        '<PurchasePartnerUrl urls={productDetails.purchase_partner_urls} productPrice={productDetails.price.value}>'
    );
    productFullDetail.insertAfterSource(
        '{cartActionContent}',
        '</PurchasePartnerUrl>'
    );

    const productDetailFragment = targetables.reactComponent(
        '@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql.js'
    );
    productDetailFragment.insertBeforeSource(
        'categories {\n',
        'purchase_partner_urls {\n' +
        '\t\t\tlink\n' +
        '\t\t\tlink_title\n' +
        '\t\t\tevent_action\n' +
        '\t\t\tevent_category\n' +
        '\t\t}\n\t\t'
    );

    const useProductFullDetail = targetables.reactComponent(
        '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js'
    );
    useProductFullDetail.insertAfterSource(
        'const productDetails = {\n',
        '\t\tpurchase_partner_urls: product.purchase_partner_urls,\n'
    );

    const categoryFragments = targetables.reactComponent(
        '@magento/peregrine/lib/talons/RootComponents/Category/categoryFragments.gql.js'
    );
    categoryFragments.insertAfterSource(
        'items {\n',
        '\t\t\tpurchase_partner_urls {\n' +
        '\t\t\t\tlink\n' +
        '\t\t\t\tlink_title\n' +
        '\t\t\t\tevent_action\n' +
        '\t\t\t\tevent_category\n' +
        '\t\t\t}\n'
    );

    const searchPage = targetables.reactComponent(
        '@magento/peregrine/lib/talons/SearchPage/searchPage.gql.js'
    );
    searchPage.insertAfterSource(
        'items {\n',
        '\t\t\t\tpurchase_partner_urls {\n' +
        '\t\t\t\t\tlink\n' +
        '\t\t\t\t\tlink_title\n' +
        '\t\t\t\t\tevent_action\n' +
        '\t\t\t\t\tevent_category\n' +
        '\t\t\t\t}\n'
    );

    const galleryItem = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Gallery/item.js'
    );
    galleryItem.addImport(
        "import PurchasePartnerUrl from '@magenable/purchase-partner-url/src/components/PurchasePartnerUrl'"
    );
    galleryItem.insertBeforeSource(
        '{addButton}',
        '<PurchasePartnerUrl urls={item.purchase_partner_urls} ' +
        'productPrice={item.price_range.maximum_price.regular_price.value} ' +
        'isGalleryItem="1">'
    );
    galleryItem.insertAfterSource(
        '{addButton}',
        '</PurchasePartnerUrl>'
    );
}
