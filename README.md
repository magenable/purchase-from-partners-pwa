# Purchase From Partner

**Purchase From Partner** is a Magento PWA Studio extension that allows you to replace standard `Add to Cart` button with links to external websites where visitors may purchase the products. Think about Amazon affiliate store, cases when a brand has products available exlusive to retail partners. The extension may send events to Google analytics when clicking on the links for tracking/reporting.<br>
There may be one or more partner URL per product. The URLs are defined on product level, so some of your product may have normal Add to cart and some partner links.

## Installation

**Prerequisite:** In Magento 2 instance should be installed next module: https://packagist.org/packages/magenable/purchase-partner-url 

1. Add dependency to PWA Studio project

```
yarn add @magenable/purchase-partner-url
```

2. Wrap the module in your local-intercept.js file

```
const { Targetables } = require('@magento/pwa-buildpack');
const targetables = Targetables.using(targets);
const purchasePartnerUrl = require('@magenable/purchase-partner-url/src/targets');
purchasePartnerUrl(targetables);
```

3. Re-build your PWA project

## Upgrade

```
yarn upgrade @magenable/purchase-partner-url
```

## Configuration

You can specify partner links for any products, even for products that are not available currently for purchasing in venia-ui storefront (for example bundle product):

![purchase-partner-url-](https://user-images.githubusercontent.com/34573954/140858406-b484715f-b941-4bae-8ac2-0f258524564c.png)

For more information about configuration see readme in the next module https://packagist.org/packages/magenable/purchase-partner-url.

## Storefront view:

![purchase-partner-url-example-1](https://user-images.githubusercontent.com/34573954/140855228-986e2bce-4392-4501-a07b-e0ad2bbf6604.png)

![purchase-partner-url-example-2](https://user-images.githubusercontent.com/34573954/140855202-77b31e14-2f5b-445c-9b55-a6f864b71500.png)

![purchase-partner-url-example-3](https://user-images.githubusercontent.com/34573954/140855210-ede8fd98-3776-4e52-987e-df243fa35ca0.png)
