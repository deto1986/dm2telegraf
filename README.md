# DM2TELEGRAF

This service collect product stocks of different products for different dm stores using bbox coordinates to find the stores and return them in a pretty JSON format.

Use the environment parameters to configure the service:

| Env | Description | Variable |
| --- | ----------- | -------- |
| DM4TELEGRAF_STORE_LOOKUP_URL | Base URL to fetch store details via coordinates | ${coords} map coordinates to find stores |
| DM4TELEGRAF_STORE_LOOKUP_COORDS | Coordinates to fetch dm-Store IDs (comma separated for mulitple coordinates) | - |
| DM4TELEGRAF_URL_PRODUCT_STOCK_PER_STORE | Base URL to fetch stock availability for each product ID for each store ID | ${product_ids}" comma-separated list for product id's you looking for; ${store_ids} comma-separated list for store id's you want to check the products |
| DM4TELEGRAF_URL_PRODUCT_IDS_TOILETPAPER | Product IDs for toiletpaper (comma separated for mulitple) | - |
| DM4TELEGRAF_URL_PRODUCT_IDS_MNS | Product IDs for mouth-nose protective mask (comma separated for mulitple) | - |
| DM4TELEGRAF_URL_PRODUCT_IDS_FFP2 | Product IDs for masks with FFP2 standard (comma separated for mulitple) | - |
| DM4TELEGRAF_DEBUG | Enables or disables debug logging | - |

## Find new product IDs

You can use the following web-service to search for products:
- https://products.dm.de/product/de/search?q=${searchterm}&hideFacets=false&hideSorts=false&pageSize=9999

Replace ${searchterm} with a product name you like to search for.

The returned JSON contains items. The attribute "dan" contains the necessary product ID

## Find coordinates for stores

You must use the dm-Website and open the store finder map, or use this url: https://www.dm.de/store

With the browser development tools you can use the network-tab to fetch the requests of the map. If you scrolling or zooming the map you notice request for https://store-data-service.services.dmtech.com/stores/bbox/. After /stores/bbox/ you can see the coordinates, copy these and set as DM4TELEGRAF_STORE_LOOKUP_COORDS env. You can comma separate different store coordinates to fetch data from multiple stores.

Example for Karlsruhe with a perimeter 20 km: https://store-data-service.services.dmtech.com/stores/bbox/49.12242304480293%2C7.948253206488602%2C48.92091530210405%2C8.793906256455102

Example for Bruchsal with a perimeter of 20 km: https://store-data-service.services.dmtech.com/stores/bbox/49.186565005019304%2C8.232638793807155%2C49.08604326652855%2C8.655465318790391

## Get stock of product(s)

With web-service https://products.dm.de/store-availability/DE/availability?dans=${product_ids}&storeNumbers=${store_ids} you can request the available stock per store per product id.

You can comma-separate product id's and store id's to request multiple data at once.